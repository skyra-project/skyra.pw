import Root from 'components/Root';
import { FlattenedGuild, FlattenedUser } from 'meta/typings/ApiData';
import { loadState, logOut } from 'meta/util';
import { render } from 'react-dom';
import React, { setGlobal } from 'reactn';
import addReactNDevTools from 'reactn-devtools';
import './index.css';

const rootElement = document.getElementById('root');

const discordUser = loadState('discord_user') as UserState;
const discordToken = loadState('discord_token') as string;

if (discordUser && discordUser.avatarURL) {
	logOut();
} else {
	setGlobal({
		authenticated: Boolean(discordToken) && Boolean(discordUser),
		user: discordUser,
		token: discordToken
	});
}

window.$discordMessage = {
	avatars: {
		default: 'blue',
		skyra: 'https://github.com/NM-EEA-Y.png'
	}
};

render(<Root />, rootElement);

if (process.env.NODE_ENV === 'development') {
	addReactNDevTools();
	if ((module as HotNodeModule).hot) {
		(module as HotNodeModule).hot.accept('./components/Root.tsx', () => {
			const NextApp = require('./components/Root.tsx').default;
			render(<NextApp />, rootElement);
		});
	}
}

interface HotNodeModule extends NodeModule {
	hot: any;
}

interface UserState extends FlattenedUser {
	guilds?: FlattenedGuild[];
}

declare module 'reactn/default' {
	export interface State {
		authenticated: boolean;
		token: string;
		user: UserState;
	}
}

declare global {
	interface DiscordMessageProfile {
		author: string;
		avatar: string;
		bot: boolean;
		roleColor: string;
	}

	interface Window {
		$discordMessage: Partial<{
			avatars: Record<string, string>;
			profiles: Record<string, DiscordMessageProfile>;
		}>;
	}
}
