import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { FlattenedCommand } from '~/types/ApiData';
import type { ExpirableLocalStorageStructure } from '~/utils/constants';
import { StorageKeys } from '~/utils/constants';

export const useCommandsStore = defineStore(StorageKeys.Commands, () => {
	const commandsStorage = ref<ExpirableLocalStorageStructure<FlattenedCommand[]>>({
		expire: 0,
		data: []
	});

	const commands = computed(() => commandsStorage.value.data);

	function setCommands(newCommands: FlattenedCommand[]) {
		commandsStorage.value.data = newCommands;
		commandsStorage.value.expire = Date.now() + 3600000; // 1 hour expiry
	}

	return {
		commandsStorage,
		commands,
		setCommands
	};
});
