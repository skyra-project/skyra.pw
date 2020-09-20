import { DashboardPack } from '@config/types/ApiData';
import { LocalStorageKeys } from '@utils/constants';
import { loadState } from '@utils/util';
import { createContext, useContext } from 'react';

const discordPack = loadState<DashboardPack>(LocalStorageKeys.DiscordPack);

export interface GlobalState {
	authenticated: boolean;
	pack: DashboardPack;
	toggleAuthenticated(): void;
	updatePack(newPack: DashboardPack): void;
}

export const GlobalStateDefaults: GlobalState = {
	authenticated: false,
	pack: discordPack ?? {
		user: null
	},
	toggleAuthenticated: () => undefined,
	updatePack: () => undefined
};

export const GlobalStateContext = createContext(GlobalStateDefaults);
export const GlobalStateContextProvider = GlobalStateContext.Provider;

export const useGlobalState = () => {
	const context = useContext(GlobalStateContext);

	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalStateContextProvider');
	}

	return context;
};
