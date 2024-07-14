import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';

export type Theme = 'light' | 'dark' | 'auto';

export function useTheme() {
	const { system, store } = useColorMode<Theme>({
		attribute: 'color-scheme'
	});

	const colorMode = computed(() => (store.value === 'auto' ? system.value : store.value));

	const theme = computed({
		get: () => {
			switch (colorMode.value) {
				case 'dark':
					return 'dark';
				case 'light':
					return 'light';
				default:
					return 'auto';
			}
		},
		set: (value: string) => {
			switch (value) {
				case 'dark':
					store.value = 'dark';
					break;
				case 'light':
					store.value = 'light';
					break;
				case 'auto':
					store.value = 'auto';
				default:
					store.value = 'dark';
			}
		}
	});

	watch(
		colorMode,
		(newMode) => {
			document.documentElement.setAttribute('data-theme', newMode);
		},
		{ immediate: true }
	);

	const toggleTheme = () => {
		if (theme.value === 'auto') {
			theme.value = 'auto'; // Imposta il tema del sistema
		} else {
			theme.value = theme.value === 'light' ? 'dark' : 'light';
		}
	};

	const setTheme = (value: Theme) => {
		theme.value = value;
	};

	return {
		theme,
		toggleTheme,
		setTheme,
		colorMode,
		availableThemes: ['light', 'dark', 'auto'] as Theme[] // Aggiungi qui altri temi DaisyUI se necessario
	};
}
