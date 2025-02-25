import { AsyncQueue } from '@sapphire/async-queue';
import type { Awaitable, PickByValue } from '@sapphire/utilities';
import { Collection } from '@discordjs/collection';
import { getDefaultGuildSettings } from '~~/lib/database/settings/constants';
import { deleteSettings, getSettings, updateSettings } from '~~/lib/database/settings/context/functions';
import type { GuildData, ReadonlyGuildData } from '~~/lib/database/settings/types';
import { maybeParseNumber } from '@/utils/parse';
import prisma from '~~/lib/prisma';

const cache = new Collection<string, GuildData>();
const queue = new Collection<string, Promise<GuildData>>();
const locks = new Collection<string, AsyncQueue>();
const WeakMapNotInitialized = new WeakSet<ReadonlyGuildData>();

const transformers = {
	selfmodAttachmentsHardActionDuration: maybeParseNumber,
	selfmodCapitalsHardActionDuration: maybeParseNumber,
	selfmodFilterHardActionDuration: maybeParseNumber,
	selfmodInvitesHardActionDuration: maybeParseNumber,
	selfmodLinksHardActionDuration: maybeParseNumber,
	selfmodMessagesHardActionDuration: maybeParseNumber,
	selfmodNewlinesHardActionDuration: maybeParseNumber,
	selfmodReactionsHardActionDuration: maybeParseNumber
} satisfies Record<PickByValue<ReadonlyGuildData, bigint | null>, typeof maybeParseNumber>;

export function serializeSettings(data: ReadonlyGuildData, space?: string | number) {
	return JSON.stringify(data, (key, value) => (key in transformers ? transformers[key as keyof typeof transformers](value) : value), space);
}

export function deleteSettingsCached(guildid: string) {
	locks.delete(guildid);
	cache.delete(guildid);
	deleteSettings(guildid);
}

export function readSettings(guildid: string): Awaitable<ReadonlyGuildData> {
	return cache.get(guildid) ?? processFetch(guildid);
}

export function readSettingsCached(guildid: string): ReadonlyGuildData | null {
	return cache.get(guildid) ?? null;
}

export async function writeSettings(
	guildid: string,
	data: Partial<ReadonlyGuildData> | ((settings: ReadonlyGuildData) => Awaitable<Partial<ReadonlyGuildData>>)
) {
	using trx = await writeSettingsTransaction(guildid);

	if (typeof data === 'function') {
		data = await data(trx.settings);
	}

	await trx.write(data).submit();
}

export async function writeSettingsTransaction(id: string) {
	const queue = locks.ensure(id, () => new AsyncQueue());

	// Acquire a write lock:
	await queue.wait();

	// Fetch the entry:
	const settings = cache.get(id) ?? (await unlockOnThrow(processFetch(id), queue));

	return new Transaction(settings, queue);
}

export class Transaction {
	#changes = Object.create(null) as Partial<ReadonlyGuildData>;
	#hasChanges = false;
	#locking = true;

	public constructor(
		public readonly settings: ReadonlyGuildData,
		private readonly queue: AsyncQueue
	) {}

	public get hasChanges() {
		return this.#hasChanges;
	}

	public get locking() {
		return this.#locking;
	}

	public write(data: Partial<ReadonlyGuildData>) {
		Object.assign(this.#changes, data);
		this.#hasChanges = true;
		return this;
	}

	public async submit() {
		if (!this.#hasChanges) {
			return;
		}

		try {
			if (WeakMapNotInitialized.has(this.settings)) {
				await prisma.guild.create({
					// @ts-expect-error readonly data
					data: { ...this.settings, ...this.#changes }
				});
				WeakMapNotInitialized.delete(this.settings);
			} else {
				await prisma.guild.update({
					where: { id: this.settings.id },
					// @ts-expect-error readonly data
					data: this.#changes
				});
			}

			Object.assign(this.settings, this.#changes);
			this.#hasChanges = false;
			updateSettings(this.settings, this.#changes);
		} finally {
			this.#changes = Object.create(null);

			if (this.#locking) {
				this.queue.shift();
				this.#locking = false;
			}
		}
	}

	public abort() {
		if (this.#locking) {
			this.queue.shift();
			this.#locking = false;
		}
	}

	public dispose() {
		if (this.#locking) {
			this.queue.shift();
			this.#locking = false;
		}
	}

	public [Symbol.dispose]() {
		return this.dispose();
	}
}

async function unlockOnThrow(promise: Promise<ReadonlyGuildData>, lock: AsyncQueue) {
	try {
		return await promise;
	} catch (error) {
		lock.shift();
		throw error;
	}
}

async function processFetch(id: string): Promise<ReadonlyGuildData> {
	const previous = queue.get(id);
	if (previous) return previous;

	try {
		const promise = fetch(id);
		queue.set(id, promise);
		const value = await promise;
		getSettings(value);
		return value;
	} finally {
		queue.delete(id);
	}
}

async function fetch(id: string): Promise<GuildData> {
	const { guild } = prisma;
	const existing = await guild.findUnique({ where: { id } });
	if (existing) {
		cache.set(id, existing);
		return existing;
	}

	const created = Object.assign(Object.create(null), getDefaultGuildSettings(), { id }) as GuildData;
	cache.set(id, created);
	WeakMapNotInitialized.add(created);
	return created;
}
