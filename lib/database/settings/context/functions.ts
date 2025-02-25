import { Collection } from '@discordjs/collection';
import type { Snowflake } from 'discord-api-types/v10';
import type { ReadonlyGuildData } from '~~/lib/database/settings/types';

const cache = new Collection<Snowflake, ReadonlyGuildData>();

export function getSettingsByGuildId(guildId: Snowflake): ReadonlyGuildData | null {
	return cache.get(guildId) ?? null;
}

export function getSettings(settings: ReadonlyGuildData): ReadonlyGuildData {
	return cache.ensure(settings.id, () => settings);
}

export function updateSettings(settings: ReadonlyGuildData, data: Partial<ReadonlyGuildData>): void {
	const existing = cache.get(settings.id);
	if (existing) {
		// Merge existing data with new data and update cache
		cache.set(settings.id, { ...existing, ...data });
	} else {
		const context = settings;
		cache.set(settings.id, context);
	}
}

export function deleteSettings(guildId: Snowflake) {
	cache.delete(guildId);
}
