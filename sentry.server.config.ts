import * as Sentry from '@sentry/nuxt';

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [
			// Base server integrations
			Sentry.consoleIntegration(),
			Sentry.functionToStringIntegration(),
			Sentry.linkedErrorsIntegration(),
			Sentry.onUncaughtExceptionIntegration(),
			Sentry.onUnhandledRejectionIntegration(),

			// Server-specific integrations
			Sentry.prismaIntegration(),

			// Performance tracking
			Sentry.httpIntegration({ breadcrumbs: true })
		],

		tracesSampleRate: 1.0,
		normalizeDepth: 10
	});
}
