import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const CLIENT_ID = '577488230539067403';
export const BASE_WEB_URL = process.env.NODE_ENV === 'production' ? 'https://skyra.netlify.com' : 'http://localhost:3000';
export const BASE_API_URL = process.env.NODE_ENV === 'production' ? 'https://api.skyra.pw' : 'http://localhost:1234';
export const BASE_CDN_URL = 'https://cdn.skyra.pw';

export const oauthURL = new URL('https://discordapp.com/oauth2/authorize');
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${BASE_WEB_URL}/oauth/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', CLIENT_ID]
]);
