export const Invites = {
	Artiel: 'https://discord.com/oauth2/authorize?client_id=948377028028145755&permissions=51200&scope=bot%20applications.commands',
	Iriss: 'https://discord.com/oauth2/authorize?client_id=948377113457745990&permissions=326417868864&scope=bot%20applications.commands',
	Nekokai: 'https://discord.com/oauth2/authorize?client_id=939613684592934992&permissions=16384&scope=bot%20applications.commands',
	Skyra: 'https://discord.com/oauth2/authorize?client_id=266624760782258186&permissions=534185897078&scope=bot%20applications.commands',
	Teryl: 'https://discord.com/oauth2/authorize?client_id=948377583626637343&scope=bot%20applications.commands'
};

export enum Colors {
	White = '#e7e7e8',
	Amber = '#ffc107',
	Amber300 = '#ffd54f',
	Blue = '#2196f3',
	BlueGrey = '#607d8b',
	Brown = '#795548',
	Cyan = '#00bcd4',
	DeepOrange = '#ff5722',
	DeepPurple = '#673ab7',
	Green = '#4caf50',
	Grey = '#9e9e9e',
	Indigo = '#3f51b5',
	LightBlue = '#03a9f4',
	LightGreen = '#8bc34a',
	Lime = '#cddc39',
	Lime300 = '#dce775',
	Orange = '#ff9800',
	Pink = '#e91e63',
	Purple = '#9c27b0',
	Red = '#f44336',
	Red300 = '#e57373',
	Teal = '#009688',
	Yellow = '#ffeb3b',
	Yellow300 = '#fff176'
}

export const ModerationActions = {
	Ban: { color: Colors.Red, name: 'Ban', temporary: Colors.Red300, undo: Colors.LightBlue },
	Kick: { color: Colors.Orange, name: 'Kick', temporary: null, undo: null },
	Mute: { color: Colors.Amber, name: 'Mute', temporary: Colors.Amber300, undo: Colors.LightBlue },
	Softban: { color: Colors.DeepOrange, name: 'Softban', temporary: null, undo: null },
	Timeout: { color: Colors.Amber, name: 'Timeout', temporary: Colors.Amber, undo: Colors.LightBlue },
	VoiceKick: { color: Colors.Orange, name: 'Voice Kick', temporary: null, undo: null },
	VoiceMute: { color: Colors.Amber, name: 'Voice Mute', temporary: Colors.Amber300, undo: Colors.LightBlue },
	Warning: { color: Colors.Yellow, name: 'Warning', temporary: Colors.Yellow300, undo: Colors.LightBlue }
};

export const ProviderAppNameKey = Symbol() as InjectionKey<Ref<'artiel' | 'iriss' | 'nekokai' | 'skyra' | 'teryl'>>;

export const Profiles = {
	skyra: { name: 'Skyra', app: true, verified: true },
	teryl: { name: 'Teryl', app: true, verified: true },
	baddie: { name: 'Baddie', app: false, verified: false },
	stella: { name: 'Stella', app: false, verified: false }
} as const satisfies Record<string, Profile>;

export interface Profile {
	name: string;
	app: boolean;
	verified: boolean;
}

export type ProfileName = keyof typeof Profiles;

export const OtherApps = {
	Skyra: {
		name: 'Skyra',
		explore: '/',
		avatar: '/img/avatars/skyra.png',
		invite: Invites.Skyra,
		purposes: ['Moderation', 'Logging'],
		description: "An app to help you manage your server's moderation and logging."
	},
	Iriss: {
		name: 'Iriss',
		explore: '/iriss',
		avatar: '/img/avatars/iriss.png',
		invite: Invites.Iriss,
		purposes: ['Suggestions', 'Feedback'],
		description: "An app to help you manage the suggestions and feedback from your server's members."
	},
	Teryl: {
		name: 'Teryl',
		explore: '/teryl',
		avatar: '/img/avatars/teryl.png',
		invite: Invites.Teryl,
		purposes: ['Utilities', 'Miscellaneous'],
		description: 'An app to supercharge your server with many utility commands.'
	},
	Nekokai: {
		name: 'Nekokai',
		explore: '/nekokai',
		avatar: '/img/avatars/nekokai.png',
		invite: Invites.Nekokai,
		purposes: ['Anime', 'Manga'],
		description: 'Do you like anime or manga? Nekokai is the perfect bot for you!'
	},
	Artiel: {
		name: 'Artiel',
		explore: '/artiel',
		avatar: '/img/avatars/artiel.png',
		invite: Invites.Artiel,
		purposes: ['Games', 'Fun'],
		description: "Sometimes servers feel boring and you're out of ideas to make it more fun, Artiel is here to help you with that!"
	}
} as const satisfies Record<string, OtherApp>;

export interface OtherApp {
	name: string;
	explore: `/${string}`;
	avatar: `/img/avatars/${string}`;
	invite: string;
	purposes: readonly string[];
	description: string;
}
