export interface GuildSettings {
	'command-autodelete': readonly [string, number][];
	'no-mention-spam': NoMentionSpam;
	channels: Channels;
	commandUses: number;
	disabledChannels: readonly string[];
	disabledCommands: readonly string[];
	disabledCommandsChannels: readonly DisabledCommandChannel[];
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
	stickyRoles: readonly StickyRole[];
	tags: readonly [string, string][];
	trigger: Trigger;
}

interface Channels extends Record<string, string> {
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

interface Events extends Record<string, boolean> {
	banAdd: boolean;
	banRemove: boolean;
	memberAdd: boolean;
	memberRemove: boolean;
	memberNameUpdate: boolean;
	messageDelete: boolean;
	messageEdit: boolean;
	'twemoji-reactions': boolean;
}

interface DisabledCommandChannel {
	channel: string;
	commands: readonly string[];
}

interface StickyRole {
	user: string;
	roles: readonly string[];
}

interface Messages {
	farewell: string;
	greeting: string;
	'join-dm': string;
	ignoreChannels: string[];
	'moderation-dm': boolean;
	'moderation-reason-display': boolean;
	'moderation-message-display': boolean;
	'moderation-auto-delete': boolean;
	'moderator-name-display': boolean;
}

interface Roles {
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
