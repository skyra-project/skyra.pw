import sitemapGenerator from 'nextjs-sitemap-generator';
import { fileURLToPath } from 'url';

const srcDir = new URL('../src/', import.meta.url);

sitemapGenerator({
	baseUrl: 'https://skyra.pw',
	pagesDirectory: fileURLToPath(new URL('pages/', srcDir)),
	targetDirectory: fileURLToPath(new URL('public/', srcDir)),
	nextConfigPath: fileURLToPath(new URL('next.config.js', srcDir)),
	ignoredPaths: ['[...id]', 'join', 'oauth/guild', 'oauth/callback']
});
