import { computed } from 'vue';
import useGuildData from './useGuildData';
import useGuildSettings from './useGuildSettings';
import { ConfigurableRoles, ConfigurableRemoveInitialRole } from '@/lib/types/SettingsDataEntries';
import type { GuildData, GuildDataKey, GuildDataValue } from '@/lib/database/settings/types';

const useGuildRoles = () => {
	const { guildData } = useGuildData();
	const { settings } = useGuildSettings();

	const roleConfig = {
		removeInitial: ConfigurableRemoveInitialRole,
		roles: ConfigurableRoles
	};

	const updateRoleSetting = (key: GuildDataKey, value: GuildDataValue) => {
		settings.value = { [key]: value };
	};

	const resetRole = (key: GuildDataKey) => {
		settings.value = { [key]: undefined };
	};

	const getRoleSelectComponent = (key: GuildDataKey) => {
		const isMultiple = Array.isArray((settings.value as GuildData)?.[key]);
		return isMultiple ? 'SelectsSelectRoles' : 'SelectsSelectRole';
	};

	const getRoleProps = (role: (typeof ConfigurableRoles)[0]) => {
		return {
			label: role.name,
			tooltipTitle: role.tooltip,
			modelValue: settings.value?.[role.key],
			guild: guildData.value,
			filterEveryone: true,
			class: 'w-full text-left min-h-[60px] md:min-h-[inherit]'
		};
	};

	return {
		roleConfig,
		settings: computed(() => settings.value),
		updateRoleSetting,
		resetRole,
		getRoleSelectComponent,
		getRoleProps
	};
};

export default useGuildRoles;
