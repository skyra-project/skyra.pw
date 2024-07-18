import { ref, computed } from 'vue';
import type { TransformedLoginData } from '~/config/types/ApiData';
import { LocalStorageKeys } from '~/utils/constants';
import deepMerge, { type Options as DeepMergeOptions } from 'deepmerge';
import { loadState, saveState } from '~/utils/util';

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

const discordPackStorage = useLocalStorage<TransformedLoginData>(LocalStorageKeys.DiscordPack, () => {
	const storedPack = loadState<TransformedLoginData>(LocalStorageKeys.DiscordPack);
	return storedPack ?? {};
});

export function useDiscordPack() {
	const pack = ref(discordPackStorage ?? {});

	const mergePack = (newPack: Partial<TransformedLoginData>) => {
		pack.value = deepMerge(pack.value ?? {}, newPack ?? {}, mergeOptions);
		discordPackStorage.value = pack.value;
	};

	return {
		pack: computed(() => pack.value),
		mergePack
	};
}
