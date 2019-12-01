import React, { setGlobal } from 'reactn';
import { render } from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { loadState } from 'meta/util';
import Root from 'components/Root';

import addReactNDevTools from 'reactn-devtools';

if (process.env.NODE_ENV === 'development') addReactNDevTools();

const discordUser = loadState('discord_user');
const discordToken = loadState('discord_token');

setGlobal({
	authenticated: Boolean(discordToken) && Boolean(discordUser),
	user: discordUser,
	token: discordToken
});

const rootElement = document.getElementById('root');

render(<Root />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
