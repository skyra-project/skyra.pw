import '@vite-pwa/nuxt';
import 'nuxt';
import type { SessionConfig } from 'h3';
import tailwindcss from '@tailwindcss/vite';

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

const baseURL = 'https://wolfstar.rocks';
const name = 'WolfStar Dashboard';
const description = 'WolfStar is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.';

export default defineNuxtConfig({
	// Modules configuration
	modules: [
		'@nuxt/image',
		'vue-sonner/nuxt',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/seo',
		'@vite-pwa/nuxt',
		'@sentry/nuxt/module',
		'@nuxt/eslint',
		'@prisma/nuxt',
		'@vee-validate/nuxt',
		'nuxt-security',
		'@nuxt/icon',
		'@nuxtjs/color-mode'
	],
	imports: {
		presets: [
			{
				from: 'vue-sonner',
				imports: ['toast']
			},
			{
				from: '@sentry/nuxt',
				imports: ['captureException']
			},
			{
				from: 'consola',
				imports: ['consola']
			}
		],
		dirs: ['./database']
	},
	devtools: {
		enabled: true
	},
	// App meta configuration
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			titleTemplate: '%s - WolfStar',
			htmlAttrs: { lang: 'en' },
			link: [
				{ rel: 'alternate', href: baseURL },
				{ rel: 'canonical', href: baseURL },
				{ rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
				{ rel: 'apple-touch-startup-image', href: '/icons/apple-startup.png' },
				{ rel: 'icon', href: '/icons/android-chrome-192x192.png' },
				{ rel: 'icon', href: '/favicon.ico' },
				{ rel: 'icon', href: '/icons/favicon-16x16.png' },
				{ rel: 'icon', href: '/icons/favicon-32x32.png' },
				{ rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' }
			],
			meta: [
				// Cache control
				{ 'http-equiv': 'Cache-Control', content: '1y' },
				{ 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
				{ 'http-equiv': 'Expires', content: '1y' },
				{ 'http-equiv': 'Pragma', content: '1y' },

				// Page transitions
				{ 'http-equiv': 'Page-Enter', content: 'RevealTrans(Duration=2.0,Transition=2)' },
				{ 'http-equiv': 'Page-Exit', content: 'RevealTrans(Duration=3.0,Transition=12)' },

				// Mobile specific
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
				{ name: 'apple-mobile-web-app-title', content: name },
				{ name: 'HandheldFriendly', content: 'True' },

				// Microsoft specific
				{ name: 'application-name', content: 'WolfStar' },
				{ name: 'msapplication-TileColor', content: '#fd171b' },
				{ name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' },
				{ name: 'msapplication-config', content: '/browserconfig.xml' },

				// Theme and appearance
				{ name: 'theme-color', content: '#fd171b' },

				// SEO meta tags
				{ name: 'revisit-after', content: '7 days' },
				{ name: 'url', content: baseURL },
				{ name: 'identifier-URL', content: baseURL },
				{ name: 'shortlink', content: baseURL },
				{ name: 'keywords', content: 'discord, bot, wolfstar, moderation, automation, wolfstar, cyborg' },
				{
					name: 'summary',
					content: description
				},
				{ name: 'subject', content: description },

				// Robots and indexing
				{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
				{ name: 'googlebot', content: 'index,follow' },

				// Authorship and ownership
				{ name: 'author', content: 'WolfStar Project, contact@wolfstar.rocks' },
				{ name: 'owner', content: 'Davide Trinastich, redtwoghost@gmail.com' },
				{ name: 'designer', content: 'Davide Trinastich, redtwoghost@gmail.com' },
				{ name: 'reply-to', content: 'contact@wolfstar.rocks' },

				// Distribution and audience
				{ name: 'target', content: 'all' },
				{ name: 'audience', content: 'all' },
				{ name: 'coverage', content: 'Worldwide' },
				{ name: 'distribution', content: 'Global' },
				{ name: 'rating', content: 'safe for kids' },

				// Open Graph meta tags
				{ property: 'og:email', content: 'contact@wolfstar.rocks' },
				{
					property: 'og:description',
					content: description
				},
				{ property: 'og:image:alt', content: 'OpenGraphImage' },
				{ property: 'og:image:height', content: '512' },
				{ property: 'og:image:width', content: '1024' },
				{ property: 'og:image', content: 'https://wolfstar.rocks/icons/opengraph.png' },
				{ property: 'og:locale', content: 'en' },
				{ property: 'og:site_name', content: name },
				{ property: 'og:title', content: name },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: baseURL }
			]
		}
	},

	css: ['~/assets/css/main.css'],
	site: {
		name: 'WolfStar',
		url: 'https://wolfstar.rocks'
	},
	// Runtime configuration
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
			clientId: process.env.NITRO_DISCORD_CLIENT_ID,
			apiOrigin: process.env.NITRO_API_ORIGIN,
			sentry: {
				dsn: process.env.NITRO_SENTRY_DSN
			}
		},
		token: process.env.NITRO_DISCORD_TOKEN,
		clientId: process.env.NITRO_DISCORD_CLIENT_ID,
		clientSecret: process.env.NITRO_DISCORD_CLIENT_SECRET,
		apiOrigin: process.env.NITRO_API_ORIGIN
	},
	// Build configuration
	build: {
		transpile: ['trpc-nuxt']
	},

	routeRules: {
		'/': { isr: true, prerender: true }
	},
	sourcemap: {
		client: 'hidden'
	},

	future: {
		compatibilityVersion: 4
	},

	experimental: {
		viewTransition: true
	},
	compatibilityDate: '2025-01-10',
	// Nitro server configuration
	nitro: {
		preset: 'cloudflare-pages',
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml', '/robots.txt']
		}
	},
	vite: {
		plugins: [tailwindcss()]
	},

	icon: {
		clientBundle: {
			scan: true
		},
		componentName: 'NuxtIcon'
	},
	image: {
		screens: {}
	},

	ogImage: {
		zeroRuntime: true
	},

	pinia: {
		storesDirs: ['./stores/**']
	},
	// PWA configuration
	pwa: {
		registerType: 'autoUpdate',
		devOptions: {
			enabled: false,
			type: 'module'
		},
		workbox: {
			navigateFallback: '/',
			globPatterns: ['**/*.{js,css,html,png,svg,ico,xml}']
		},
		manifest: {
			background_color: '#050505',
			categories: ['discord', 'bot', 'framework', 'moderation', 'guide', 'wolfstar'],
			description,
			display: 'minimal-ui',
			lang: 'en-GB',
			name,
			orientation: 'portrait-primary',
			scope: '/',
			short_name: 'WolfStar',
			start_url: '/',
			theme_color: '#fd171b',
			icons: manifestIcons,
			shortcuts: [
				{
					name,
					short_name: 'Homepage',
					description: "Go to WolfStar's dashboard",
					url: '/',
					icons: manifestIcons
				},
				{
					name: 'WolfStar Commands',
					short_name: 'Commands',
					description: "View WolfStar's commands",
					url: '/commands',
					icons: manifestIcons
				},
				{
					name: 'WolfStar Privacy Policy',
					short_name: 'Privacy Policy',
					description: "Read WolfStar's Privacy Policy",
					url: '/privacy',
					icons: manifestIcons
				},
				{
					name: 'WolfStar Terms of Service',
					short_name: 'Terms of Service',
					description: "Read WolfStar's Terms of Service",
					url: '/terms',
					icons: manifestIcons
				}
			]
		}
	},
	colorMode: {
		preference: 'system', // default theme
		dataValue: 'theme', // activate data-theme in <html> tag
		classSuffix: '',
		fallback: 'light'
	},
	security: {
		allowedMethodsRestricter: { methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'] },
		headers: {
			contentSecurityPolicy: {
				'img-src': ["'self'", 'data:', 'cdn.wolfstar.rocks', 'cdn.discordapp.com', 'jsdelivr.com'],
				'script-src-attr': ["'self'", 'jsdelivr.com'],
				'style-src': ["'self'", "'nonce-{{nonce}}'"],
				'script-src': ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'"]
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
		},
		rateLimiter: false
	},
	sentry: {
		autoInjectServerSentry: 'experimental_dynamic-import'
	},
	sitemap: {
		exclude: ['/join', '/oauth/guild', '/oauth/callback', '/[...id]']
	},
	veeValidate: {
		// Use different names for components
		componentNames: {
			Form: 'VeeForm',
			Field: 'VeeField',
			FieldArray: 'VeeFieldArray',
			ErrorMessage: 'VeeErrorMessage'
		}
	}
});
