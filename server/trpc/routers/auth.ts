import { publicProcedure, router } from '../trpc';
import { callbackInputSchema } from '../schemas/auth';
import { TRPCError } from '@trpc/server';
import { protectedProcedure } from '../middleware/auth';

export const authRouter = router({
	callback: publicProcedure.input(callbackInputSchema).mutation(async ({ input, ctx }) => {
		const data = await fetchAccessToken(input.code, input.redirectUri);
		if (!data) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch the token'
			});
		}

		const auth = await fetchAuth(data);
		if (!auth) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch the auth'
			});
		}

		const session = await useAuthSession(ctx.event);
		await session.update({
			name: auth.user!.global_name ?? auth.user!.username,
			...auth.user
		});
		return auth;
	}),

	logout: protectedProcedure.mutation(async ({ ctx }) => {
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
