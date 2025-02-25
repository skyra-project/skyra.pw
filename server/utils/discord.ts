import type {
	RESTGetAPIGuildMemberResult,
	RESTGetAPIGuildResult,
	RESTGetAPICurrentUserResult,
	RESTPostOAuth2AccessTokenResult,
	RESTPostOAuth2AccessTokenURLEncodedData,
	RESTGetAPICurrentUserGuildsResult
} from 'discord-api-types/v10';
import { OAuth2Routes, RouteBases, Routes } from 'discord-api-types/v10';

const { clientId, clientSecret, token } = useRuntimeConfig();

export async function fetchAccessToken(code: string, redirectUri: string) {
	const data = {
		client_id: clientId,
		client_secret: clientSecret,
		code,
		grant_type: 'authorization_code',
		redirect_uri: redirectUri
	} satisfies RESTPostOAuth2AccessTokenURLEncodedData;

	const result = await fetch(OAuth2Routes.tokenURL, {
		method: 'POST',
		body: new URLSearchParams(data).toString(),
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	});

	const json = await result.json();
	if (result.ok) return json as RESTPostOAuth2AccessTokenResult;

	consola.error(json);
	return null;
}

export async function fetchUser(token: string) {
	return fetchData<RESTGetAPICurrentUserResult>(token, Routes.user());
}

// get current user guilds data

export async function fetchUserGuilds() {
	return fetchData<RESTGetAPICurrentUserGuildsResult>(token, Routes.userGuilds());
}

// get guild data
export async function fetchGuild(guildId: string) {
	return fetchData<RESTGetAPIGuildResult>(token, Routes.guild(guildId));
}

// get member data
export async function fetchMember(guildId: string, userId: string) {
	return fetchData<RESTGetAPIGuildMemberResult>(token, Routes.guildMember(guildId, userId));
}

// get role data
export async function fetchRole(guildId: string, roleId: string) {
	return fetchData<RESTGetAPIGuildResult>(token, Routes.guildRole(guildId, roleId));
}

async function fetchData<T extends object>(token: string, route: string) {
	const result = await fetch(`${RouteBases.api}${route}`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	});

	return result.ok ? ((await result.json()) as T) : null;
}
