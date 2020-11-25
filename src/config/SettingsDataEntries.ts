import { FlattenedGuild } from './types/ApiData';
import { Channels, Events, Messages, Moderation, Roles, Suggestions } from './types/ConfigurableData';
import { GuildSettings } from './types/GuildSettings';

export const ConfigurableSuggestionActions: Suggestions.OnAction[] = [
	{
		title: 'DM',
		key: 'suggestionsOnActionDm',
		description: "If this setting is enabled, Skyra will DM the suggestion's author every time it is updated."
	},
	{
		title: 'Repost',
		key: 'suggestionsOnActionRepost',
		description:
			"If this setting is enabled, Skyra will repost the suggestion's message every time it is updated. If it is disabled, it will edit the original message."
	},
	{
		title: 'Hide Author',
		key: 'suggestionsOnActionHideAuthor',
		description:
			'This setting allows you to update suggestions anonymously. It will substitute the updater\'s name with either "An administrator" or "A moderator", according to their permission level.'
	}
];

export const ConfigurableEmojis: Suggestions.Emoji[] = [
	{
		title: 'Upvote Emoji',
		key: 'suggestionsEmojisUpvote',
		description: 'The upvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowT',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285487652954.png',
		defaultId: '694594285487652954'
	},
	{
		title: 'Downvote Emoji',
		key: 'suggestionsEmojisDownvote',
		description: 'The downvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowB',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285269680179.png',
		defaultId: '694594285269680179'
	}
];

export const ConfigurableRemoveInitialRole: Roles.Role = {
	name: 'Remove Initial',
	tooltip: 'Whether the claim of a public role should remove the initial one too.',
	key: 'rolesRemoveInitial'
};

export const ConfigurablePublicRoles: Roles.Role = {
	name: 'Public Roles',
	tooltip: 'The public roles, they will be given with no cost to any user using the roles command.',
	key: 'rolesPublic'
};

export const ConfigurableRoles: Roles.Role[] = [
	{
		name: 'Administrator',
		tooltip:
			'The administrator role, their privileges in Skyra will include all moderator permissions, including management. Defaults to anyone with the Manage Server permission.',
		key: 'rolesAdmin'
	},
	{
		name: 'Initial',
		tooltip: 'The initial role, if configured, I will give it to users as soon as they join.',
		key: 'rolesInitial'
	},
	{
		name: 'Moderator',
		tooltip: 'The moderator role, their privileges will cover almost all moderation commands. Defaults to anyone who can ban members.',
		key: 'rolesModerator'
	},
	{
		name: 'Muted',
		tooltip: 'The muted role, if configured, I will give new muted users this role. Otherwise I will prompt you the creation of one.',
		key: 'rolesMuted'
	},
	{
		name: 'Restricted Reaction',
		tooltip: 'The role that is used for the restrictReaction moderation command.',
		key: 'rolesRestrictedReaction'
	},
	{
		name: 'Restricted Embed',
		tooltip: 'The role that is used for the restrictEmbed moderation command.',
		key: 'rolesRestrictedEmbed'
	},
	{
		name: 'Restricted Attachment',
		tooltip: 'The role that is used for the restrictAttachment moderation command.',
		key: 'rolesRestrictedAttachment'
	},
	{
		name: 'Restricted Emoji',
		tooltip: 'The role that is used for the restrictEmoji moderation command.',
		key: 'rolesRestrictedEmoji'
	},
	{
		name: 'Restricted Voice',
		tooltip: 'The role that is used for the restrictVoice moderation command.',
		key: 'rolesRestrictedVoice'
	},
	{
		name: 'DJ',
		tooltip: "The DJ role for this server. DJs have more advanced control over Skyra's music commands.",
		key: 'rolesDj'
	},
	{
		name: 'Subscriber',
		tooltip:
			'The subscriber role, this role will be mentioned every time you use the announce command. I will always keep it non-mentionable so people do not abuse mentions.',
		key: 'rolesSubscriber'
	}
];

export const ConfigurableModerationKeys: Moderation.Message[] = [
	{ name: 'Hide Message', key: 'messagesModerationAutoDelete', description: 'Will delete your message to hide the mod.' },
	{ name: 'Message User', key: 'messagesModerationDm', description: "DM's the punished person with the reason/duration." },
	{
		name: 'Send Punishment Response',
		key: 'messagesModerationMessageDisplay',
		description: 'Responds to the punishment command.'
	},
	{
		name: 'Show Reason',
		key: 'messagesModerationReasonDisplay',
		description: 'Whether to show the reason in the response.'
	},
	{
		name: 'Show Mod Name',
		key: 'messagesModeratorNameDisplay',
		description: 'Whether to show the moderators name in the DM.'
	}
];

export const ConfigurableMessageKeys = (guildSettings: GuildSettings, guildData: FlattenedGuild): Messages.Message[] => [
	{
		name: 'Join DMs',
		key: 'messagesJoinDM',
		placeholder: [!guildSettings.eventsMemberAdd ? 'You must configure Member Join on the Events page.' : null].join(' '),
		tooltipText: 'This is the message I will send in a DM to a member when they join.'
	},
	{
		name: 'Greeting',
		key: 'messagesGreeting',
		placeholder: [
			!guildSettings.channelsGreeting ? 'You must set up the greeting channel in channels page.' : null,
			!guildSettings.eventsMemberAdd ? 'You must configure Member Join on the Events page.' : null
		].join(' '),
		tooltipText: `This is the message I will send to ${
			guildData?.channels.find(c => c.id === guildSettings.channelsGreeting)?.name ?? 'the configured Greeting channel'
		} when a member joins.`
	},
	{
		name: 'Farewell',
		key: 'messagesFarewell',
		placeholder: [
			!guildSettings.channelsFarewell ? 'You must set up the farewell channel in channels page.' : null,
			!guildSettings.eventsMemberRemove ? 'You must configure Member Leave on the Events page.' : null
		].join(' '),
		tooltipText: `This is the message I will send to ${
			guildData?.channels.find(c => c.id === guildSettings.channelsFarewell)?.name ?? 'the configured Farewell channel'
		} when a member leaves.`
	}
];

