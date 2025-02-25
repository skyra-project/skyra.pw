import * as Sentry from '@sentry/nuxt';

if (useRuntimeConfig().public.sentry.dsn) {
	Sentry.init({
		dsn: useRuntimeConfig().public.sentry.dsn,
		integrations: [
			// Base client integrations
			Sentry.browserTracingIntegration(),
			Sentry.replayIntegration(),
			Sentry.browserProfilingIntegration(),

			// Vue specific integrations
			Sentry.vueIntegration({
				tracingOptions: {
					trackComponents: true
				}
			})
		],

		tracesSampleRate: 1.0,
		normalizeDepth: 10,
		// Session replay config
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0
	});
}
