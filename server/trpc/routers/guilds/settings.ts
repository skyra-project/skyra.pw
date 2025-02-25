import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { isNullOrUndefined } from '@sapphire/utilities';
import { guildSchema, settingsUpdateSchema } from '~~/server/trpc/schemas/guild';
import { router, procedure } from '~~/server/trpc/trpc';
import { readSettings, serializeSettings, writeSettingsTransaction } from '~~/lib/database';

export const settingsRouter = router({
	fetch: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/guilds/:id/settings',
				protect: true
			},
			auth: true
		})
		.input(guildSchema)
		.output(z.string())
		.query(
			async ({
				ctx: {
					session: { data: user },
					api
				},
				input: { guild: guildId }
			}) => {
				useRest().setToken(useRuntimeConfig().config);

				const guild = await api.guilds.get(guildId, { with_counts: true });
				if (!guild) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'Guild not found'
					});
				}

				const member = await api.guilds.getMember(guild.id, user.id);
				if (!member) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'Member not found'
					});
				}

				if (!(await canManage(guild, member))) {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: 'Insufficient permissions'
					});
				}

				const settings = await readSettings(guild.id);
				return serializeSettings(settings);
			}
		),
	update: procedure
		.meta({
			openapi: {
				method: 'PATCH',
				path: '/guilds/:id/settings',
				protect: true
			},
			auth: true
		})
		.output(z.string())
		.input(settingsUpdateSchema)
		.mutation(
			async ({
				ctx: {
					session: { data: user },
					api
				},
				input: { guildId, data }
			}) => {
				if (isNullOrUndefined(guildId)) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'No guild id provided'
					});
				}

				if (data.length === 0) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'No settings provided'
					});
				}

				useRest().setToken(useRuntimeConfig().config);

				const guild = await api.guilds.get(guildId, { with_counts: true });
				if (!guild) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'Guild not found'
					});
				}

				const member = await fetchMember(guildId, user.id).catch(() => null);
				if (!member) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'Member not found'
					});
				}

				if (!(await canManage(guild, member))) {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: 'Insufficient permissions'
					});
				}

				try {
					const trx = await writeSettingsTransaction(guild.id);
					await trx.write(Object.fromEntries(data)).submit();

					return serializeSettings(trx.settings);
				} catch (error) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: Array.isArray(error) ? error.join('\n') : String(error)
					});
				}
			}
		)
});
