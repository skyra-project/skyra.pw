import { DashboardPack } from '@config/types/ApiData';

export enum AuthenticationActionTypes {
	HANDLE_STORE_DISCORD_PACK = '@@authentication/HANDLE_STORE_DISCORD_PACK'
}

export interface AuthenticationState {
	authenticated: boolean;
	discordPack?: DashboardPack;
}
