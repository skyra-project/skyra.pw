import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const BREAKPOINTS = {
	xs: 0,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1920
};

export const BREAKPOINT = Object.keys(BREAKPOINTS).reduce((obj, currentEle) => {
	return { ...obj, [currentEle]: `@media (max-width: ${BREAKPOINTS[currentEle]}px)` };
}, {});

export const CLIENT_ID = '577488230539067403';
export const BASE_WEB_URL = process.env.NODE_ENV === 'production' ? 'https://www.skyra.pw' : 'http://localhost:3000';
export const BASE_API_URL = process.env.NODE_ENV === 'production' ? 'https://api.skyra.pw' : 'http://localhost:1234';
export const BASE_CDN_URL = 'https://cdn.skyra.pw';

export const oauthURL = new URL('https://discordapp.com/oauth2/authorize');
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${BASE_WEB_URL}/oauth/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', CLIENT_ID]
]);
