/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v11/router
 * @see https://trpc.io/docs/v11/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server';
import * as Sentry from '@sentry/node';
import superjson from 'superjson';
import { z } from 'zod';
import { createTRPCStoreLimiter, defaultFingerPrint } from '@trpc-limiter/memory';
import type { Context } from '~~/server/trpc/context';
import type { Meta } from '~~/server/trpc/meta';

const t = initTRPC
	.context<Context>()
	.meta<Meta>()
	.create({
		// Set a default value
		defaultMeta: {
			auth: false
		},
		transformer: superjson,
		errorFormatter({ shape, error }) {
			return {
				...shape,
				data: {
					...shape.data,
					zodError: error.cause instanceof z.ZodError ? error.cause.flatten() : null
				}
			};
		}
	});

export const router = t.router;
export const middleware = t.middleware;

const limiter = createTRPCStoreLimiter<typeof t>({
	fingerprint: ({ request }) =>
		Array.isArray(request.headers['x-forwarded-for'])
			? request.headers['x-forwarded-for'][0]
			: request.headers['x-forwarded-for'] || defaultFingerPrint(request),
	windowMs: 20000,
	message: (retryAfter, _ctx, fingerprint) => `Too many requests, please try again later. ${retryAfter}, fingerprint: ${fingerprint}`,
	max: 15
});

export const procedure = t.procedure
	.use(
		Sentry.trpcMiddleware({
			attachRpcInput: true
		})
	)
	.use(
		t.middleware(async ({ meta, next, ctx }) => {
			const { session } = ctx;
			if (meta?.auth && !session.data.id) {
				throw new TRPCError({ message: 'Not Authorized', code: 'UNAUTHORIZED' });
			}
			return next({
				ctx: {
					session
				}
			});
		})
	)
	.use(limiter);

export const createCallerFactory = t.createCallerFactory;

export const mergeRouters = t.mergeRouters;
