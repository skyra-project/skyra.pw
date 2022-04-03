export interface GuildSettings {
	channelsIgnoreAll: string[];
	channelsIgnoreMessageDeletes: string[];
	channelsIgnoreMessageEdits: string[];
	channelsIgnoreReactionAdds: string[];
	channelsLogsChannelCreate: string | null;
	channelsLogsChannelDelete: string | null;
	channelsLogsChannelUpdate: string | null;
	channelsLogsEmojiCreate: string | null;
	channelsLogsEmojiDelete: string | null;
	channelsLogsEmojiUpdate: string | null;
	channelsLogsImage: string | null;
	channelsLogsMemberAdd: string | null;
	channelsLogsMemberRemove: string | null;
	channelsLogsMemberNickNameUpdate: string | null;
	channelsLogsMemberUserNameUpdate: string | null;
	channelsLogsMemberRolesUpdate: string | null;
	channelsLogsMessageDelete: string | null;
	channelsLogsMessageDeleteNsfw: string | null;
	channelsLogsMessageUpdate: string | null;
	channelsLogsMessageUpdateNsfw: string | null;
	channelsLogsModeration: string | null;
	channelsLogsPrune: string | null;
	channelsLogsReaction: string | null;
	channelsLogsRoleCreate: string | null;
	channelsLogsRoleDelete: string | null;
	channelsLogsRoleUpdate: string | null;
	channelsLogsServerUpdate: string | null;
	commandAutoDelete: CommandAutoDelete[];
	customCommands: CustomCommand[];
	disabledChannels: string[];
	disabledCommands: string[];
	disabledCommandsChannels: DisabledCommandChannel[];
	disableNaturalPrefix: boolean;
	eventsBanAdd: boolean;
	eventsBanRemove: boolean;
	eventsTwemojiReactions: boolean;
	language: string;
	messagesAutoDeleteIgnoredAll: boolean;
	messagesAutoDeleteIgnoredChannels: string[];
	messagesAutoDeleteIgnoredCommands: string[];
	messagesAutoDeleteIgnoredRoles: string[];
	messagesIgnoreChannels: string[];
	messagesModerationAutoDelete: boolean;
	messagesModerationDm: boolean;
	messagesModerationMessageDisplay: boolean;
	messagesModerationReasonDisplay: boolean;
	messagesModeratorNameDisplay: boolean;
	noMentionSpamAlerts: boolean;
	noMentionSpamEnabled: boolean;
	noMentionSpamMentionsAllowed: number;
	noMentionSpamTimePeriod: number;
	notificationsStreamsTwitchStreamers: NotificationsStreamTwitch[];
	permissionsRoles: PermissionsNode[];
	permissionsUsers: PermissionsNode[];
	prefix: string;
	reactionRoles: ReactionRole[];
	rolesAdmin: string[];
	rolesAuto: RolesAuto[];
	rolesInitial: string | null;
	rolesModerator: string[];
	rolesMuted: string | null;
	rolesPublic: string[];
	rolesRemoveInitial: boolean;
	rolesRestrictedAttachment: string | null;
	rolesRestrictedEmbed: string | null;
	rolesRestrictedEmoji: string | null;
	rolesRestrictedReaction: string | null;
	rolesRestrictedVoice: string | null;
	rolesUniqueRoleSets: UniqueRoleSet[];
	selfmodAttachmentsEnabled: boolean;
	selfmodAttachmentsHardAction: number;
	selfmodAttachmentsHardActionDuration: number | null;
	selfmodAttachmentsIgnoredChannels: string[];
	selfmodAttachmentsIgnoredRoles: string[];
	selfmodAttachmentsSoftAction: number;
	selfmodAttachmentsThresholdDuration: number;
	selfmodAttachmentsThresholdMaximum: number;
	selfmodCapitalsEnabled: boolean;
	selfmodCapitalsHardAction: number;
	selfmodCapitalsHardActionDuration: number | null;
	selfmodCapitalsIgnoredChannels: string[];
	selfmodCapitalsIgnoredRoles: string[];
	selfmodCapitalsMaximum: number;
	selfmodCapitalsMinimum: number;
	selfmodCapitalsSoftAction: number;
	selfmodCapitalsThresholdDuration: number;
	selfmodCapitalsThresholdMaximum: number;
	selfmodFilterEnabled: boolean;
	selfmodFilterHardAction: number;
	selfmodFilterHardActionDuration: number | null;
	selfmodFilterIgnoredChannels: string[];
	selfmodFilterIgnoredRoles: string[];
	selfmodFilterRaw: string[];
	selfmodFilterSoftAction: number;
	selfmodFilterThresholdDuration: number;
	selfmodFilterThresholdMaximum: number;
	selfmodIgnoreChannels: string[];
	selfmodInvitesEnabled: boolean;
	selfmodInvitesHardAction: number;
	selfmodInvitesHardActionDuration: number | null;
	selfmodInvitesIgnoredChannels: string[];
	selfmodInvitesIgnoredCodes: string[];
	selfmodInvitesIgnoredGuilds: string[];
	selfmodInvitesIgnoredRoles: string[];
	selfmodInvitesSoftAction: number;
	selfmodInvitesThresholdDuration: number;
	selfmodInvitesThresholdMaximum: number;
	selfmodLinksAllowed: string[];
	selfmodLinksEnabled: boolean;
	selfmodLinksHardAction: number;
	selfmodLinksHardActionDuration: number | null;
	selfmodLinksIgnoredChannels: string[];
	selfmodLinksIgnoredRoles: string[];
	selfmodLinksSoftAction: number;
	selfmodLinksThresholdDuration: number;
	selfmodLinksThresholdMaximum: number;
	selfmodMessagesEnabled: boolean;
	selfmodMessagesHardAction: number;
	selfmodMessagesHardActionDuration: number | null;
	selfmodMessagesIgnoredChannels: string[];
	selfmodMessagesIgnoredRoles: string[];
	selfmodMessagesMaximum: number;
	selfmodMessagesQueueSize: number;
	selfmodMessagesSoftAction: number;
	selfmodMessagesThresholdDuration: number;
	selfmodMessagesThresholdMaximum: number;
	selfmodNewlinesEnabled: boolean;
	selfmodNewlinesHardAction: number;
	selfmodNewlinesHardActionDuration: number | null;
	selfmodNewlinesIgnoredChannels: string[];
	selfmodNewlinesIgnoredRoles: string[];
	selfmodNewlinesMaximum: number;
	selfmodNewlinesSoftAction: number;
	selfmodNewlinesThresholdDuration: number;
	selfmodNewlinesThresholdMaximum: number;
	selfmodReactionsAllowed: string[];
	selfmodReactionsBlocked: string[];
	selfmodReactionsEnabled: boolean;
	selfmodReactionsHardAction: number;
	selfmodReactionsHardActionDuration: number | null;
	selfmodReactionsIgnoredChannels: string[];
	selfmodReactionsIgnoredRoles: string[];
	selfmodReactionsMaximum: number;
	selfmodReactionsSoftAction: number;
	selfmodReactionsThresholdDuration: number;
	selfmodReactionsThresholdMaximum: number;
	socialAchieve: boolean;
	socialAchieveMessage: string | null;
	socialEnabled: boolean;
	socialIgnoredChannels: string[];
	socialIgnoredRoles: string[];
	socialMultiplier: number;
	stickyRoles: StickyRole[];
	suggestionsChannel: string | null;
	suggestionsEmojisDownVote: string;
	suggestionsEmojisUpVote: string;
	suggestionsOnActionDm: boolean;
	suggestionsOnActionHideAuthor: boolean;
	suggestionsOnActionRePost: boolean;
	triggerAlias: TriggerAlias[];
	triggerIncludes: TriggerIncludes[];
}

interface PermissionsNode {
	id: string;
	allow: string[];
	deny: string[];
}

export interface CustomCommand {
	id: string;
	embed: boolean;
	color: number;
	content: string;
	aliases: never[];
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
