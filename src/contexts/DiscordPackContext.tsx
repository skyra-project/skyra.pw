import type { TransformedLoginData } from '@config/types/ApiData';
import { mergeDefault } from '@sapphire/utilities';
import { LocalStorageKeys } from '@utils/constants';
import { loadState } from '@utils/util';
import constate from 'constate';
import { useCallback, useState } from 'react';

const discordPack = loadState<TransformedLoginData>(LocalStorageKeys.DiscordPack);

const useDiscordPackState = () => {
	const [pack, setPack] = useState<TransformedLoginData>(discordPack ?? { user: null });

	const mergePack = useCallback((newPack: Partial<TransformedLoginData>) => setPack(mergeDefault(pack, newPack)), [pack]);

	return { pack, mergePack };
};

export const [DiscordPackProvider, useDiscordPack, mergeDiscordPack] = constate(
	useDiscordPackState,
	(value) => value.pack,
	(value) => value.mergePack
);

export default DiscordPackProvider;
