// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development'
	},
	i18n: {
		locales: ['en-US', 'es-ES', 'nl-NL'],
		defaultLocale: 'en-US'
	}
});
