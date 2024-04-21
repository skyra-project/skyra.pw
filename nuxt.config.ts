import type { SessionConfig } from 'h3';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/sitemap', 'nuxt-icon', '@nuxt/image'],
	image: { screens: {} },
	runtimeConfig: {
		auth: {
			name: 'skyra-auth',
			maxAge: 604800,
			password: process.env.AUTH_SECRET ?? '',
			cookie: { sameSite: 'lax' },
			sessionHeader: false
		} satisfies SessionConfig,
		clientId: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET
	}
});
