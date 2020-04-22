import Root from 'components/Root';
import { FlattenedGuild, FlattenedUser } from 'meta/typings/ApiData';
import { loadState, logOut } from 'meta/util';
import { render } from 'react-dom';
import React, { setGlobal } from 'reactn';
import addReactNDevTools from 'reactn-devtools';
import 'stylesheets/basestyles.scss';
import * as serviceWorker from './serviceWorker';

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

render(<Root />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

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
	guilds: FlattenedGuild[];
}

declare module 'reactn/default' {
	export interface State {
		authenticated: boolean;
		token: string;
		user: UserState;
	}
}
