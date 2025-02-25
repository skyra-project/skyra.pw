import { Time } from '@sapphire/time-utilities';
import { defineStore } from 'pinia';
import { useAPI } from '@/composables/externalApi';
import { StorageKeys, type ExpirableLocalStorageStructure } from '@/utils/constants';

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
				if (this.expired || import.meta.env.DEV) {
					return;
				}

				const { data: commandsData } = await useAPI<string[]>('/commands');
				this.languagesStorage = {
					expire: Date.now() + Time.Day * 6,
					data: Array.isArray(commandsData.value) ? commandsData.value : []
				};
			} catch {
				/* empty */
			}
		}
	},

	persist: true
});
