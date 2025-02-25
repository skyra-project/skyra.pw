import { ref, computed } from 'vue';
import deepMerge, { type Options as DeepMergeOptions } from 'deepmerge';
import type { GuildData } from '@/lib/database/settings/types';

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

const useGuildSettings = () => {
	const guildSettings = ref<GuildData | null>(null);
	const guildSettingsChanges = ref<Partial<GuildData> | null>(null);

	const mergedSettings = computed({
		get: () => {
			return deepMerge(guildSettings.value ?? {}, guildSettingsChanges.value ?? {}, mergeOptions);
		},
		set: (newSettings: Partial<GuildData>) => {
			if (!newSettings) {
				guildSettingsChanges.value = null;
				return;
			}

			guildSettingsChanges.value = deepMerge(guildSettingsChanges.value ?? {}, newSettings, mergeOptions);
		}
	});

	const setBaseSettings = (settings: GuildData) => {
		guildSettings.value = settings;
	};

	const resetChanges = () => {
		guildSettingsChanges.value = null;
	};

	const hasChanges = computed(() => {
		return !!guildSettingsChanges.value && Object.keys(guildSettingsChanges.value).length > 0;
	});

	return {
		settings: mergedSettings,
		setBaseSettings,
		resetChanges,
		hasChanges,
		changes: guildSettingsChanges
	};
};

export default useGuildSettings;
