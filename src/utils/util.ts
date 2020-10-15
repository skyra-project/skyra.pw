import { DashboardPack, FlattenedGuild } from '@config/types/ApiData';
import { SelfmodSliderProp, SelfmodSliderSettings } from '@config/types/GuildSettings';
import Router from 'next/router';
import { BASE_API_URL, LocalStorageKeys } from './constants';
import isBrowser from './isBrowser';

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

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

// export async function syncUser() {
// 	// If they're not logged in, don't try to sync.
// 	if (!getGlobal().authenticated) return;

// 	// Check if they've synced in the past 5 minutes.
// 	const lastSync = loadState(LocalStorageKeys.LastSync) as number;
// 	const difference = Date.now() - lastSync;
// 	if (difference < Time.Minute * 5) {
// 		return;
// 	}

// 	saveState(LocalStorageKeys.LastSync, Date.now());

// 	const response = await apiFetch<{ user: OauthFlattenedUser }>('/oauth/user', {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			action: 'SYNC_USER'
// 		})
// 	}).catch(err => {
// 		if (err.status === 401 || err.status === 403) logOut();
// 	});

// 	if (!response) return;

// 	if (response.user) {
// 		setGlobal({ pack: response });
// 	}
// }

export function navigate(path: string) {
	if (path.startsWith('http') || path.startsWith('//') || path.startsWith('mailto:')) {
		return () => window.open(path, '_blank', 'noreferrer=yes');
	}
	return () => Router.push(path);
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

export const updateSliderValueObj = (
	category: keyof SelfmodSliderSettings,
	prop: SelfmodSliderProp,
	value: number | number[],
	multiplier = 1
) => ({
	selfmod: {
		[category]: {
			[prop]: Array.isArray(value) ? value[0] * multiplier : value * multiplier
		}
	}
});

export const FakeDiscordUserPack: DashboardPack = {
	user: {
		id: '268792781713965056',
		bot: false,
		username: 'Favna',
		discriminator: '0001',
		avatar: 'a_d1be352ef991a82354679c1c2d72ae4d',
		avatarURL: '',
		guilds: [
			{
				id: '541738403230777351',
				available: true,
				channels: [
					{
						id: '734440805732712520',
						type: 'category',
						guildID: '541738403230777351',
						name: 'Webhooks',
						rawPosition: 5,
						parentID: null,
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1050624, allow: 0 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						createdTimestamp: 1595174733337
					},
					{
						id: '732685202291294329',
						type: 'text',
						guildID: '541738403230777351',
						name: 'database-error-logs',
						rawPosition: 11,
						parentID: '541741125442994187',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1594756164859
					},
					{
						id: '659730509374423053',
						type: 'voice',
						guildID: '541738403230777351',
						name: 'Music v2',
						rawPosition: 3,
						parentID: '541738404208181248',
						permissionOverwrites: [['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]],
						bitrate: 64000,
						userLimit: 0,
						createdTimestamp: 1577362410635
					},
					{
						id: '660065697132707840',
						type: 'text',
						guildID: '541738403230777351',
						name: 'music-test',
						rawPosition: 7,
						parentID: '541740547178496000',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 0, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 8192 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1577442325624
					},
					{
						id: '541738404208181248',
						type: 'category',
						guildID: '541738403230777351',
						name: 'Voice Channels',
						rawPosition: 4,
						parentID: null,
						permissionOverwrites: [['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]],
						createdTimestamp: 1549230900576
					},
					{
						id: '752188115115966534',
						type: 'text',
						guildID: '541738403230777351',
						name: 'test-vault',
						rawPosition: 6,
						parentID: '541740547178496000',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1024, allow: 0 }],
							['541739191776575502', { id: '541739191776575502', type: 'role', deny: 0, allow: 1024 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 1024 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1599406021623
					},
					{
						id: '610089865966649344',
						type: 'text',
						guildID: '541738403230777351',
						name: 'skyra-dev',
						rawPosition: 17,
						parentID: '610089683602636801',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1049600, allow: 0 }],
							['541739191776575502', { id: '541739191776575502', type: 'role', deny: 0, allow: 1049600 }],
							['635547552229490708', { id: '635547552229490708', type: 'role', deny: 0, allow: 1024 }]
						],
						topic:
							'Skyra [Codename: NM-EEA-Y] - Type: Flamewing-Class Intelligence Starship | \nLyrch [Codename: LC-EEA-Z] - Type: Naria-Class Starship',
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1565527158968
					},
					{
						id: '541740903400734720',
						type: 'category',
						guildID: '541738403230777351',
						name: 'Logs',
						rawPosition: 7,
						parentID: null,
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						createdTimestamp: 1549231496430
					},
					{
						id: '641405250313650217',
						type: 'text',
						guildID: '541738403230777351',
						name: 'skattergy-dev',
						rawPosition: 18,
						parentID: '610089683602636801',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1049600, allow: 0 }],
							['541739191776575502', { id: '541739191776575502', type: 'role', deny: 0, allow: 1049600 }],
							['635547552229490708', { id: '635547552229490708', type: 'role', deny: 0, allow: 1024 }]
						],
						topic: 'All development for https://github.com/kyranet/skattergy goes here.',
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1572993328408
					},
					{
						id: '644683493195907072',
						type: 'text',
						guildID: '541738403230777351',
						name: 'reaction-logs',
						rawPosition: 25,
						parentID: '541740903400734720',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1573774922418
					},
					{
						id: '541740581832097792',
						type: 'text',
						guildID: '541738403230777351',
						name: 'dev',
						rawPosition: 3,
						parentID: '541740547178496000',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 0, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 8192 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic: 'For all your developer talk',
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1549231419762
					},
					{
						id: '747896131467345930',
						type: 'text',
						guildID: '541738403230777351',
						name: 'dev-2',
						rawPosition: 4,
						parentID: '541740547178496000',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 0, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 8192 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic:
							'In case <#541740581832097792> is busy with a certain topic and other dev stuff needs to be discussed as well.',
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1598382732980
					},
					{
						id: '648663012345118741',
						type: 'text',
						guildID: '541738403230777351',
						name: 'development-error-logs',
						rawPosition: 12,
						parentID: '541741125442994187',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1574723713719
					},
					{
						id: '734440550152798289',
						type: 'category',
						guildID: '541738403230777351',
						name: 'Non-dev',
						rawPosition: 0,
						parentID: null,
						permissionOverwrites: [
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 8192 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						createdTimestamp: 1595174672402
					},
					{
						id: '642137151626018818',
						type: 'text',
						guildID: '541738403230777351',
						name: 'test',
						rawPosition: 5,
						parentID: '541740547178496000',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 0, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 57344 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1573167827279
					},
					{
						id: '541741125442994187',
						type: 'category',
						guildID: '541738403230777351',
						name: 'Special',
						rawPosition: 3,
						parentID: null,
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						createdTimestamp: 1549231549369
					},
					{
						id: '610089762149105697',
						type: 'text',
						guildID: '541738403230777351',
						name: 'developers',
						rawPosition: 16,
						parentID: '610089683602636801',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1049600, allow: 0 }],
							['541739191776575502', { id: '541739191776575502', type: 'role', deny: 0, allow: 1049600 }],
							['635547552229490708', { id: '635547552229490708', type: 'role', deny: 0, allow: 1024 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1565527134216
					},
					{
						id: '648662983324729375',
						type: 'text',
						guildID: '541738403230777351',
						name: 'production-error-logs',
						rawPosition: 10,
						parentID: '541741125442994187',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1574723706800
					},
					{
						id: '612364266418470922',
						type: 'text',
						guildID: '541738403230777351',
						name: 'external',
						rawPosition: 14,
						parentID: '734440805732712520',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1050624, allow: 0 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1566069418292
					},
					{
						id: '644449248963854336',
						type: 'text',
						guildID: '541738403230777351',
						name: 'prune-logs',
						rawPosition: 24,
						parentID: '541740903400734720',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1573719074241
					},
					{
						id: '541740935877361665',
						type: 'text',
						guildID: '541738403230777351',
						name: 'member-logs',
						rawPosition: 19,
						parentID: '541740903400734720',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1549231504173
					},
					{
						id: '541741291709399040',
						type: 'text',
						guildID: '541738403230777351',
						name: 'starboard',
						rawPosition: 8,
						parentID: '541741125442994187',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1549231589010
					},
					{
						id: '541740395059609631',
						type: 'voice',
						guildID: '541738403230777351',
						name: 'General',
						rawPosition: 0,
						parentID: '541738404208181248',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 0, allow: 0 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1048576, allow: 0 }]
						],
						bitrate: 64000,
						userLimit: 0,
						createdTimestamp: 1549231375232
					},
					{
						id: '541740547178496000',
						type: 'category',
						guildID: '541738403230777351',
						name: 'Dev',
						rawPosition: 1,
						parentID: null,
						permissionOverwrites: [
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 8192 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						createdTimestamp: 1549231411500
					},
					{
						id: '541741951343394872',
						type: 'text',
						guildID: '541738403230777351',
						name: 'nsfw-message-logs',
						rawPosition: 22,
						parentID: '541740903400734720',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: true,
						rateLimitPerUser: 0,
						createdTimestamp: 1549231746279
					},
					{
						id: '735609898192207893',
						type: 'text',
						guildID: '541738403230777351',
						name: 'sapphire-zone',
						rawPosition: 2,
						parentID: '734440550152798289',
						permissionOverwrites: [
							['126321762483830785', { id: '126321762483830785', type: 'member', deny: 0, allow: 66560 }],
							['136549806079344640', { id: '136549806079344640', type: 'member', deny: 0, allow: 66560 }],
							['139836912335716352', { id: '139836912335716352', type: 'member', deny: 0, allow: 199680 }],
							['203709726322720768', { id: '203709726322720768', type: 'member', deny: 0, allow: 66560 }],
							['266624760782258186', { id: '266624760782258186', type: 'member', deny: 0, allow: 1024 }],
							['293865523198951424', { id: '293865523198951424', type: 'member', deny: 0, allow: 66560 }],
							['395990735934980097', { id: '395990735934980097', type: 'member', deny: 0, allow: 66560 }],
							['418882011923742729', { id: '418882011923742729', type: 'member', deny: 0, allow: 1024 }],
							['419164839835992075', { id: '419164839835992075', type: 'member', deny: 0, allow: 1024 }],
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 134144, allow: 0 }],
							['541739191776575502', { id: '541739191776575502', type: 'role', deny: 2048, allow: 1024 }],
							['617067319121805419', { id: '617067319121805419', type: 'member', deny: 0, allow: 66560 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic:
							'Remember, remember, the server of Diri,\nThe Ao Demotion Treason and plot.\nI know of no reason why theDemotion Treason\nShould ever be forgot\n\nRepository: https://github.com/vladfrangu/demise',
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1595453466700
					},
					{
						id: '541740990554308608',
						type: 'text',
						guildID: '541738403230777351',
						name: 'moderation-logs',
						rawPosition: 20,
						parentID: '541740903400734720',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1549231517209
					},
					{
						id: '541742019601760278',
						type: 'text',
						guildID: '541738403230777351',
						name: 'nsfw',
						rawPosition: 1,
						parentID: '734440550152798289',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 0, allow: 0 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic: 'For all you naughty boys ( ͡° ͜ʖ ͡°)',
						nsfw: true,
						rateLimitPerUser: 0,
						createdTimestamp: 1549231762553
					},
					{
						id: '541738404208181249',
						type: 'voice',
						guildID: '541738403230777351',
						name: 'Music',
						rawPosition: 2,
						parentID: '541738404208181248',
						permissionOverwrites: [['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]],
						bitrate: 64000,
						userLimit: 0,
						createdTimestamp: 1549230900576
					},
					{
						id: '541740961496301598',
						type: 'text',
						guildID: '541738403230777351',
						name: 'message-logs',
						rawPosition: 21,
						parentID: '541740903400734720',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1549231510281
					},
					{
						id: '690654273939439718',
						type: 'text',
						guildID: '541738403230777351',
						name: 'steam-freebies',
						rawPosition: 15,
						parentID: '734440805732712520',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1050624, allow: 0 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1584735210643
					},
					{
						id: '627341808782802974',
						type: 'text',
						guildID: '541738403230777351',
						name: 'image-logs',
						rawPosition: 23,
						parentID: '541740903400734720',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: true,
						rateLimitPerUser: 0,
						createdTimestamp: 1569640342661
					},
					{
						id: '735581910427893990',
						type: 'voice',
						guildID: '541738403230777351',
						name: 'General v2',
						rawPosition: 1,
						parentID: '541738404208181248',
						permissionOverwrites: [['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]],
						bitrate: 64000,
						userLimit: 0,
						createdTimestamp: 1595446793897
					},
					{
						id: '610092600568840208',
						type: 'text',
						guildID: '541738403230777351',
						name: 'github',
						rawPosition: 13,
						parentID: '734440805732712520',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1565527810948
					},
					{
						id: '610089683602636801',
						type: 'category',
						guildID: '541738403230777351',
						name: 'Staff Channels',
						rawPosition: 6,
						parentID: null,
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 1049600, allow: 0 }],
							['541739191776575502', { id: '541739191776575502', type: 'role', deny: 0, allow: 1049600 }],
							['635547552229490708', { id: '635547552229490708', type: 'role', deny: 0, allow: 1024 }]
						],
						createdTimestamp: 1565527115489
					},
					{
						id: '648213337628475392',
						type: 'text',
						guildID: '541738403230777351',
						name: 'twitch-notifications',
						rawPosition: 9,
						parentID: '541741125442994187',
						permissionOverwrites: [
							['541738403230777351', { id: '541738403230777351', type: 'role', deny: 10240, allow: 0 }],
							['541739315865321474', { id: '541739315865321474', type: 'role', deny: 0, allow: 10240 }],
							['760372002883371038', { id: '760372002883371038', type: 'role', deny: 1050688, allow: 0 }]
						],
						topic: null,
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1574616502912
					},
					{
						id: '541738403712991232',
						type: 'text',
						guildID: '541738403230777351',
						name: 'general',
						rawPosition: 0,
						parentID: '734440550152798289',
						permissionOverwrites: [['760372002883371038', { id: '760372002883371038', type: 'role', deny: 2112, allow: 0 }]],
						topic: 'For all banter / off-topic talk /generally anything',
						nsfw: false,
						rateLimitPerUser: 0,
						createdTimestamp: 1549230900458
					}
				],
				roles: [
					{
						id: '541738403230777351',
						guildID: '541738403230777351',
						name: '@everyone',
						color: 0,
						hoist: false,
						rawPosition: 0,
						permissions: 104189505,
						managed: false,
						mentionable: false
					},
					{
						id: '541739191776575502',
						guildID: '541738403230777351',
						name: 'Developers',
						color: 16751873,
						hoist: true,
						rawPosition: 21,
						permissions: 520,
						managed: false,
						mentionable: true
					},
					{
						id: '541739315865321474',
						guildID: '541738403230777351',
						name: 'Bots',
						color: 0,
						hoist: true,
						rawPosition: 18,
						permissions: 256,
						managed: false,
						mentionable: false
					},
					{
						id: '541739390532059138',
						guildID: '541738403230777351',
						name: 'Skyra',
						color: 2001125,
						hoist: false,
						rawPosition: 17,
						permissions: 506978001,
						managed: false,
						mentionable: false
					},
					{
						id: '541739415484104704',
						guildID: '541738403230777351',
						name: 'Aelia',
						color: 16737237,
						hoist: false,
						rawPosition: 15,
						permissions: 104324673,
						managed: false,
						mentionable: false
					},
					{
						id: '541739431216807967',
						guildID: '541738403230777351',
						name: 'Alestra',
						color: 16559170,
						hoist: false,
						rawPosition: 14,
						permissions: 104324673,
						managed: false,
						mentionable: false
					},
					{
						id: '541739448895799497',
						guildID: '541738403230777351',
						name: 'Evlyn',
						color: 10601960,
						hoist: false,
						rawPosition: 13,
						permissions: 104324673,
						managed: false,
						mentionable: false
					},
					{
						id: '541743369081192451',
						guildID: '541738403230777351',
						name: 'Subscriber',
						color: 9936031,
						hoist: false,
						rawPosition: 10,
						permissions: 0,
						managed: false,
						mentionable: false
					},
					{
						id: '586851441839439903',
						guildID: '541738403230777351',
						name: 'Test-1',
						color: 0,
						hoist: false,
						rawPosition: 7,
						permissions: 0,
						managed: false,
						mentionable: false
					},
					{
						id: '586851448571297804',
						guildID: '541738403230777351',
						name: 'Test-2',
						color: 0,
						hoist: false,
						rawPosition: 8,
						permissions: 0,
						managed: false,
						mentionable: false
					},
					{
						id: '586851450982891522',
						guildID: '541738403230777351',
						name: 'Test-3',
						color: 0,
						hoist: false,
						rawPosition: 9,
						permissions: 0,
						managed: false,
						mentionable: false
					},
					{
						id: '606229410130952232',
						guildID: '541738403230777351',
						name: 'Lyrch',
						color: 6058429,
						hoist: false,
						rawPosition: 16,
						permissions: 356904022,
						managed: true,
						mentionable: false
					},
					{
						id: '635547552229490708',
						guildID: '541738403230777351',
						name: 'Contributor',
						color: 3447003,
						hoist: true,
						rawPosition: 12,
						permissions: 0,
						managed: false,
						mentionable: true
					},
					{
						id: '637592502756704256',
						guildID: '541738403230777351',
						name: 'Moderation Enabled',
						color: 0,
						hoist: false,
						rawPosition: 20,
						permissions: 2146959351,
						managed: false,
						mentionable: false
					},
					{
						id: '677166933401141258',
						guildID: '541738403230777351',
						name: 'Former Contributor',
						color: 0,
						hoist: false,
						rawPosition: 11,
						permissions: 0,
						managed: false,
						mentionable: false
					},
					{
						id: '699971929037078567',
						guildID: '541738403230777351',
						name: 'Server Booster',
						color: 16023551,
						hoist: false,
						rawPosition: 5,
						permissions: 0,
						managed: true,
						mentionable: false
					},
					{
						id: '702567689905897554',
						guildID: '541738403230777351',
						name: 'Advisor',
						color: 3270591,
						hoist: false,
						rawPosition: 4,
						permissions: 0,
						managed: false,
						mentionable: false
					},
					{
						id: '734432584343355434',
						guildID: '541738403230777351',
						name: 'Penguin',
						color: 2123412,
						hoist: false,
						rawPosition: 3,
						permissions: 0,
						managed: false,
						mentionable: false
					},
					{
						id: '760372002883371038',
						guildID: '541738403230777351',
						name: 'Muted',
						color: 0,
						hoist: false,
						rawPosition: 1,
						permissions: 0,
						managed: false,
						mentionable: false
					}
				],
				name: 'Skyra Development Suite',
				icon: '2c4f0fad3142021f2783067d4ec0fa18',
				splash: null,
				region: 'eu-west',
				features: [],
				applicationID: null,
				afkTimeout: 300,
				afkChannelID: null,
				systemChannelID: '541738403712991232',
				premiumTier: 0,
				premiumSubscriptionCount: 0,
				verificationLevel: 'NONE',
				explicitContentFilter: 'DISABLED',
				mfaLevel: 0,
				joinedTimestamp: 1549231030354,
				defaultMessageNotifications: 'MENTIONS',
				vanityURLCode: null,
				description: null,
				banner: null,
				ownerID: '242043489611808769',
				permissions: 2147483647,
				embedEnabled: true,
				manageable: true,
				skyraIsIn: true,
				emojis: []
			}
		]
	}
};
