import { FlattenedGuild, FlattenedUser } from './ApiData';

export interface RootState {
	authenticated: boolean;
	token: string;
	user: UserState;
}

export interface UserState extends FlattenedUser {
	guilds: FlattenedGuild[];
}

export interface HotNodeModule extends NodeModule {
	hot: any;
}
