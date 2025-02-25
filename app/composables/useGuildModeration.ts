import { computed } from 'vue';
import useGuildSettings from './useGuildSettings';
import { ConfigurableModerationKeys } from '@/lib/types/SettingsDataEntries';
import type { GuildData } from '@/lib/database/settings/types';

const useGuildModeration = () => {
	const { settings } = useGuildSettings();

	const moderationConfig = {
		keys: ConfigurableModerationKeys
	};

	const updateModerationSetting = (key: keyof GuildData, value: boolean) => {
		settings.value = { [key]: value };
	};

	return {
		moderationConfig,
		guildSettings: computed(() => settings.value),
		updateModerationSetting
	};
};

export default useGuildModeration;
