export const Invites = {
	WolfStar: 'https://discord.com/oauth2/authorize?client_id=&permissions=534185897078&scope=bot%20applications.commands',
	Staryl: ''
};

export const robotBlockingPageProps = 'nosnippet,notranslate,noimageindex,noarchive,max-snippet:-1,max-image-preview:none,max-video-preview:-1';

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
export interface ModerationAction {
	color: Colors;
	name: string;
	temporary: Colors | null;
	undo: Colors | null;
}

export const ModerationActions: Record<string, ModerationAction> = {
	Ban: {
		color: Colors.Red,
		name: 'Ban',
		temporary: Colors.Red300,
		undo: Colors.LightBlue
	},
	Kick: { color: Colors.Orange, name: 'Kick', temporary: null, undo: null },
	Mute: {
		color: Colors.Amber,
		name: 'Mute',
		temporary: Colors.Amber300,
		undo: Colors.LightBlue
	},
	Softban: {
		color: Colors.DeepOrange,
		name: 'Softban',
		temporary: null,
		undo: null
	},
	Timeout: {
		color: Colors.Amber,
		name: 'Timeout',
		temporary: Colors.Amber,
		undo: Colors.LightBlue
	},
	VoiceKick: {
		color: Colors.Orange,
		name: 'Voice Kick',
		temporary: null,
		undo: null
	},
	VoiceMute: {
		color: Colors.Amber,
		name: 'Voice Mute',
		temporary: Colors.Amber300,
		undo: Colors.LightBlue
	},
	Warning: {
		color: Colors.Yellow,
		name: 'Warning',
		temporary: Colors.Yellow300,
		undo: Colors.LightBlue
	}
};

export const ProviderAppNameKey = Symbol() as InjectionKey<Ref<'wolfstar' | 'staryl'>>;

export const Profiles = {
	wolfstar: { name: 'WolfStar', app: true, verified: true },
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
	WolfStar: {
		name: 'WolfStar',
		explore: '/',
		avatar: '/img/avatars/wolfstar.png',
		invite: Invites.WolfStar,
		purposes: ['Moderation', 'Logging'],
		description: "An app to help you manage your server's moderation and logging."
	},
	Staryl: {
		name: 'Staryl',
		explore: '/',
		avatar: '/img/avatars/staryl.png',
		invite: Invites.WolfStar,
		purposes: ['Social', 'Notification'],
		description: "An app to help you manage your server's social notifications (Twitch, Instragram and etc.)."
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

export interface ExpirableLocalStorageStructure<T> {
	expire: number;
	data: T;
}

export enum StorageKeys {
	Commands = 'commandsStore',
	Language = 'languageStore'
}

export const EmojiRegexExtractName = /<?a?:(\w{2,32}):\d{17,21}>?/gim;
export const SettingsDrawerWidth = 240;
