import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { settingsRouter } from '~~/server/trpc/routers/guilds/settings';
import useApi from '~~/shared/utils/api';
import { procedure, router } from '~~/server/trpc/trpc';
import type { FlattenedGuild } from '~~/shared/types';

export const guildsRouter = router({
	settings: settingsRouter,

	search: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/guilds/:guildid',
				contentTypes: ['application/json']
			}
		})
		.output(z.custom<FlattenedGuild>())
		.input(
			z.object({
				guildid: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			const guildid = input.guildid;

			if (typeof guildid !== 'string') {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}

			const guild = await useApi().guilds.get(guildid, { with_counts: true });
			if (!guild) {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}

			const member = await useApi().guilds.getMember(guild.id, ctx.session.data.id);
			if (!member) {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}

			// Assuming canManage is available in your context or imported
			if (!(await canManage(guild, member))) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			const channels = await useApi().guilds.getChannels(guild.id);

			return flattenGuild({ ...guild, channels });
		})
});
