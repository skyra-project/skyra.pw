import { opendir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL, URL } from 'node:url';

async function* scan(path, cb) {
	const dir = await opendir(path);

	for await (const item of dir) {
		const file = join(dir.path, item.name);
		if (item.isFile()) {
			if (cb(file)) yield file;
		} else if (item.isDirectory()) {
			yield* scan(file, cb);
		}
	}
}

const workboxFileRegex = /workbox-/;
const srcFolder = new URL('../src/', import.meta.url);
const publicFolder = new URL('public/', srcFolder);
const nextFolder = new URL('.next/', srcFolder);
const tsbuildInfoFile = new URL('.tsbuildinfo', srcFolder);
const serviceWorkerFile = new URL('sw.js', publicFolder);
const sitemapFile = new URL('sitemap.xml', publicFolder);

const options = { recursive: true, force: true };

let workboxFile;

for await (const path of scan(publicFolder, (path) => workboxFileRegex.test(path))) {
	workboxFile = path;
}

if (workboxFile) {
	workboxFile = pathToFileURL(workboxFile);
}

await Promise.all([
	rm(nextFolder, options),
	rm(tsbuildInfoFile, options),
	rm(serviceWorkerFile, options),
	rm(sitemapFile, options),
	workboxFile ? rm(workboxFile, options) : Promise.resolve()
]);
