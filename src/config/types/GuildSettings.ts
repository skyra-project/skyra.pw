export interface GuildSettings {
	'command-autodelete': [string, number][];
	'custom-commands': CustomCommand[];
	'no-mention-spam': NoMentionSpam;
	channels: Channels;
	commandUses: number;
	disabledChannels: string[];
	disabledCommands: string[];
	disabledCommandsChannels: DisabledCommandChannel[];
	disableNaturalPrefix: boolean;
	events: Events;
	language: string;
	messages: Messages;
	music: Music;
	prefix: string;
	roles: Roles;
	selfmod: Selfmod;
	social: Social;
	starboard: Starboard;
	stickyRoles: StickyRole[];
	suggestions: Suggestions;
	trigger: Trigger;
}

export interface Channels {
	ignore: IgnoreChannels;
	announcements: string;
	greeting: string;
	farewell: string;
	'member-logs': string;
	'message-logs': string;
	'moderation-logs': string;
	'nsfw-message-logs': string;
	'image-logs': string;
	'prune-logs': string;
	'reaction-logs': string;
	roles: string;
	spam: string;
}

export interface IgnoreChannels {
	all: string[];
	'message-delete': string[];
	'message-edit': string[];
	'reaction-add': string[];
}

export interface Events {
	banAdd: boolean;
	banRemove: boolean;
	memberAdd: boolean;
	memberRemove: boolean;
	memberNameUpdate: boolean;
	memberRoleUpdate: boolean;
	messageDelete: boolean;
	messageEdit: boolean;
	'twemoji-reactions': boolean;
}

interface DisabledCommandChannel {
	channel: string;
	commands: readonly string[];
}

export interface CustomCommand {
	id: string;
	content: string;
	color: number;
	embed: boolean;
	args: any[];
}

interface StickyRole {
	user: string;
	roles: string[];
}

export interface Suggestions {
	emojis: SuggestionEmojis;
	channel: string;
	'on-action': SuggestionActions;
}

export interface SuggestionEmojis {
	downvote: string;
	upvote: string;
}

export interface SuggestionActions {
	dm: boolean;
	repost: boolean;
	'hide-author': boolean;
}

export interface Messages {
	farewell: string;
	greeting: string;
	'join-dm': string;
	ignoreChannels: string[];
	'announcement-embed': boolean;
	'moderation-dm': boolean;
	'moderation-reason-display': boolean;
	'moderation-message-display': boolean;
	'moderation-auto-delete': boolean;
	'moderator-name-display': boolean;
}

export interface Roles {
	admin: string;
	auto: Readonly<{
		id: string;
		points: number;
	}>;
	initial: string;
	messageReaction: string;
	moderator: string;
	muted: string;
	'restricted-reaction': string;
	'restricted-embed': string;
	'restricted-attachment': string;
	'restricted-emoji': string;
	'restricted-voice': string;
	public: string[];
	reactions: Readonly<{
		emoji: string;
		role: string;
	}>;
	removeInitial: boolean;
	dj: string;
	subscriber: string;
	uniqueRoleSets: Readonly<{
		name: string;
		roles: readonly string[];
	}>;
}

interface Selfmod {
	attachment: boolean;
	attachmentMaximum: number;
	attachmentDuration: number;
	attachmentAction: number;
	attachmentPunishmentDuration: number;
	capitals: {
		enabled: boolean;
		ignoredRoles: string[];
		ignoredChannels: string[];
		minimum: number;
		maximum: number;
		softAction: number;
		hardAction: number;
		hardActionDuration: number;
		thresholdMaximum: number;
		thresholdDuration: number;
	};
	links: {
		whitelist: string[];
		enabled: boolean;
		ignoredRoles: string[];
		ignoredChannels: string[];
		softAction: number;
		hardAction: number;
		hardActionDuration: number;
		thresholdMaximum: number;
		thresholdDuration: number;
	};
	messages: {
		enabled: boolean;
		ignoredRoles: string[];
		ignoredChannels: string[];
		maximum: number;
		'queue-size': number;
		softAction: number;
		hardAction: number;
		hardActionDuration: number;
		thresholdMaximum: number;
		thresholdDuration: number;
	};
	newlines: {
		enabled: boolean;
		ignoredRoles: string[];
		ignoredChannels: string[];
		maximum: number;
		softAction: number;
		hardAction: number;
		hardActionDuration: number;
		thresholdMaximum: number;
		thresholdDuration: number;
	};
	invites: {
		enabled: boolean;
		ignoredRoles: string[];
		ignoredChannels: string[];
		softAction: number;
		hardAction: number;
		hardActionDuration: number;
		thresholdMaximum: number;
		thresholdDuration: number;
	};
	filter: {
		enabled: boolean;
		ignoredRoles: string[];
		ignoredChannels: string[];
		softAction: number;
		hardAction: number;
		hardActionDuration: number;
		thresholdMaximum: number;
		thresholdDuration: number;
		raw: string[];
	};
	reactions: {
		enabled: boolean;
		ignoredRoles: string[];
		ignoredChannels: string[];
		maximum: number;
		whitelist: string[];
		blacklist: string[];
		softAction: number;
		hardAction: number;
		hardActionDuration: number;
		thresholdMaximum: number;
		thresholdDuration: number;
	};
	raid: boolean;
	'selfmod.raid': boolean;
	raidthreshold: number;
	ignoreChannels: string[];
}

export type SelfmodSliderSettings = Omit<
	Selfmod,
	| 'attachment'
	| 'attachmentMaximum'
	| 'attachmentDuration'
	| 'attachmentAction'
	| 'attachmentPunishmentDuration'
	| 'raid'
	| 'selfmod.raid'
	| 'raidthreshold'
	| 'ignoreChannels'
>;

export type SelfmodSliderProp = 'thresholdMaximum' | 'thresholdDuration' | 'minimum' | 'maximum';

interface NoMentionSpam {
	enabled: boolean;
	alerts: boolean;
	mentionsAllowed: number;
	timePeriod: number;
}

interface Social {
	enabled: boolean;
	achieve: boolean;
	achieveMessage: string;
	multiplier: number;
	ignoreChannels: string[];
}

interface Starboard {
	minimum: number;
	channel: string;
	emoji: string;
	ignoreChannels: string[];
}

interface Music {
	'default-volume': number;
	'maximum-duration': number;
	'maximum-entries-per-user': number;
	'allow-streams': boolean;
}

interface Trigger {
	alias: {
		input: string;
		output: string;
	};
	includes: {
		action: 'react';
		input: string;
		output: string;
	};
}
