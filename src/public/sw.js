if (!self.define) {
	const e = e => {
			'require' !== e && (e += '.js');
			let s = Promise.resolve();
			return (
				a[e] ||
					(s = new Promise(async s => {
						if ('document' in self) {
							const a = document.createElement('script');
							(a.src = e), document.head.appendChild(a), (a.onload = s);
						} else importScripts(e), s();
					})),
				s.then(() => {
					if (!a[e]) throw new Error(`Module ${e} didn’t register its module`);
					return a[e];
				})
			);
		},
		s = (s, a) => {
			Promise.all(s.map(e)).then(e => a(1 === e.length ? e[0] : e));
		},
		a = { require: Promise.resolve(s) };
	self.define = (s, c, t) => {
		a[s] ||
			(a[s] = Promise.resolve().then(() => {
				let a = {};
				const n = { uri: location.origin + s.slice(1) };
				return Promise.all(
					c.map(s => {
						switch (s) {
							case 'exports':
								return a;
							case 'module':
								return n;
							default:
								return e(s);
						}
					})
				).then(e => {
					const s = t(...e);
					return a.default || (a.default = s), a;
				});
			}));
	};
}
define('./sw.js', ['./workbox-c2b5e142'], function (e) {
	'use strict';
	importScripts(),
		e.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/static/chunks/5eec9076b7122a47bb63baa280245b3614395d2a.3c8dec8e852fa8d38411.js',
					revision: 'c8f55fd4eb0961249c93e962e5b7c28b'
				},
				{ url: '/_next/static/chunks/9.8e4c2015ce73b56c08ac.js', revision: '3341fa97ce630d2d8e9a1a9d1b757c22' },
				{ url: '/_next/static/chunks/commons.753608103e33e1d163e1.js', revision: 'c806da0d872b7f191e26d3f3a70bc996' },
				{ url: '/_next/static/chunks/framework.3f8c6792c8f2d4395e86.js', revision: '79f5c3fd493361ab3d5353ca02e53059' },
				{ url: '/_next/static/chunks/main-0219107c0cf3af55a472.js', revision: '814d6b76b638746763dbbd7fc4de415b' },
				{ url: '/_next/static/chunks/pages/404-e7b069d2c61d61d57ca9.js', revision: '72f54ad6bb3f3c91171521057eac1d5d' },
				{ url: '/_next/static/chunks/pages/_app-c3cc509e9c7776878cdf.js', revision: '3725bcbdd7c716d3194b6544446f8eb0' },
				{ url: '/_next/static/chunks/pages/_error-942d6f3b38f0edbf2bd7.js', revision: '3860e1a23cea58f15ec76b1cd76e1912' },
				{ url: '/_next/static/chunks/polyfills-7ba4a23a03c3ade905bb.js', revision: '1c0d0f463c2a8d32563faedbe0a7156a' },
				{ url: '/_next/static/chunks/webpack-6e5f48ec7f4aef539fcf.js', revision: '0dbddfed8a1fede3eeadb93c9aaa3d18' },
				{ url: '/_next/static/e4KLIKkluIVmYukzRTiPw/_buildManifest.js', revision: 'c24fa7ec1d4faea4406a1eac51160993' },
				{ url: '/_next/static/e4KLIKkluIVmYukzRTiPw/_ssgManifest.js', revision: 'abee47769bf307639ace4945f9cfd4ff' }
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [new e.ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\/api\/.*$/i,
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
			}),
			'GET'
		),
		e.registerRoute(
			/.*/i,
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
			}),
			'GET'
		);
});
