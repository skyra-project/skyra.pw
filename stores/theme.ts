import { defineStore } from 'pinia';
import { useColorMode } from '@vueuse/core';

export type Theme = 'light' | 'dark' | 'auto';

export const useThemeStore = defineStore({
	id: 'themeStore',
	state: () => {
		const { system, store } = useColorMode<Theme>({
			attribute: 'data-theme',
			selector: 'data-theme'
		});
		return {
			system,
			store,
			availableThemes: ['light', 'dark', 'system'] as Theme[]
		};
	},
	getters: {
		theme(): Theme {
			return this.store === 'auto' ? this.system : this.store;
		}
	},
	actions: {
		setTheme(value: Theme) {
			this.store = value;
			if (import.meta.client) {
				document.documentElement.setAttribute('data-theme', this.store);
			}
		},
		toggleTheme() {
			this.store = this.store === 'auto' ? this.system : this.store === 'light' ? 'dark' : 'light';

			if (import.meta.client) {
				document.documentElement.setAttribute('data-theme', this.store);
			}
		}
	}
});
