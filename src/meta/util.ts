import { BASE_API_URL, history, Time } from 'meta/constants';
import { getGlobal, setGlobal } from 'reactn';
import { FlattenedGuild, FlattenedUser } from './typings/ApiData';

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function logOut() {
	localStorage.clear();
	setGlobal({ user: null, token: null, authenticated: false });
	history.replace('/');
}

export const loadState = (key: string) => {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState) as unknown;
	} catch (err) {
		return undefined;
	}
};

export const saveState = (key: string, state: unknown) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (err) {
		// intentionally empty
	}
};

export async function apiFetch(path: string, options: RequestInit = {}) {
	if (process.env.NODE_ENV === 'development') {
		await sleep(1000);
	}

	const response = await fetch(`${BASE_API_URL}${path}`, {
		...options,
		headers: {
			...options.headers,
			'Content-Type': 'application/json'
		}
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse;
	}
}

export async function authedFetch(path: string, options: RequestInit = {}) {
	options.headers = { authorization: getGlobal().token };
	return apiFetch(path, options);
}

export async function syncUser() {
	// If they're not logged in, don't try to sync.
	if (!getGlobal().authenticated) return;

	// Check if they've synced in the past 5 minutes.
	const lastSync = loadState('last_sync') as number;
	const difference = Date.now() - lastSync;
	if (difference < Time.Minute * 5) {
		return;
	}

	saveState('last_sync', Date.now());

	const response = await authedFetch('/oauth/user', {
		method: 'POST',
		body: JSON.stringify({
			action: 'SYNC_USER'
		})
	}).catch(err => {
		// TODO toast
		if (err.status === 401) logOut();
	});

	if (!response) return;

	if (response.user) {
		saveState('discord_user', response.user);
		setGlobal({ user: response.user });
	}

	if (response.access_token) {
		saveState('discord_token', response.access_token);
		setGlobal({ token: response.access_token });
	}
}

export function navigate(path: string) {
	if (path.startsWith('http')) {
		return () => (window.location.href = path);
	}
	return () => history.push(path);
}

export function toTitleCase(str: string) {
	const splitStr = str.toLowerCase().replace(/-/g, ' ').split(' ');
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
}

export function displayAvatarURL(user: FlattenedUser, { format = 'default', size = 256 } = {}) {
	if (!user) return `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 4) + 1}.png`;
	if (user.avatar === null) return `https://cdn.discordapp.com/embed/avatars/${user.discriminator}.png`;
	if (format === 'default') format = user.avatar.startsWith('a_') ? 'gif' : 'webp';
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}${`?size=${size}`}`;
}

export function displayIconURL(guild: FlattenedGuild, { format = 'default', size = 256 } = {}) {
	if (guild.icon === null) return undefined;
	if (format === 'default') format = guild.icon.startsWith('a_') ? 'gif' : 'png';
	return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${format}${`?size=${size}`}`;
}

/**
 * Retrieves an acronym for a guild name based on Discord datamining
 * @see https://github.com/discordjs/discord.js/pull/4104
 * @param name The guild name to retrieve the acronym for
 */
export function getAcronym(name: string) {
	return name
		.replace(/'s /g, ' ')
		.replace(/\w+/g, e => e[0])
		.replace(/\s/g, '');
}

export function removeNonAlphaNumeric(str: string) {
	return str.replace(/[^0-9a-zA-Z]/gi, '');
}

/**
 * Check if a bit is set in a bitfield.
 * @param bits The bitfield value to check.
 * @param bit The bit to check.
 */
export function bitwiseHas(bits: number, bit: number) {
	return (bits & bit) === bit;
}

/**
 * Toggle a bit in a bitfield.
 * @param bits The bitfield value to modify.
 * @param bit The bit to toggle.
 * @param toggle The value to set.
 */
export function bitwiseSet(bits: number, bit: number, toggle: boolean) {
	return toggle ? bits | bit : bits & ~bit;
}

/**
 * No operation function
 */
export function noOp() {
	return undefined;
}

/**
 * Split a string by its latest space character in a range from the character 0 to the selected one.
 * @param str The text to split.
 * @param length The length of the desired string.
 * @param char The character to split with
 */
export function splitText(str: string, length: number, char = ' ') {
	const x = str.substring(0, length).lastIndexOf(char);
	const pos = x === -1 ? length : x;
	return str.substring(0, pos);
}

/**
 * Split a text by its latest space character in a range from the character 0 to the selected one.
 * @param str The text to split.
 * @param length The length of the desired string.
 */
export function cutText(str: string, length: number) {
	if (str.length < length) return str;
	const cut = splitText(str, length - 3);
	if (cut.length < length - 3) return `${cut}...`;
	return `${cut.slice(0, length - 3)}...`;
}
