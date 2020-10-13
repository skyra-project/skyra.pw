import { DashboardPack } from '@config/types/ApiData';
import { createAction } from 'typesafe-actions';
import { AuthenticationActionTypes } from './types';

export const handleStoreDiscordPack = createAction(AuthenticationActionTypes.HANDLE_STORE_DISCORD_PACK)<Partial<DashboardPack>>();
