import { defineNuxtPlugin, showError } from '#app';
import type { H3Error } from 'h3';

export default defineNuxtPlugin((nuxtApp) => {
	// Gestione degli errori lato client
	nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
		const error = err as any;
		const statusCode = error?.statusCode || error?.response?.status || 500;

		showError({
			statusCode,
			statusMessage: error.message || 'An error occurred',
			data: { originalError: error }
		});
	};

	// Hook per errori Vue (opzionale)
	nuxtApp.hook('vue:error', (error, instance, info) => {
		console.error('Vue error:', error);
	});

	// Gestione degli errori lato server
	if (import.meta.server) {
		nuxtApp.hooks.hook('app:error', (error: H3Error) => {
			error.unhandled = false;
			const statusCode = error.statusCode || 500;
			showError({
				statusCode,
				statusMessage: error.message,
				data: { originalError: error }
			});
		});
	}
});
