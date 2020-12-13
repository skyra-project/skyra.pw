export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
export const BASE_WEB_URL = process.env.NEXT_PUBLIC_BASE_WEB_URL;
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
export const BASE_CDN_URL = 'https://cdn.skyra.pw';

const DiscordOauthURL = `https://discord.com/oauth2/authorize`;
export const serverURL = 'https://discord.com/invite/6gakFR2';
export const oauthURL = new URL(DiscordOauthURL);
export const inviteURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${BASE_WEB_URL}/oauth/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', CLIENT_ID]
]).toString();
inviteURL.search = new URLSearchParams([
	['client_id', CLIENT_ID],
	['permissions', '491121748'],
	['redirect_uri', BASE_WEB_URL],
	['response_type', 'code'],
	['scope', 'bot']
]).toString();

export const guildAddURL = (guildID: string) => {
	const guildAuthURL = new URL(DiscordOauthURL);
	guildAuthURL.search = new URLSearchParams([
		['redirect_uri', `${BASE_WEB_URL}/oauth/guild`],
		['response_type', 'code'],
		['scope', 'bot'],
		['client_id', CLIENT_ID],
		['permissions', '491121748'],
		['guild_id', guildID]
	]).toString();
	return guildAuthURL.toString();
};

export enum LocalStorageKeys {
	HasCookieConsent = 'allows_cookies',
	DiscordPack = 'discord_pack',
	LastSync = 'last_sync'
}

export enum FetchMethods {
	Post = 'POST',
	Patch = 'PATCH',
	Get = 'GET'
}

export const EmojiRegexExtractId = /<?a?:\w{2,32}:(\d{17,21})>?/;
export const EmojiRegexExtractName = /<?a?:(\w{2,32}):\d{17,21}>?/;
export const SettingsDrawerWidth = 240;
