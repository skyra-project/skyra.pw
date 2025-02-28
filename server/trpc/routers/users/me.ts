import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, procedure } from '~~/server/trpc/trpc';
import { requireAuthStorage } from '~~/server/utils/session';
import type { TransformedLoginData } from '~~/shared/types';
import useApi from '~~/shared/utils/api';

export const usersRouter = router({
	me: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/users/@me',
				protect: true,
				description: 'Get the current user and their guilds transformed'
			}
		})
		.input(
			z
				.object({
					shouldSerialize: z.boolean().optional()
				})
				.optional()
		)
		.output(z.custom<TransformedLoginData>())
		.query(async ({ input }) => {
			const token = await requireAuthStorage();
			const rest = useRest({
				authPrefix: 'Bearer'
			}).setToken(token);
			const user = await useApi(rest).users.getCurrent();
			if (!user) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch user'
				});
			}

			const guilds = await useApi(rest).users.getGuilds();

			if (!guilds) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch guilds'
				});
			}

			return input?.shouldSerialize !== undefined && input?.shouldSerialize === false
				? {
						user,
						guilds
					}
				: await transformOauthGuildsAndUser({
						user,
						guilds
					});
		})
});
