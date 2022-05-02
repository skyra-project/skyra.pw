// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development'
	},
	swcMinify: true,
	experimental: {
		emotion: true
	},
	async rewrites() {
		return [
			{
				source: '/index',
				destination: '/'
			}
		];
	}
});
