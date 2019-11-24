import React, { setGlobal } from 'reactn';
import { hydrate, render } from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { loadState } from 'meta/util';
import Root from 'components/Root';

import addReactNDevTools from 'reactn-devtools';
addReactNDevTools();

const discordUser = loadState('discord_user');
const discordToken = loadState('discord_token');

setGlobal({
	authenticated: !!discordToken && !!discordUser,
	user: discordUser,
	token: discordToken
});

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
	hydrate(<Root />, rootElement);
} else {
	render(<Root />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
