// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

module.exports = withPWA({
	reactStrictMode: true,
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development'
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
