import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
export default defineNuxtPlugin((nuxtApp) => {
	const pinia = createPinia();
	pinia.use(piniaPluginPersistedstate);

	return {
		provide: {
			pinia
		}
	};
});
