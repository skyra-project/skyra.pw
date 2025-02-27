import { createOpenApiNuxtHandler } from 'trpc-to-openapi';
import { captureException } from '@sentry/nuxt';
import { ZodError } from 'zod';
import { appRouter } from '~~/server/trpc/routers/index';
import { createContext } from '~~/server/trpc/context';

export default createOpenApiNuxtHandler({
	router: appRouter,
	createContext,
	onError: ({ error }) => {
		captureException(error, {
			extra: {
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		});
	}
});
