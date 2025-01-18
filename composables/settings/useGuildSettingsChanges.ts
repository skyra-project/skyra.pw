import { ref } from 'vue';
import type { GuildSettings } from '~/utils/types/GuildSettings';
import deepMerge, { type Options as DeepMergeOptions } from 'deepmerge';

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

export const useGuildSettingsChanges = () => {
	const guildSettingsChanges = ref<GuildSettings | null>(null);

	const mergeGuildSettings = (changes?: Partial<GuildSettings>) => {
		if (!changes) {
			guildSettingsChanges.value = null;
		} else {
			guildSettingsChanges.value = deepMerge(guildSettingsChanges.value ?? {}, changes, mergeOptions);
		}
	};

	return {
		guildSettingsChanges,
		setGuildSettingsChanges: mergeGuildSettings
	};
};
