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
				default:
					break;
			}
		}
	};

	// Hook per errori Vue (opzionale)
	nuxtApp.hook('vue:error', (error, instance, info) => {
		// Gestisci l'errore, ad esempio inviandolo a un servizio di reporting
		console.error('Vue error:', error);
	});

	// Gestione degli errori lato server
	if (import.meta.server) {
		nuxtApp.hooks.hook('app:error', (error: H3Error) => {
			if (error.statusCode === 404) {
				error.unhandled = false;
				// Puoi anche impostare una pagina di errore personalizzata qui se lo desideri
				// error.fatal = true
				error.data = { url: '/404' };
			}
			if (error.statusCode === 500) {
				error.unhandled = false;
				error.data = { url: '/500' };
			}
			if (error.statusCode === 403) {
				error.unhandled = false;
				error.data = { url: '/403' };
			}
		});
	}
});
