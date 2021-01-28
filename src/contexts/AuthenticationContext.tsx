import type { TransformedLoginData } from '#config/types/ApiData';
import { LocalStorageKeys } from '#utils/constants';
import { loadState } from '#utils/util';
import constate from 'constate';
import { useState } from 'react';

const discordPack = loadState<TransformedLoginData>(LocalStorageKeys.DiscordPack);

const useAuthenticatedState = () => {
	const [authenticated, setAuthenticated] = useState<boolean>(Boolean(discordPack) && Boolean(discordPack?.user));

	return { authenticated, setAuthenticated };
};

export const [AuthenticatedProvider, useAuthenticated, setAuthenticated] = constate(
	useAuthenticatedState,
	(value) => value.authenticated,
	(value) => value.setAuthenticated
);

export default AuthenticatedProvider;
