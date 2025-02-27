import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { settingsRouter } from '~~/server/trpc/routers/guilds/settings';
import { procedure, router } from '~~/server/trpc/trpc';
import type { FlattenedGuild } from '~~/shared/types';

export const guildsRouter = router({
	settings: settingsRouter,

	search: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/guilds/:guildid',
				protect: true,
				description: 'Get a guild by Id'
			}
		})
		.output(z.custom<FlattenedGuild>())
		.input(
			z.object({
				guildid: z.string()
			})
		)
		.query(
			async ({
				ctx: {
					session: { data: user },
					api
				},
				input: { guildid: guildId }
			}) => {
				if (typeof guildId !== 'string') {
					throw new TRPCError({ code: 'BAD_REQUEST' });
				}

				const guild = await api().guilds.get(guildId, { with_counts: true });
				if (!guild) {
					throw new TRPCError({ code: 'BAD_REQUEST' });
				}

				const member = await api().guilds.getMember(guild.id, user.id);
				if (!member) {
					throw new TRPCError({ code: 'BAD_REQUEST' });
				}

				// Assuming canManage is available in your context or imported
				if (!(await canManage(guild, member))) {
					throw new TRPCError({ code: 'FORBIDDEN' });
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const channels = (await api().guilds.getChannels(guild.id)) as any;

				return flattenGuild({ ...guild, channels });
			}
		)
});
