const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
	output: 'standalone',
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/index',
				destination: '/'
			}
		];
	}
});
