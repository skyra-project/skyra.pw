import '@vite-pwa/nuxt';
import 'nuxt';
import type { SessionConfig } from 'h3';
import { DefaultSeoProps, BaseUrl } from './utils/seo/defaultSeoProps';
import { manifestIcons } from './utils/seo/manifest';

export default defineNuxtConfig({
	// Basic settings
	devtools: { enabled: true },

	// Modules
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/device',
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'@nuxt/image',
		'@nuxt/ui',
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'@formkit/nuxt',
		'@pinia/nuxt',
		'nuxt-icon',
		'nuxt-link-checker',
		'pinia-plugin-persistedstate/nuxt'
	],
	css: ['~/assets/css/main.css'],
	icon: {
		componentName: 'NuxtIcon'
	},
	// Module configurations
	image: { screens: {} },

	vueuse: { autoImports: true },
	formkit: { autoImport: true },

	sitemap: {
		exclude: ['/join', '/oauth/guild', '/oauth/callback', '/[...id]']
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

	build: {
		transpile: ['trpc-nuxt']
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
		url: BaseUrl
	},

	// Plugins
	plugins: ['~/plugins/0.auth.ts', '~/plugins/error-handler.ts', '~/plugins/api.ts', '~/plugins/1.trpc.ts', '~/plugins/pinia.ts'],
	pinia: {
		storesDirs: ['./stores/**']
	},

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
	},

	compatibilityDate: '2025-01-10'
});
