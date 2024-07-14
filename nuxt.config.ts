import '@vite-pwa/nuxt';
import 'nuxt';
import type { SessionConfig } from 'h3';

const manifestIcons = [
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-36x36.png',
		sizes: '36x36',
		type: 'image/png',
		purpose: 'any badge'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-48x48.png',
		sizes: '48x48',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-72x72.png',
		sizes: '72x72',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-96x96.png',
		sizes: '96x96',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-144x144.png',
		sizes: '144x144',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-192x192.png',
		sizes: '192x192',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-256x256.png',
		sizes: '256x256',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-384x384.png',
		sizes: '384x384',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/android-chrome-512x512.png',
		sizes: '512x512',
		type: 'image/png'
	},
	{
		src: 'https://wolfstar.rocks/icons/maskable_icon.png',
		sizes: '640x640',
		type: 'image/png',
		purpose: 'any maskable'
	}
];

const BaseUrl = 'https://wolfstar.rocks';

export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxt/image',
		'@nuxtjs/device',
		'@nuxtjs/sitemap',
		'@nuxt/content',
		'nuxt-icon',
		'nuxt-security',
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'@formkit/nuxt'
	],
	image: { screens: {} },
	runtimeConfig: {
		auth: {
			name: 'wolfstar-auth',
			maxAge: 604800,
			password: process.env.NITRO_AUTH_SECRET ?? '',
			cookie: { sameSite: 'lax' },
			sessionHeader: false
		} satisfies SessionConfig,
		public: {
			origin: process.env.NITRO_ORIGIN,
			clientId: process.env.NITRO_DISCORD_CLIENT_ID
		},
		clientId: process.env.NITRO_DISCORD_CLIENT_ID,
		clientSecret: process.env.NITRO_DISCORD_CLIENT_SECRET
	},

	security: {
		allowedMethodsRestricter: {
			methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
		},
		headers: {
			contentSecurityPolicy: {
				'img-src': ["'self'", 'data:', 'cdn.wolfstar.rocks']
			},
			permissionsPolicy: {
				accelerometer: ['()'],
				'ambient-light-sensor': ['()'],
				autoplay: ['()'],
				battery: ['()'],
				camera: ['()'],
				'display-capture': ['()'],
				'document-domain': ['()'],
				'encrypted-media': ['()'],
				fullscreen: ['()'],
				gamepad: ['()'],
				geolocation: ['()'],
				gyroscope: ['()'],
				hid: ['()'],
				'idle-detection': ['()'],
				'local-fonts': ['()'],
				magnetometer: ['()'],
				microphone: ['()'],
				midi: ['()'],
				payment: ['()'],
				'picture-in-picture': ['()'],
				'publickey-credentials-get': ['()'],
				'screen-wake-lock': ['()'],
				serial: ['()'],
				'speaker-selection': ['()'],
				usb: ['()'],
				'web-share': ['()'],
				'xr-spatial-tracking': ['()']
			}
		},
		corsHandler: {
			origin: process.env.ORIGIN || '*',
			methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
		}
	},

	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml', '/robots.txt']
		}
	},

	formkit: {
		autoImport: true
	},

	site: {
		url: BaseUrl,
		env: 'production'
	},

	sitemap: {
		exclude: ['/join', '/oauth/guild', '/oauth/callback', '/[...id]']
	},

	build: { transpile: ['vee-validate'] },

	pwa: {
		registerType: 'autoUpdate',
		includeManifestIcons: false,

		devOptions: {
			enabled: false,
			type: 'module'
		},
		manifest: {
			background_color: '#131516',
			categories: ['discord', 'bot', 'framework', 'moderation', 'guide', 'wolfstar'],
			description: 'WolfStar is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.',
			display: 'minimal-ui',
			lang: 'en-GB',
			name: 'WolfStar Dashboard',
			orientation: 'portrait-primary',
			scope: '/',
			short_name: 'WolfStar',
			start_url: '/',
			theme_color: '#050505',
			icons: manifestIcons,
			shortcuts: [
				{
					name: 'WolfStar Dashboard',
					short_name: 'WolfStar',
					description: 'Go to WolfStar Dashboard',
					url: '/',
					icons: manifestIcons
				}
			]
		}
	},

	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'WolfStar Dashboard',
			htmlAttrs: { lang: 'en_GB' },
			link: [
				{ rel: 'alternate', href: 'https://wolfstar.rocks' },
				{ rel: 'canonical', href: 'https://wolfstar.rocks' },
				{ rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
				{ rel: 'apple-touch-startup-image', href: '/icons/apple-startup.png' },
				{ rel: 'icon', href: '/icons/android-chrome-192x192.png' },
				{ rel: 'icon', href: '/favicon.ico' },
				{ rel: 'icon', href: '/icons/favicon-16x16.png' },
				{ rel: 'icon', href: '/icons/android-chrome-192x192.png' },
				{ rel: 'icon', href: '/icons/favicon-32x32.png' },
				{ rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' }
			],
			meta: [
				{ 'http-equiv': 'Cache-Control', content: '1y' },
				{ 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
				{ 'http-equiv': 'Expires', content: '1y' },
				{
					'http-equiv': 'Page-Enter',
					content: 'RevealTrans(Duration=2.0,Transition=2)'
				},
				{
					'http-equiv': 'Page-Exit',
					content: 'RevealTrans(Duration=3.0,Transition=12)'
				},
				{ 'http-equiv': 'Pragma', content: '1y' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
				{ name: 'apple-mobile-web-app-title', content: 'WolfStar Dashboard' },
				{ name: 'application-name', content: 'WolfStar' },
				{ name: 'msapplication-TileColor', content: '#23529B' },
				{
					name: 'msapplication-TileImage',
					content: '/icons/mstile-144x144.png'
				},
				{ name: 'msapplication-config', content: '/browserconfig.xml' },
				{ name: 'theme-color', content: '#23529B' },
				{ name: 'revisit-after', content: '7 days' },
				{ name: 'url', content: BaseUrl },
				{ name: 'identifier-URL', content: BaseUrl },
				{ name: 'shortlink', content: BaseUrl },
				{
					name: 'keywords',
					content: 'discord, bot, wolfstar, moderation, automation, wolfstar, cyborg, pokemon'
				},
				{
					name: 'summary',
					content: 'WolfStar is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.'
				},
				{
					name: 'subject',
					content: 'Dashboard for WolfStar, a multifunctional Discord bot.'
				},
				{
					name: 'robots',
					content: 'archive,follow,imageindex,index,odp,snippet,translate'
				},
				{ name: 'googlebot', content: 'index,follow' },
				{ name: 'author', content: 'WolfStar Project, contact@wolfstar.rocks' },
				{ name: 'owner', content: 'WolfStar Project, contact@wolfstar.rocks' },
				{
					name: 'designer',
					content: 'WolfStar Project, contact@wolfstar.rocks'
				},
				{ name: 'reply-to', content: 'contact@wolfstar.rocks' },
				{ name: 'target', content: 'all' },
				{ name: 'audience', content: 'all' },
				{ name: 'coverage', content: 'Worldwide' },
				{ name: 'distribution', content: 'Global' },
				{ name: 'rating', content: 'safe for kids' },
				{ name: 'HandheldFriendly', content: 'True' },
				{ property: 'og:email', content: 'contact@wolfstar.rocks' },
				{
					property: 'og:description',
					content: 'WolfStar is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.'
				},
				{ property: 'og:image:alt', content: 'OpenGraphImage' },
				{ property: 'og:image:height', content: '512' },
				{ property: 'og:image:width', content: '1024' },
				{
					property: 'og:image',
					content: 'https://wolfstar.rocks/icons/opengraph.png'
				},
				{ property: 'og:locale', content: 'en_GB' },
				{ property: 'og:site_name', content: 'WolfStar Dashboard' },
				{ property: 'og:title', content: 'WolfStar Dashboard' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: BaseUrl }
			]
		}
	}
});
