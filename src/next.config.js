// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development'
	},
	// eslint-disable-next-line @typescript-eslint/require-await
	async rewrites() {
		return [
			{
				source: '/index',
				destination: '/'
			}
		];
	}
});
