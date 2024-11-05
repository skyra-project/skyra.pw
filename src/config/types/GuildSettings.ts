export interface GuildSettings {
	channelsIgnoreAll: string[];
	channelsIgnoreMessageDelete: string[];
	channelsIgnoreMessageEdit: string[];
	channelsIgnoreReactionAdd: string[];
	channelsIgnoreVoiceActivity: string[];
	channelsLogsChannelCreate: string | null;
	channelsLogsChannelDelete: string | null;
	channelsLogsChannelUpdate: string | null;
	channelsLogsEmojiCreate: string | null;
	channelsLogsEmojiDelete: string | null;
	channelsLogsEmojiUpdate: string | null;
	channelsLogsImage: string | null;
	channelsLogsMemberAdd: string | null;
	channelsLogsMemberNicknameUpdate: string | null;
	channelsLogsMemberRemove: string | null;
	channelsLogsMemberRolesUpdate: string | null;
	channelsLogsMemberUsernameUpdate: string | null;
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
	channelsLogsVoiceChannel: string | null;
	channelsMediaOnly: string[];
	commandAutoDelete: CommandAutoDelete[];
	disabledChannels: string[];
	disabledCommands: string[];
	disabledCommandsChannels: DisabledCommandChannel[];
	disableNaturalPrefix: boolean;
	eventsBanAdd: boolean;
	eventsBanRemove: boolean;
	eventsIncludeBots: boolean;
	eventsTimeout: boolean;
	eventsTwemojiReactions: boolean;
	eventsUnknownMessages: boolean;
	id: string;
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
	permissionsRoles: PermissionsNode[];
	permissionsUsers: PermissionsNode[];
	prefix: string;
	reactionRoles: ReactionRole[];
	rolesAdmin: string[];
	rolesInitial: string | null;
	rolesInitialBots: string | null;
	rolesInitialHumans: string | null;
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
	selfmodIgnoredChannels: string[];
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
	stickyRoles: StickyRole[];
}

interface PermissionsNode {
	id: string;
	allow: string[];
	deny: string[];
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

interface UniqueRoleSet {
	name: string;
	roles: readonly string[];
}
