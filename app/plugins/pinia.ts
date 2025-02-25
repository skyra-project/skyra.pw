import type { Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin(() => {
	const pinia = usePinia() as Pinia;
	pinia.use(piniaPluginPersistedstate);
});
