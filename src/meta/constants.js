import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const oauthURL = new URL('https://discordapp.com/oauth2/authorize');
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${process.env.REACT_APP_BASE_WEB_URL}/oauth/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', process.env.REACT_APP_CLIENT_ID]
]);

export const guildAddURL = guildID => {
	const guildAuthURL = new URL('https://discordapp.com/oauth2/authorize');
	guildAuthURL.search = new URLSearchParams([
		['redirect_uri', `${process.env.REACT_APP_BASE_WEB_URL}/oauth/guild`],
		['response_type', 'code'],
		['scope', 'bot'],
		['client_id', process.env.REACT_APP_CLIENT_ID],
		['permissions', '356904020'],
		['guild_id', guildID]
	]);
	return guildAuthURL.toString();
};
