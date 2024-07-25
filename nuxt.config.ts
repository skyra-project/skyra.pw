import '@vite-pwa/nuxt';
import 'nuxt';
import type { SessionConfig } from 'h3';
import { DefaultSeoProps, BaseUrl } from './config/seo/defaultSeoProps';

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

export default defineNuxtConfig({
	// Basic settings
	devtools: { enabled: true },

	// Modules
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/device',
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'@nuxt/content',
		'@nuxt/image',
		'nuxt-icon',
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'@formkit/nuxt',
		'nuxt-link-checker',
		'@nuxtjs/color-mode',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt'
	],

	// Module configurations
	image: { screens: {} },
	vueuse: { autoImports: true },
	formkit: { autoImport: true },
	sitemap: {
		exclude: ['/join', '/auth/guild', '/auth/callback', '/[...id]']
	},

	// Runtime configuration
	runtimeConfig: {
		auth: {
			name: 'WOLFSTAR_AUTH',
			maxAge: 604800,
			password: process.env.NITRO_AUTH_SECRET ?? '',
			cookie: { sameSite: 'lax' },
			sessionHeader: false
		} satisfies SessionConfig,
		public: {
			origin: process.env.NITRO_ORIGIN,
			clientId: process.env.NITRO_DISCORD_CLIENT_ID,
			apiOrigin: process.env.NITRO_API_ORIGIN
		},
		clientId: process.env.NITRO_DISCORD_CLIENT_ID,
		clientSecret: process.env.NITRO_DISCORD_CLIENT_SECRET,
		apiOrigin: process.env.NITRO_API_ORIGIN
	},

	// Nitro configuration
	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml', '/robots.txt']
		}
	},

	// Site configuration
	site: {
		url: BaseUrl,
		env: 'production'
	},

	// Plugins
	plugins: ['~/plugins/0.auth.ts', '~/plugins/error-handler.ts'],

	// PWA configuration
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

	// App configuration
	app: {
		head: DefaultSeoProps
	}
});
