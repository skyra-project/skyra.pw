import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin(() => {
	const pinia = createPinia();
	pinia.use(piniaPluginPersistedstate);
});