export const ConfigurableReplaceableMatchers = (guildData: FlattenedGuild): Messages.Matcher[] => [
	{ matchKey: Matches.Guild, description: `I will replace this with ${guildData?.name}` },
	{ matchKey: Matches.Member, description: `I will replace this with a mention of the member` },
	{ matchKey: Matches.MemberName, description: `I will replace this with the username of the member` },
	{ matchKey: Matches.MemberTag, description: `I will replace this with the unique tag of the member` },
	{ matchKey: Matches.MemberCount, description: `I will replace this with the amount of members currently in the server` },
	{
		matchKey: Matches.Position,
		description: `I will replace this with the ordinal position this member has in the server.`
	}
];

export enum Matches {
	Guild = '%GUILD%',
	Member = '%MEMBER%',
	MemberName = '%MEMBERNAME%',
	MemberTag = '%MEMBERTAG%',
	MemberCount = '%MEMBERCOUNT%',
	Position = '%POSITION%'
}

export const ConfigurableModerationEvents: Events.Event[] = [
	{ title: 'Ban Added', key: 'eventsBanAdd', description: 'This event posts anonymous moderation logs when a user gets banned.' },
	{ title: 'Ban Revoked', key: 'eventsBanRemove', description: 'This event posts anonymous moderation logs when a user gets unbanned' }
];

export const ConfigurableMemberEvents: Events.Event[] = [
	{ title: 'Member Join', key: 'eventsMemberAdd', description: 'This event posts member logs when a user joins' },
	{ title: 'Member Leave', key: 'eventsMemberRemove', description: 'This event posts member logs when a user leaves' },
	{
		title: 'Member Role Changes',
		key: 'eventsMemberRoleUpdate',
		description: "This events posts member logs when a member's roles change"
	},
	{
		title: 'Member Name Changes',
		key: 'eventsMemberNameUpdate',
		description: 'This events posts member logs when a member changes their name'
	}
];

export const ConfigurableMessageEvents: Events.Event[] = [
	{
		title: 'Message Edit',
		key: 'eventsMessageEdit',
		description:
			'This event logs to the Message Logs channel when a message is edited. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Message Delete',
		key: 'eventsMessageDelete',
		description:
			'This event logs to the Message Logs channel when a message is deleted. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Twemoji Reactions',
		key: 'eventsTwemojiReactions',
		description:
			'This event posts messages whenever a member reacts to a message with a twemoji, they will be send to the Reaction Logs channel'
	}
];

export const ConfigurableDisabledChannels: Channels.Channel = {
	name: 'Disabled Channels',
	description: [
		'A list of channels for disabled commands, for example,',
		'setting up a channel called general will forbid all users',
		'from using my commands there. Moderators+ override this',
		'purposedly to allow them to moderate without switching channels.'
	].join(' '),
	key: 'channelsSpam'
};

export const ConfigurableChannels: Channels.Channel[] = [
	{ name: 'Announcements', description: 'The channel for announcements', key: 'channelsAnnouncements' },
	{ name: 'Greetings', description: 'The channel I will use to send greetings', key: 'channelsGreeting' },
	{ name: 'Farewells', description: 'The channel I will use to send farewells', key: 'channelsFarewell' },
	{ name: 'Spam', description: 'The channel for me to redirect users to when they use commands I consider spammy.', key: 'channelsSpam' }
];

export const ConfigurableLoggingChannels: Channels.Channel[] = [
	{ name: 'Message Logs', description: 'The channel for (non-NSFW) message logs', key: 'channelsMessageLogs' },
	{
		name: 'Member Logs',
		description: 'The channel for member logs, once enabled, I will post all member related events there.',
		key: 'channelsMemberLogs'
	},
	{
		name: 'Moderation Logs',
		description: 'The channel for moderation logs, once enabled, I will post all my moderation cases there.',
		key: 'channelsModerationLogs'
	},
	{
		name: 'NSFW Logs',
		description: 'The channel for NSFW message logs, same requirement as normal message logs, but will only send NSFW messages.',
		key: 'channelsNsfwMessageLogs'
	},
	{ name: 'Image Logs', description: 'The channel I will use to re-upload all images I see.', key: 'channelsImageLogs' },
	{
		name: 'Prune Logs',
		description: 'The channel for prune logs, same requirement as normal message logs, but will only send prune messages.',
		key: 'channelsPruneLogs'
	},
	{
		name: 'Reaction Logs',
		description: 'The channel for the reaction logs, same requirement as normal message logs, but will only send message reactions',
		key: 'channelsReactionLogs'
	}
];

export const ConfigurableIgnoreChannels: Channels.IgnoreChannel[] = [
	{ name: 'All logs', description: 'Channels I should ignore for all types of logging.', key: 'channelsIgnoreAll' },
	{
		name: 'Message delete logs',
		description: 'Channels I should ignore when checking for deleted messages to log.',
		key: 'channelsIgnoreMessageDeletes'
	},
	{
		name: 'Message edit logs',
		description: 'Channels I should ignore when checking for edited messages to log.',
		key: 'channelsIgnoreMessageEdits'
	},
	{
		name: 'Reaction add logs',
		description: 'Channels I should ignore when checking for added reactions.',
		key: 'channelsIgnoreReactionAdds'
	}
];
