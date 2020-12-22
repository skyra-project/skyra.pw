import { DashboardPack } from '#config/types/ApiData';
import { LocalStorageKeys } from '#utils/constants';
import { loadState } from '#utils/util';
import { mergeDefault } from '@sapphire/utilities';
import constate from 'constate';
import { useCallback, useState } from 'react';

const discordPack = loadState<DashboardPack>(LocalStorageKeys.DiscordPack);

const useDiscordPackState = () => {
	const [pack, setPack] = useState<DashboardPack>(discordPack ?? { user: null });

	const mergePack = useCallback((newPack: Partial<DashboardPack>) => setPack(mergeDefault(pack, newPack)), [pack]);

	return { pack, mergePack };
};

export const [DiscordPackProvider, useDiscordPack, mergeDiscordPack] = constate(
	useDiscordPackState,
	(value) => value.pack,
	(value) => value.mergePack
);

export default DiscordPackProvider;
