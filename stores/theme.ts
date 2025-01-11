import { defineStore } from 'pinia';
import { useColorMode, useLocalStorage } from '@vueuse/core';

export type Theme = 'light' | 'dark' | 'auto';

export const useThemeStore = defineStore({
	id: 'themeStore',
	state: () => {
		const { system } = useColorMode<Theme>({
			attribute: 'data-theme',
			selector: 'data-theme'
		});
		return {
			system,
			store: useLocalStorage('theme', 'auto' as Theme),
			availableThemes: ['light', 'dark', 'system'] as Theme[]
		};
	},
	hydrate(storeState, initialState) {
		// @ts-expect-error: https://github.com/microsoft/TypeScript/issues/43826
		storeState.store = useLocalStorage('theme', 'auto' as Theme);
	},
	getters: {
		theme(): Theme {
			return this.store === 'auto' ? this.system : (this.store as Theme);
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
