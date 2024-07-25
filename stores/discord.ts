import { defineStore } from 'pinia';
import type { TransformedLoginData } from '~/config/types/ApiData';
import { LocalStorageKeys } from '~/utils/constants';
import deepMerge, { type Options as DeepMergeOptions } from 'deepmerge';
import { remove } from 'lodash';

const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

export const useDiscordPackStore = defineStore({
	id: 'discordPackStore',
	state: () => ({
		discordPack: null as TransformedLoginData | null
	}),
	getters: {
		pack: (state) => state.discordPack
	},
	actions: {
		setPack(newPack: Partial<TransformedLoginData>) {
			this.discordPack = deepMerge(this.discordPack ?? {}, newPack ?? {}, mergeOptions);
		},
		clearPack() {
			this.discordPack = { user: null };
		}
	},
	persist: {
		key: LocalStorageKeys.DiscordPack,
		beforeRestore: (context) => {
			if (context.store.$state.discordPack === null) {
				context.store.$state.discordPack = { user: null };
			}
		},
		afterRestore: (context) => {
			if (context.store.$state.discordPack === null) {
				context.store.$state.discordPack = { user: null };
			}
		}
	}
});
