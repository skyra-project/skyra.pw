import { middleware } from '~/server/trpc/trpc';
import { publicProcedure } from '~/server/trpc/trpc';

export const isAuthenticated = middleware(async ({ ctx, next }) => {
	const session = requireAuthSession(ctx.event);
	return next({
		ctx: {
			session
		}
	});
});
export const protectedProcedure = publicProcedure.use(isAuthenticated);
