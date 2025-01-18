import type { Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
	const pinia = usePinia() as Pinia;
	pinia.use(piniaPluginPersistedstate);
});
