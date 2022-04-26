import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	cdnURL: 'https://cdn.skyra.pw',
	css: ['~/assets/css/app.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},
	modules: ['@vueuse/nuxt'],
	typescript: {
		strict: true
	}
});
