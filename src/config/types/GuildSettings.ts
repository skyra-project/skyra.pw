export interface GuildSettings {
	'channels.announcements': string | null;
	'channels.farewell': string | null;
	'channels.greeting': string | null;
	'channels.ignore.all': [];
	'channels.ignore.message-delete': [];
	'channels.ignore.message-edit': [];
	'channels.ignore.reaction-add': [];
	'channels.image-logs': string | null;
	'channels.member-logs': string | null;
	'channels.message-logs': string | null;
	'channels.moderation-logs': string | null;
	'channels.nsfw-message-logs': string | null;
	'channels.prune-logs': string | null;
	'channels.reaction-logs': string | null;
	'channels.spam': string | null;
	'command-autodelete': CommandAutoDelete[];
	'custom-commands': CustomCommand[];
	'events.banAdd': boolean;
	'events.banRemove': boolean;
	'events.memberAdd': boolean;
	'events.memberNameUpdate': boolean;
	'events.memberRemove': boolean;
	'events.memberRoleUpdate': boolean;
	'events.messageDelete': boolean;
	'events.messageEdit': boolean;
	'events.twemoji-reactions': boolean;
	'messages.announcement-embed': boolean;
	'messages.farewell': string | null;
	'messages.greeting': string | null;
	'messages.ignoreChannels': string[];
	'messages.join-dm': string | null;
	'messages.moderation-auto-delete': boolean;
	'messages.moderation-dm': boolean;
	'messages.moderation-message-display': boolean;
	'messages.moderation-reason-display': boolean;
	'messages.moderator-name-display': boolean;
	'music.allow-streams': boolean;
	'music.default-volume': number;
	'music.maximum-duration': number;
	'music.maximum-entries-per-user': number;
	'no-mention-spam.alerts': boolean;
	'no-mention-spam.enabled': boolean;
	'no-mention-spam.mentionsAllowed': number;
	'no-mention-spam.timePeriod': number;
	'notifications.streams.twitch.streamers': NotificationsStreamTwitch[];
	'permissions.roles': PermissionsNode[];
	'permissions.users': PermissionsNode[];
	'reaction-roles': ReactionRole[];
	'roles.admin': string | null;
	'roles.auto': RolesAuto[];
	'roles.dj': string | null;
	'roles.initial': string | null;
	'roles.moderator': string | null;
	'roles.muted': string | null;
	'roles.public': string[];
	'roles.removeInitial': boolean;
	'roles.restricted-attachment': string | null;
	'roles.restricted-embed': string | null;
	'roles.restricted-emoji': string | null;
	'roles.restricted-reaction': string | null;
	'roles.restricted-voice': string | null;
	'roles.subscriber': string | null;
	'roles.uniqueRoleSets': UniqueRoleSet[];
	'selfmod.attachment': boolean;
	'selfmod.attachmentAction': boolean;
	'selfmod.attachmentDuration': number;
	'selfmod.attachmentMaximum': number;
	'selfmod.attachmentPunishmentDuration': number | null;
	'selfmod.capitals.enabled': boolean;
	'selfmod.capitals.hardAction': number;
	'selfmod.capitals.hardActionDuration': number | null;
	'selfmod.capitals.ignoredChannels': string[];
	'selfmod.capitals.ignoredRoles': string[];
	'selfmod.capitals.maximum': number;
	'selfmod.capitals.minimum': number;
	'selfmod.capitals.softAction': number;
	'selfmod.capitals.thresholdDuration': number;
	'selfmod.capitals.thresholdMaximum': number;
	'selfmod.filter.enabled': boolean;
	'selfmod.filter.hardAction': number;
	'selfmod.filter.hardActionDuration': number | null;
	'selfmod.filter.ignoredChannels': string[];
	'selfmod.filter.ignoredRoles': string[];
	'selfmod.filter.raw': string[];
	'selfmod.filter.softAction': number;
	'selfmod.filter.thresholdDuration': number;
	'selfmod.filter.thresholdMaximum': number;
	'selfmod.ignoreChannels': string[];
	'selfmod.invites.enabled': boolean;
	'selfmod.invites.hardAction': number;
	'selfmod.invites.hardActionDuration': number | null;
	'selfmod.invites.ignoredChannels': string[];
	'selfmod.invites.ignoredCodes': string[];
	'selfmod.invites.ignoredGuilds': string[];
	'selfmod.invites.ignoredRoles': string[];
	'selfmod.invites.softAction': number;
	'selfmod.invites.thresholdDuration': number;
	'selfmod.invites.thresholdMaximum': number;
	'selfmod.links.enabled': boolean;
	'selfmod.links.hardAction': number;
	'selfmod.links.hardActionDuration': number | null;
	'selfmod.links.ignoredChannels': string[];
	'selfmod.links.ignoredRoles': string[];
	'selfmod.links.softAction': number;
	'selfmod.links.thresholdDuration': number;
	'selfmod.links.thresholdMaximum': number;
	'selfmod.links.whitelist': string[];
	'selfmod.messages.enabled': boolean;
	'selfmod.messages.hardAction': number;
	'selfmod.messages.hardActionDuration': number | null;
	'selfmod.messages.ignoredChannels': string[];
	'selfmod.messages.ignoredRoles': string[];
	'selfmod.messages.maximum': number;
	'selfmod.messages.queue-size': number;
	'selfmod.messages.softAction': number;
	'selfmod.messages.thresholdDuration': number;
	'selfmod.messages.thresholdMaximum': number;
	'selfmod.newlines.enabled': boolean;
	'selfmod.newlines.hardAction': number;
	'selfmod.newlines.hardActionDuration': number | null;
	'selfmod.newlines.ignoredChannels': string[];
	'selfmod.newlines.ignoredRoles': string[];
	'selfmod.newlines.maximum': number;
	'selfmod.newlines.softAction': number;
	'selfmod.newlines.thresholdDuration': number;
	'selfmod.newlines.thresholdMaximum': number;
	'selfmod.raid': boolean;
	'selfmod.raidthreshold': number;
	'selfmod.reactions.blacklist': string[];
	'selfmod.reactions.enabled': boolean;
	'selfmod.reactions.hardAction': number;
	'selfmod.reactions.hardActionDuration': number | null;
	'selfmod.reactions.ignoredChannels': string[];
	'selfmod.reactions.ignoredRoles': string[];
	'selfmod.reactions.maximum': number;
	'selfmod.reactions.softAction': number;
	'selfmod.reactions.thresholdDuration': number;
	'selfmod.reactions.thresholdMaximum': number;
	'selfmod.reactions.whitelist': string[];
	'social.achieve': boolean;
	'social.achieveMessage': string | null;
	'social.enabled': boolean;
	'social.ignoreChannels': string[];
	'social.multiplier': number;
	'starboard.channel': string | null;
	'starboard.emoji': string;
	'starboard.ignoreChannels': string[];
	'starboard.minimum': number;
	'starboard.selfStar': boolean;
	'suggestions.channel': string | null;
	'suggestions.emojis.downvote': string;
	'suggestions.emojis.upvote': string;
	'suggestions.id': number;
	'suggestions.on-action.dm': boolean;
	'suggestions.on-action.hide-author': boolean;
	'suggestions.on-action.repost': boolean;
	'trigger.alias': TriggerAlias[];
	'trigger.includes': TriggerIncludes[];
	disabledChannels: string[];
	disabledCommands: string[];
	disabledCommandsChannels: DisabledCommandChannel[];
	disableNaturalPrefix: boolean;
	language: 'en-US' | 'es-ES';
	prefix: string;
	stickyRoles: StickyRole[];
}

interface PermissionsNode {
	id: string;
	allow: string[];
	deny: string[];
}

interface CustomCommand {
	id: string;
	embed: boolean;
	color: number;
	content: string;
	args: string[];
}

type CommandAutoDelete = readonly [string, number];

interface DisabledCommandChannel {
	channel: string;
	commands: string[];
}

interface StickyRole {
	user: string;
	roles: string[];
}

interface ReactionRole {
	role: string;
	emoji: string;
	message: string | null;
	channel: string;
}

interface RolesAuto {
	id: string;
	points: number;
}

interface TriggerAlias {
	input: string;
	output: string;
}

interface TriggerIncludes extends TriggerAlias {
	action: 'react';
}

interface UniqueRoleSet {
	name: string;
	roles: readonly string[];
}

enum NotificationsStreamsTwitchEventStatus {
	Online,
	Offline
}

interface NotificationsStreamsTwitchStreamer {
	channel: string;
	author: string;
	message: string | null;
	embed: boolean;
	status: NotificationsStreamsTwitchEventStatus;
	gamesBlacklist: readonly string[];
	gamesWhitelist: readonly string[];
	createdAt: number;
}

type NotificationsStreamTwitch = [string, readonly NotificationsStreamsTwitchStreamer[]];
