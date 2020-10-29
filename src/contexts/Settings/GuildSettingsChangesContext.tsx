import { GuildSettings } from '@config/types/GuildSettings';
import constate from 'constate';
import deepMerge, { Options as DeepMergeOptions } from 'deepmerge';
import { useState } from 'react';
import { DeepPartial } from 'utility-types';

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

const useGuildSettingsHook = () => {
	const [guildSettingsChanges, setGuildSettingsChanges] = useState<GuildSettings>();

	const mergeGuildSettings = (changes?: DeepPartial<GuildSettings>) => {
		if (!changes) return setGuildSettingsChanges(undefined);

		setGuildSettingsChanges(deepMerge<GuildSettings, DeepPartial<GuildSettings>>(guildSettingsChanges ?? {}, changes, mergeOptions));
	};

	return {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		guildSettingsChanges: guildSettingsChanges!,
		setGuildSettingsChanges: mergeGuildSettings
	};
};

export const [GuildSettingsChangesProvider, useGuildSettingsChangesContext] = constate(useGuildSettingsHook);

export default GuildSettingsChangesProvider;
