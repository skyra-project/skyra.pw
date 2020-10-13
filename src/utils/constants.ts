import { FlattenedCommand } from '@config/types/ApiData';

export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
export const BASE_WEB_URL = process.env.NEXT_PUBLIC_BASE_WEB_URL;
// TODO: Remove nullish coalescing when figured out why env vars not being loaded
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL ?? 'https://api.skyra.pw';
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
	['scope', 'bot'],
	['response_type', 'code'],
	['redirect_uri', encodeURIComponent(BASE_WEB_URL)]
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

export const FakeCommands: FlattenedCommand[] = [
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 15,
		description: 'Search something through Wikipedia.',
		guarded: false,
		guildOnly: false,
		name: 'wikipedia',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS'],
		usage: '<query:string>'
	},
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 10,
		description: 'Searches The Movie Database for any show',
		guarded: false,
		guildOnly: true,
		name: 'shows',
		permissionLevel: 0,
		requiredPermissions: ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
		usage: '<show:str> [year:str]'
	},
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 10,
		description: 'Searches TheMovieDatabase for any movie',
		guarded: false,
		guildOnly: true,
		name: 'movies',
		permissionLevel: 0,
		requiredPermissions: ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
		usage: '<movie:str> [year:str]'
	},
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 10,
		description: 'Searches iTunes API for music tracks',
		guarded: false,
		guildOnly: true,
		name: 'itunes',
		permissionLevel: 0,
		requiredPermissions: ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
		usage: '<song:str>'
	},
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 15,
		description: 'Search something through YouTube.',
		guarded: false,
		guildOnly: false,
		name: 'youtube',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<query:string>'
	},
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 0,
		description: 'Shows information about a country.',
		guarded: false,
		guildOnly: false,
		name: 'country',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<country:str>'
	},
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 10,
		description: 'Get your latest horoscope',
		guarded: false,
		guildOnly: false,
		name: 'horoscope',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<sunsign:sunsign> [tomorrow|yesterday|today:default]'
	},
	{
		bucket: 1,
		category: 'Tools',
		cooldown: 5,
		description: 'Simplifies reaction-based polls.',
		guarded: false,
		guildOnly: false,
		name: 'poll',
		permissionLevel: 0,
		requiredPermissions: ['ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
		usage: '<options:string> [...]'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Adds a song the the queue.',
		guarded: false,
		guildOnly: true,
		name: 'add',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<song:song>'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Toggle repeating the current song.',
		guarded: false,
		guildOnly: true,
		name: 'repeat',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Let me be your DJ and play you some tunes!',
		guarded: false,
		guildOnly: true,
		name: 'play',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '(song:song)'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Skip the current song.',
		guarded: false,
		guildOnly: true,
		name: 'skip',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '[force]'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: "Joins the message author's voice channel.",
		guarded: false,
		guildOnly: true,
		name: 'join',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 10,
		description: 'Exports your queue to a `.squeue` file.',
		guarded: false,
		guildOnly: true,
		name: 'exportqueue',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Change the player time for the current song.',
		guarded: false,
		guildOnly: true,
		name: 'seek',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<position:timespan>'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Promote a song to the front of the queue',
		guarded: false,
		guildOnly: true,
		name: 'promote',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<number:integer>'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Clears the queue list.',
		guarded: false,
		guildOnly: true,
		name: 'queue-clear',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Resumes the current song.',
		guarded: false,
		guildOnly: true,
		name: 'resume',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Get information from the current song.',
		guarded: false,
		guildOnly: true,
		name: 'playing',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS'],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Pauses the current song.',
		guarded: false,
		guildOnly: true,
		name: 'pause',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Check the queue list.',
		guarded: false,
		guildOnly: true,
		name: 'queue',
		permissionLevel: 0,
		requiredPermissions: ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Manage the volume for current song.',
		guarded: false,
		guildOnly: true,
		name: 'volume',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '[volume:number]'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Randomize the order of the songs in the queue.',
		guarded: false,
		guildOnly: true,
		name: 'shuffle',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Remove a song from the queue list.',
		guarded: false,
		guildOnly: true,
		name: 'remove',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<number:integer>'
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 0,
		description: 'Leaves the voice channel.',
		guarded: false,
		guildOnly: true,
		name: 'leave',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Music',
		cooldown: 30,
		description: 'Imports a queue saved as a `.squeue` file.',
		guarded: false,
		guildOnly: true,
		name: 'importqueue',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '<queue:squeue>'
	},
	{
		bucket: 1,
		category: 'General',
		cooldown: 5,
		description: 'Provides some information about this bot.',
		guarded: true,
		guildOnly: false,
		name: 'info',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'General',
		cooldown: 0,
		description: 'Display help for a command.',
		guarded: true,
		guildOnly: false,
		name: 'help',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: '(Command:command|page:integer|category:category)'
	},
	{
		bucket: 1,
		category: 'General',
		cooldown: 5,
		description: 'Runs a connection test to Discord.',
		guarded: true,
		guildOnly: false,
		name: 'ping',
		permissionLevel: 0,
		requiredPermissions: [],
		usage: ''
	},
	{
		bucket: 1,
		category: 'General',
		cooldown: 10,
		description: 'Shows the invite link to add Skyra to your server.',
		guarded: true,
		guildOnly: false,
		name: 'invite',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS'],
		usage: '[noperms]'
	},
	{
		bucket: 1,
		category: 'Animal',
		cooldown: 10,
		description: 'Cute doggos! ❤',
		guarded: false,
		guildOnly: false,
		name: 'dog',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS'],
		usage: ''
	},
	{
		bucket: 2,
		category: 'Animal',
		cooldown: 10,
		description: 'Let me show you an image of a fox!',
		guarded: false,
		guildOnly: false,
		name: 'fox',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS'],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Animal',
		cooldown: 10,
		description: 'KITTENS!',
		guarded: false,
		guildOnly: false,
		name: 'kitty',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Animal',
		cooldown: 10,
		description: 'Let me tell you a mysterious cat fact.',
		guarded: false,
		guildOnly: false,
		name: 'catfact',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS'],
		usage: ''
	},
	{
		bucket: 1,
		category: 'Animal',
		cooldown: 10,
		description: 'Cute shibes!',
		guarded: false,
		guildOnly: false,
		name: 'shibe',
		permissionLevel: 0,
		requiredPermissions: ['EMBED_LINKS'],
		usage: ''
	}
];
