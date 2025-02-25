export default defineNuxtPlugin((nuxtApp) => {
	const { session } = useAuth();
	const apiOrigin = getApiOrigin();

	const api = $fetch.create({
		baseURL: apiOrigin,
		onRequest({ options }) {
			if (session.value?.id) {
				options.credentials = 'include';
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
