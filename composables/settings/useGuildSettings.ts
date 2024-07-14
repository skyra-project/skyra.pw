import { ref, computed } from 'vue';
import type { GuildSettings } from '~/config/types/GuildSettings';
import deepMerge, { type Options as DeepMergeOptions } from 'deepmerge';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

export const useGuildSettings = () => {
	const guildSettings = ref<GuildSettings | null>(null);
	const { guildSettingsChanges } = useGuildSettingsChanges();

	const mergedGuildSettings = computed(() => {
		return deepMerge(guildSettings.value ?? {}, guildSettingsChanges.value ?? {}, mergeOptions);
	});

	const setGuildSettings = (newSettings: Partial<GuildSettings>) => {
		(guildSettings as unknown as any).value = newSettings;
	};

	return {
		guildSettings: mergedGuildSettings,
		setGuildSettings
	};
};
