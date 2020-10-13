import { DashboardPack } from '@config/types/ApiData';
import { mergeDefault } from '@sapphire/utilities';
import { LocalStorageKeys } from '@utils/constants';
import { loadState } from '@utils/util';
import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { AuthenticationState } from './types';

const discordPack = loadState<DashboardPack>(LocalStorageKeys.DiscordPack);

export const initialState: AuthenticationState = {
	authenticated: Boolean(discordPack) && Boolean(discordPack?.user),
	discordPack: discordPack ?? {
		user: null
	}
};

export const reducer = createReducer(initialState) //
	.handleAction(actions.handleStoreDiscordPack, (state, { payload }) => mergeDefault(state, { discordPack: payload as DashboardPack }));
