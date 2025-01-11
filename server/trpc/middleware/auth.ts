import { middleware } from '~/server/trpc/trpc';
import { publicProcedure } from '~/server/trpc/trpc';
import { TRPCError } from '@trpc/server';

export const isAuthenticated = middleware(async ({ ctx, next }) => {
	if (!ctx.user?.id) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			user: ctx.user
		}
	});
});
export const protectedProcedure = publicProcedure.use(isAuthenticated);
