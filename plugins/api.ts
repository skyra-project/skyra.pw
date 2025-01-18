export default defineNuxtPlugin((nuxtApp) => {
	const { session } = useAuth();
	const apiOrigin = getApiOrigin();

	const api = $fetch.create({
		baseURL: apiOrigin,
		onRequest({ options }) {
			if (session.value?.id) {
				options.credentials = 'include';
			}

			if (session.value?.token) {
				options.headers.set('Authorization', `Bearer ${session.value?.token}`);
			}
		},
		async onResponseError({ response }) {
			if (response.status === 401) {
				await nuxtApp.runWithContext(() => navigateTo('/login'));
			}
		}
	});

	return {
		provide: {
			api
		}
	};
});
