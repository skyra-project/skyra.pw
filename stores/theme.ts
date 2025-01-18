import { defineStore } from 'pinia';
import { useColorMode, type BasicColorMode } from '@vueuse/core';
import { StorageKeys } from '~/utils/constants';

export type Theme = BasicColorMode;

export const useThemeStore = defineStore(StorageKeys.Theme, {
	state: () => {
		const { system, store } = useColorMode<Theme>({
			attribute: 'data-theme',
			selector: 'data-theme',
			emitAuto: true
		});
		return {
			system,
			store,
			mode: computed(() => (store.value === 'auto' ? system.value : store.value))
		};
	},
	getters: {
		theme(): Theme {
			return this.mode;
		}
	},
	actions: {
		setTheme(value: Theme) {
			this.mode = value;
			if (import.meta.client) {
				document.documentElement.setAttribute('data-theme', this.mode);
			}
		},
		toggleTheme() {
			this.mode = this.mode === 'dark' ? 'light' : 'dark';

			if (import.meta.client) {
				document.documentElement.setAttribute('data-theme', this.mode);
			}
		}
	},
	persist: {
		storage: piniaPluginPersistedstate.localStorage()
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
