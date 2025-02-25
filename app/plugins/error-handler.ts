import type { H3Error } from 'h3';
import * as Sentry from '@sentry/nuxt';
import { defineNuxtPlugin, showError } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
	// Gestione degli errori lato client
	nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
		const error = err as Error & { statusCode?: number; response?: { status: number } };
		const statusCode = error?.statusCode ?? error?.response?.status ?? 500;

		// Send error to Sentry
		Sentry.captureException(error, {
			extra: {
				componentName: instance?.$.type?.name,
				info,
				statusCode
			}
		});

		showError({
			statusCode,
			statusMessage: error.message || 'An error occurred',
			data: { originalError: error }
		});
	};

	// Hook per errori Vue (opzionale)
	nuxtApp.hook('vue:error', (error, instance, info) => {
		Sentry.captureException(error, {
			extra: {
				componentName: instance?.$.type?.name,
				info
			}
		});
	});

	// Gestione degli errori lato server
	if (import.meta.server) {
		nuxtApp.hooks.hook('app:error', (error: H3Error) => {
			error.unhandled = false;
			const statusCode = error.statusCode ?? 500;

			// Send server-side error to Sentry
			Sentry.captureException(error, {
				extra: {
					statusCode
				}
			});

			showError({
				statusCode,
				statusMessage: error.message,
				data: { originalError: error }
			});
		});
	}
});
