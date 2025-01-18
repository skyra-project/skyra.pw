import { defineStore } from 'pinia';
import type { FlattenedCommand } from '~/utils/types/ApiData';
import { StorageKeys, Time, type ExpirableLocalStorageStructure } from '~/utils/constants';
import { useAPI } from '~/composables/api';

export const useCommandsStore = defineStore(StorageKeys.Language, {
	state: () => ({
		commandsStorage: {
			expire: 0,
			data: []
		} as ExpirableLocalStorageStructure<FlattenedCommand[]>
	}),

	getters: {
		commands(): FlattenedCommand[] {
			return this.commandsStorage.data;
		},
		expired(): boolean {
			return this.commandsStorage.expire < Date.now();
		}
	},
	actions: {
		async fetchCommands() {
			try {
				if (this.commandsStorage.expire > Date.now() || import.meta.env.DEV) {
					return;
				}

				const { data: commandsData } = await useAPI<FlattenedCommand[]>('/languages');

				console.log('commandsData', commandsData);
				this.commandsStorage = {
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
