import { ref, computed, readonly } from 'vue';
import deepMerge, { type Options as DeepMergeOptions } from 'deepmerge';
import type { GuildData, GuildDataValue } from '~~/lib/database';

type NullablePartialGuildData = Partial<{ [K in keyof GuildData]: GuildData[K] | null }>;
// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

const useGuildSettings = () => {
	const guildSettings = ref<GuildData | null>(null);
	const guildSettingsChanges = ref<NullablePartialGuildData | null>(null);

	const mergedSettings = computed({
		get: () => {
			return deepMerge(guildSettings.value ?? {}, guildSettingsChanges.value ?? {}, mergeOptions);
		},
		set: (newSettings: NullablePartialGuildData) => {
			if (!newSettings) {
				guildSettingsChanges.value = null;
				return;
			}

			guildSettingsChanges.value = deepMerge(guildSettingsChanges.value ?? {}, newSettings, mergeOptions);
		}
	});

	const changes = (settings: GuildData | { [key: string]: GuildDataValue | undefined }) => {
		guildSettingsChanges.value = settings;
	};

	const resetChanges = (keyOrEvent?: keyof GuildData | Event) => {
		// Handle the case when the function is called from a button click
		if (keyOrEvent instanceof Event) {
			guildSettingsChanges.value = null;
			return;
		}

		const key = keyOrEvent;

		if (!key) {
			guildSettingsChanges.value = null;
			return;
		}

		if (guildSettingsChanges.value && key in guildSettingsChanges.value) {
			Reflect.deleteProperty(guildSettingsChanges.value, key);

			// If there are no more changes, set the whole object to null
			if (Object.keys(guildSettingsChanges.value).length === 0) {
				guildSettingsChanges.value = null;
			}
		} else if (guildSettingsChanges.value) {
			guildSettingsChanges.value = {
				...guildSettingsChanges.value,
				[key]: null
			};
		} else {
			guildSettingsChanges.value = {
				[key]: null
			};
		}
	};

	const hasChanges = computed(() => {
		return !!guildSettingsChanges.value && Object.keys(guildSettingsChanges.value).length > 0;
	});

	return {
		settings: readonly(mergedSettings),
		resetChanges,
		hasChanges,
		changes
	};
};

export default useGuildSettings;
