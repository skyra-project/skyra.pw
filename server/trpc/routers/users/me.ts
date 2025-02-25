import { TRPCError } from '@trpc/server';
import { router, procedure } from '~~/server/trpc/trpc';
import useApi from '~~/shared/utils/api';

export const settingsRouter = router({
	me: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/users/@me',
				protect: true,
				description: 'Get the current user and their guilds transformed'
			}
		})
		.query(async () => {
			const user = await useApi().users.getCurrent();
			if (!user) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch user'
				});
			}

			const guilds = await useApi().users.getGuilds();

			return transformOauthGuildsAndUser({
				user,
				guilds
			});
		})
});
