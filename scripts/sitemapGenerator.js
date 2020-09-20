/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require('nextjs-sitemap-generator');
const { resolve } = require('path');

sitemap({
	baseUrl: 'https://skyra.pw',
	pagesDirectory: resolve(__dirname, '..', 'src', 'pages'),
	targetDirectory: resolve(__dirname, '..', 'src', 'public'),
	nextConfigPath: resolve(__dirname, '..', 'src', 'next.config.js')
});
