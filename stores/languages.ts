import { defineStore } from 'pinia';
import { StorageKeys, Time, type ExpirableLocalStorageStructure } from '~/utils/constants';
import { useAPI } from '~/composables/api';

export const useLanguagesStore = defineStore(StorageKeys.Language, {
	state: () => ({
		languagesStorage: {
			expire: 0,
			data: []
		} as ExpirableLocalStorageStructure<string[]>
	}),

	getters: {
		languages(): string[] {
			return this.languagesStorage.data;
		},
		expired(): boolean {
			return this.languagesStorage.expire < Date.now();
		}
	},
	actions: {
		async fetchLanguages() {
			try {
				if (this.languagesStorage.expire > Date.now() || import.meta.env.DEV) {
					return;
				}

				const { data: commandsData } = await useAPI<string[]>('/commands');
				this.languagesStorage = {
					expire: Date.now() + Time.Day * 6,
					data: Array.isArray(commandsData.value) ? commandsData.value : []
				};
			} catch (error) {
				console.error('Error fetching commands:', error);
			}
		}
	},

	persist: true
});
