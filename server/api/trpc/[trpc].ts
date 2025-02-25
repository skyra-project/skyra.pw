import { createNuxtApiHandler } from 'trpc-nuxt';
import { captureException } from '@sentry/nuxt';
import { ZodError } from 'zod';
import { consola } from 'consola';
import { appRouter } from '~~/server/trpc/routers/index';
import { createContext } from '~~/server/trpc/context';

export default createNuxtApiHandler({
	router: appRouter,
	createContext,
	onError: ({ error }) => {
		consola.error(error);
		captureException(error, {
			extra: {
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		});
	}
});
