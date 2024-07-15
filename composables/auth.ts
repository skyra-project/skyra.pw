export const useAuth = () =>
	useNuxtApp().$auth as {
		loggedIn: ComputedRef<boolean>;
		session: Ref<{
			name: string;
			id: string;
			avatar: string | null;
		} | null>;
		redirectTo: Ref<string>;
		updateSession: (opts?: { dedupe?: 'cancel' | 'defer' }) => Promise<void>;
	};

export function getLoginURL() {
	const DiscordOauthURL = `https://discord.com/oauth2/authorize`;
	const url = new URL(DiscordOauthURL);
	url.search = new URLSearchParams([
		['redirect_uri', `${getOrigin()}/oauth/callback`],
		['response_type', 'code'],
		['scope', ['identify', 'guilds'].join(' ')],
		['client_id', getClientId()]
	]).toString();
	return url.toString();
}

export const guildAddURL = (guildID: string) => {
	const DiscordOauthURL = `https://discord.com/oauth2/authorize`;
	const guildAuthURL = new URL(DiscordOauthURL);
	guildAuthURL.search = new URLSearchParams([
		['redirect_uri', `${getOrigin()}/oauth/guild`],
		['response_type', 'code'],
		['scope', 'bot'],
		['client_id', getClientId()],
		['permissions', '491121748'],
		['guild_id', guildID]
	]).toString();
	return guildAuthURL.toString();
};

export async function authLogout() {
	await $fetch('/api/auth/logout', { method: 'POST' });
	useAuth().session.value = null;
}
