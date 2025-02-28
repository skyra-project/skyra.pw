import useGuildSettings from './useGuildSettings';
import type { GuildData } from '~~/lib/database';
import { ConfigurableModerationKeys } from '~~/shared/SettingsDataEntries';

const useGuildModeration = () => {
	const { changes, settings } = useGuildSettings();

	const moderationConfig = {
		keys: ConfigurableModerationKeys
	};

	const updateModerationSetting = (key: keyof GuildData, value: boolean) => {
		changes({ [key]: value });
	};

	return {
		moderationConfig,
		guildSettings: computed(() => settings.value),
		updateModerationSetting
	};
};

export default useGuildModeration;
