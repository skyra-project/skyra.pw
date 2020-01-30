import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const BASE_WEB_URL = process.env.REACT_APP_BASE_WEB_URL;
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export const WS_URL = process.env.REACT_APP_WS_URL;
export const BASE_CDN_URL = 'https://cdn.skyra.pw';

const DiscordOauthURL = `https://discordapp.com/oauth2/authorize`;
export const oauthURL = new URL(DiscordOauthURL);
export const inviteURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${BASE_WEB_URL}/oauth/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', CLIENT_ID]
]);
inviteURL.search = new URLSearchParams([
	['client_id', CLIENT_ID],
	['permissions', '356904022'],
	['scope', 'bot']
]);

export const guildAddURL = guildID => {
	const guildAuthURL = new URL(DiscordOauthURL);
	guildAuthURL.search = new URLSearchParams([
		['redirect_uri', `${BASE_WEB_URL}/oauth/guild`],
		['response_type', 'code'],
		['scope', 'bot'],
		['client_id', CLIENT_ID],
		['permissions', '356904020'],
		['guild_id', guildID]
	]);
	return guildAuthURL.toString();
};
