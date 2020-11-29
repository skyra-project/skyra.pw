import { GuildSettings } from '#config/types/GuildSettings';
import constate from 'constate';
import deepMerge, { Options as DeepMergeOptions } from 'deepmerge';
import { useState } from 'react';
import { useGuildSettingsChangesContext } from './GuildSettingsChangesContext';

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

const useGuildSettingsHook = () => {
	const [guildSettings, setGuildSettings] = useState<GuildSettings>();
	const { guildSettingsChanges } = useGuildSettingsChangesContext();

	return {
		guildSettings: deepMerge(guildSettings ?? {}, guildSettingsChanges ?? {}, mergeOptions),
		setGuildSettings
	};
};

export const [GuildSettingsProvider, useGuildSettingsContext] = constate(useGuildSettingsHook);

export default GuildSettingsProvider;
