import { defineNuxtPlugin, useNuxtApp } from '#app';
import type { H3Error } from 'h3';

export default defineNuxtPlugin((nuxtApp) => {
	// Gestione degli errori lato client
	nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
		const error = err as any;
		const statusCode = error?.statusCode || error?.response?.status;

		if (import.meta.client) {
			switch (statusCode) {
				case 404:
					navigateTo('/404');
					break;
				case 500:
					navigateTo('/500');
					break;
				case 403:
					navigateTo('/403');
					break;
				default:
					navigateTo('/error');
					break;
			}
		}
	};

	// Hook per errori Vue (opzionale)
	nuxtApp.hook('vue:error', (error, instance, info) => {
		console.error('Vue error:', error);
	});

	// Gestione degli errori lato server
	if (import.meta.server) {
		nuxtApp.hooks.hook('app:error', (error: H3Error) => {
			error.unhandled = false;
			switch (error.statusCode) {
				case 404:
					error.data = { url: '/404' };
					break;
				case 500:
					error.data = { url: '/500' };
					break;
				case 403:
					error.data = { url: '/403' };
					break;
				default:
					error.data = { url: '/error' };
					break;
			}
		});
	}
});
