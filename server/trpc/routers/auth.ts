import { publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { isNullishOrEmpty } from '@sapphire/utilities';
import { callbackInputSchema } from '../schemas/auth';

export const authRouter = router({
	callback: publicProcedure.input(callbackInputSchema).mutation(async ({ ctx }) => {
		const { code, redirectUri } = (await readBody(ctx.event)) as OAuth2BodyData;
		if (isNullishOrEmpty(code) || isNullishOrEmpty(redirectUri)) {
			throw createError({ message: 'Invalid body parameters', statusCode: 400 });
		}
		const data = await fetchAccessToken(code, redirectUri);
		if (!data) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch the token'
			});
		}

		const user = await fetchUser(data.access_token);
		if (!user) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch the auth'
			});
		}

		const session = await useAuthSession(ctx.event);
		await session.update({ id: user.id, name: user.username, avatar: user.avatar });
		return session.data;
	}),

	logout: publicProcedure.mutation(async ({ ctx }) => {
		const session = await useAuthSession(ctx.event);
		await session.clear();
		return { message: 'Successfully logged out!' };
	}),

	session: publicProcedure.query(async ({ ctx }) => {
		const session = await useAuthSession(ctx.event);
		return session.data;
	})
});

export type AuthRouter = typeof authRouter;

interface OAuth2BodyData {
	code: string;
	redirectUri: string;
}
