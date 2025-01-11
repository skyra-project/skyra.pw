import { useClientTrpc } from '~/composables/public';

export default defineNuxtPlugin(async (nuxtApp) => {
	// Skip plugin when rendering error page
	if (nuxtApp.payload.error) {
		return {};
	}

	const { data: session, refresh: updateSession } = useAsyncData('auth-session', () => useClientTrpc().auth.session.query(), { immediate: true });

	const loggedIn = computed(() => !!session.value?.id);

	const redirectTo = useState<string>('authRedirect', () => '/');
	// Protezione route
	addRouteMiddleware(
		'auth',
		(to) => {
			if (to.meta.auth && !loggedIn.value) {
				redirectTo.value = to.path;
				return '/login';
			}
		},
		{ global: true }
	);

	// Watch client-side
	if (import.meta.client) {
		const currentRoute = useRoute();
		watch(loggedIn, async (isLoggedIn) => {
			if (!isLoggedIn && currentRoute.meta.auth) {
				redirectTo.value = currentRoute.path;
				await navigateTo('/login');
			}
		});
	}

	return {
		provide: {
			auth: {
				loggedIn,
				session,
				redirectTo,
				updateSession
			}
		}
	};
});
