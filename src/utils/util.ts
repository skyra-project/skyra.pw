import type { TransformedLoginData } from '@config/types/ApiData';
import type { Selfmod } from '@config/types/ConfigurableData';
import type { GuildSettings } from '@config/types/GuildSettings';
import Router from 'next/router';
import type { ValuesType } from 'utility-types';
import { BASE_API_URL, FetchMethods, LocalStorageKeys } from './constants';
import isBrowser from './isBrowser';
import { Time } from './skyraUtils';

export const cast = <T>(value: unknown): T => value as T;
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadState = <T>(key: LocalStorageKeys): T | null => {
	if (isBrowser) {
		const serializedState = localStorage.getItem(key);
		return serializedState ? (JSON.parse(serializedState) as T) : null;
	}

	return null;
};

export const saveState = <T>(key: LocalStorageKeys, state: T): T => {
	try {
		if (isBrowser) {
			const serializedState = JSON.stringify(state);
			localStorage.setItem(key, serializedState);
		}
	} catch {
		// intentionally empty
	}

	return state;
};

export const clearState = (key: LocalStorageKeys) => {
	if (isBrowser) {
		localStorage.removeItem(key);
	}
};

export async function apiFetch<T>(path: string, options: RequestInit = {}) {
	if (process.env.NODE_ENV === 'development') {
		await sleep(1000);
	}

	const response = await fetch(`${BASE_API_URL}${path}`, {
		...options,
		credentials: 'include',
		headers: {
			...options.headers,
			'Content-Type': 'application/json'
		}
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}

export async function ssrFetch<T>(path: string) {
	const response = await fetch(`${process.env.SSR_API_URL}${path}`, {
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}

type SetPackCallback = (newPack: Partial<TransformedLoginData>) => void;
type SetAuthenticatedCallback = (newAuthenticated: boolean) => void;
type ChangeRouteCallback = (newRoute: string) => void;

export async function logOut() {
	await apiFetch('/oauth/logout', { method: FetchMethods.Post });
}

export function clearData(setPack: SetPackCallback, setAuthenticated: SetAuthenticatedCallback, changeRoute: ChangeRouteCallback) {
	clearState(LocalStorageKeys.DiscordPack);
	clearState(LocalStorageKeys.LastSync);
	setPack({ user: null });
	setAuthenticated(false);
	changeRoute('/');
}

export async function syncUser(
	authenticated: boolean,
	setPack: SetPackCallback,
	setAuthenticated: SetAuthenticatedCallback,
	changeRoute: ChangeRouteCallback
) {
	// If they're not logged in, don't try to sync.
	if (!authenticated) return;

	// Check if they've synced in the past 5 minutes.
	const lastSync = loadState<number>(LocalStorageKeys.LastSync)!;
	const difference = Date.now() - lastSync;
	if (difference < Time.Minute * 5) {
		return;
	}

	saveState(LocalStorageKeys.LastSync, Date.now());

	const response = await apiFetch<TransformedLoginData>('/oauth/user', {
		method: FetchMethods.Post,
		body: JSON.stringify({
			action: 'SYNC_USER'
		})
	}).catch((err) => {
		if (err.status === 401) clearData(setPack, setAuthenticated, changeRoute);
	});

	if (!response) return;

	if (response.user) {
		setPack(response);
	}
}

export function navigate(path: string, forceSameTab = false) {
	if (!forceSameTab && (path.startsWith('http') || path.startsWith('//') || path.startsWith('mailto:'))) {
		return () => window.open(path, '_blank', 'noreferrer=yes');
	}
	return () => Router.push(path);
}

export function displayIconURL(guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>, { format = 'default', size = 256 } = {}) {
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
		.replace(/\w+/g, (e) => e[0])
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

export const updateSliderValueObj = (prop: Selfmod.Union, value: number | number[], multiplier = 1) => ({
	[prop]: Array.isArray(value) ? value[0] * multiplier : value * multiplier
});

export const handleResetKey = (
	guildSettingsChanges: GuildSettings | undefined,
	setGuildSettingsChanges: (changes?: Partial<GuildSettings> | undefined) => void,
	key: keyof GuildSettings
) => {
	// If there are pre-existing "guildSettingsChanges" and the key exists in that object then remove it from the "guildSettingsChanges"
	if (guildSettingsChanges && key in guildSettingsChanges) {
		Reflect.deleteProperty(guildSettingsChanges, key);
	} else if (guildSettingsChanges) {
		Reflect.set(guildSettingsChanges, key, null);
	} else {
		guildSettingsChanges = ({ [key]: null } as unknown) as typeof guildSettingsChanges;
	}

	setGuildSettingsChanges(guildSettingsChanges);
};
