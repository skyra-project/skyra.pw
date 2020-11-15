import { FlattenedGuild } from './types/ApiData';
import { Channels, Events, Messages, Moderation, Roles, Suggestions } from './types/ConfigurableData';
import { GuildSettings } from './types/GuildSettings';

export const ConfigurableSuggestionActions: Suggestions.OnAction[] = [
	{
		title: 'DM',
		key: 'suggestions.on-action.dm',
		description: "If this setting is enabled, Skyra will DM the suggestion's author every time it is updated."
	},
	{
		title: 'Repost',
		key: 'suggestions.on-action.repost',
		description:
			"If this setting is enabled, Skyra will repost the suggestion's message every time it is updated. If it is disabled, it will edit the original message."
	},
	{
		title: 'Hide Author',
		key: 'suggestions.on-action.hide-author',
		description:
			'This setting allows you to update suggestions anonymously. It will substitute the updater\'s name with either "An administrator" or "A moderator", according to their permission level.'
	}
];

export const ConfigurableEmojis: Suggestions.Emoji[] = [
	{
		title: 'Upvote Emoji',
		key: 'suggestions.emojis.upvote',
		description: 'The upvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowT',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285487652954.png',
		defaultId: '694594285487652954'
	},
	{
		title: 'Downvote Emoji',
		key: 'suggestions.emojis.downvote',
		description: 'The downvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowB',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285269680179.png',
		defaultId: '694594285269680179'
	}
];

export const ConfigurableRemoveInitialRole: Roles.Role = {
	name: 'Remove Initial',
	tooltip: 'Whether the claim of a public role should remove the initial one too.',
	key: 'roles.removeInitial'
};

export const ConfigurablePublicRoles: Roles.Role = {
	name: 'Public Roles',
	tooltip: 'The public roles, they will be given with no cost to any user using the roles command.',
	key: 'roles.public'
};

export const ConfigurableRoles: Roles.Role[] = [
	{
		name: 'Administrator',
		tooltip:
			'The administrator role, their privileges in Skyra will include all moderator permissions, including management. Defaults to anyone with the Manage Server permission.',
		key: 'roles.admin'
	},
	{
		name: 'Initial',
		tooltip: 'The initial role, if configured, I will give it to users as soon as they join.',
		key: 'roles.initial'
	},
	{
		name: 'Moderator',
		tooltip: 'The moderator role, their privileges will cover almost all moderation commands. Defaults to anyone who can ban members.',
		key: 'roles.moderator'
	},
	{
		name: 'Muted',
		tooltip: 'The muted role, if configured, I will give new muted users this role. Otherwise I will prompt you the creation of one.',
		key: 'roles.muted'
	},
	{
		name: 'Restricted Reaction',
		tooltip: 'The role that is used for the restrictReaction moderation command.',
		key: 'roles.restricted-reaction'
	},
	{
		name: 'Restricted Embed',
		tooltip: 'The role that is used for the restrictEmbed moderation command.',
		key: 'roles.restricted-embed'
	},
	{
		name: 'Restricted Attachment',
		tooltip: 'The role that is used for the restrictAttachment moderation command.',
		key: 'roles.restricted-attachment'
	},
	{
		name: 'Restricted Emoji',
		tooltip: 'The role that is used for the restrictEmoji moderation command.',
		key: 'roles.restricted-emoji'
	},
	{
		name: 'Restricted Voice',
		tooltip: 'The role that is used for the restrictVoice moderation command.',
		key: 'roles.restricted-voice'
	},
	{
		name: 'DJ',
		tooltip: "The DJ role for this server. DJs have more advanced control over Skyra's music commands.",
		key: 'roles.dj'
	},
	{
		name: 'Subscriber',
		tooltip:
			'The subscriber role, this role will be mentioned every time you use the announce command. I will always keep it non-mentionable so people do not abuse mentions.',
		key: 'roles.subscriber'
	}
];

export const ConfigurableModerationKeys: Moderation.Message[] = [
	{ name: 'Hide Message', key: 'messages.moderation-auto-delete', description: 'Will delete your message to hide the mod.' },
	{ name: 'Message User', key: 'messages.moderation-dm', description: "DM's the punished person with the reason/duration." },
	{
		name: 'Send Punishment Response',
		key: 'messages.moderation-message-display',
		description: 'Responds to the punishment command.'
	},
	{
		name: 'Show Reason',
		key: 'messages.moderation-reason-display',
		description: 'Whether to show the reason in the response.'
	},
	{
		name: 'Show Mod Name',
		key: 'messages.moderator-name-display',
		description: 'Whether to show the moderators name in the DM.'
	}
];

export const ConfigurableMessageKeys = (guildSettings: GuildSettings, guildData: FlattenedGuild): Messages.Message[] => [
	{
		name: 'Join DMs',
		key: 'messages.join-dm',
		placeholder: [!guildSettings['events.memberAdd'] ? 'You must configure Member Join on the Events page.' : null].join(' '),
		tooltipText: 'This is the message I will send in a DM to a member when they join.'
	},
	{
		name: 'Greeting',
		key: 'messages.greeting',
		placeholder: [
			!guildSettings['channels.greeting'] ? 'You must set up the greeting channel in channels page.' : null,
			!guildSettings['events.memberAdd'] ? 'You must configure Member Join on the Events page.' : null
		].join(' '),
		tooltipText: `This is the message I will send to ${
			guildData?.channels.find(c => c.id === guildSettings['channels.greeting'])?.name ?? 'the configured Greeting channel'
		} when a member joins.`
	},
	{
		name: 'Farewell',
		key: 'messages.farewell',
		placeholder: [
			!guildSettings['channels.farewell'] ? 'You must set up the farewell channel in channels page.' : null,
			!guildSettings['events.memberRemove'] ? 'You must configure Member Leave on the Events page.' : null
		].join(' '),
		tooltipText: `This is the message I will send to ${
			guildData?.channels.find(c => c.id === guildSettings['channels.farewell'])?.name ?? 'the configured Farewell channel'
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
	{ title: 'Ban Added', key: 'events.banAdd', description: 'This event posts anonymous moderation logs when a user gets banned.' },
	{ title: 'Ban Revoked', key: 'events.banRemove', description: 'This event posts anonymous moderation logs when a user gets unbanned' }
];

export const ConfigurableMemberEvents: Events.Event[] = [
	{ title: 'Member Join', key: 'events.memberAdd', description: 'This event posts member logs when a user joins' },
	{ title: 'Member Leave', key: 'events.memberRemove', description: 'This event posts member logs when a user leaves' },
	{
		title: 'Member Role Changes',
		key: 'events.memberRoleUpdate',
		description: "This events posts member logs when a member's roles change"
	},
	{
		title: 'Member Name Changes',
		key: 'events.memberNameUpdate',
		description: 'This events posts member logs when a member changes their name'
	}
];

export const ConfigurableMessageEvents: Events.Event[] = [
	{
		title: 'Message Edit',
		key: 'events.messageEdit',
		description:
			'This event logs to the Message Logs channel when a message is edited. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Message Delete',
		key: 'events.messageDelete',
		description:
			'This event logs to the Message Logs channel when a message is deleted. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Twemoji Reactions',
		key: 'events.twemoji-reactions',
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
	key: 'channels.spam'
};

export const ConfigurableChannels: Channels.Channel[] = [
	{ name: 'Announcements', description: 'The channel for announcements', key: 'channels.announcements' },
	{ name: 'Greetings', description: 'The channel I will use to send greetings', key: 'channels.greeting' },
	{ name: 'Farewells', description: 'The channel I will use to send farewells', key: 'channels.farewell' },
	{ name: 'Spam', description: 'The channel for me to redirect users to when they use commands I consider spammy.', key: 'channels.spam' }
];

export const ConfigurableLoggingChannels: Channels.Channel[] = [
	{ name: 'Message Logs', description: 'The channel for (non-NSFW) message logs', key: 'channels.message-logs' },
	{
		name: 'Member Logs',
		description: 'The channel for member logs, once enabled, I will post all member related events there.',
		key: 'channels.member-logs'
	},
	{
		name: 'Moderation Logs',
		description: 'The channel for moderation logs, once enabled, I will post all my moderation cases there.',
		key: 'channels.moderation-logs'
	},
	{
		name: 'NSFW Logs',
		description: 'The channel for NSFW message logs, same requirement as normal message logs, but will only send NSFW messages.',
		key: 'channels.nsfw-message-logs'
	},
	{ name: 'Image Logs', description: 'The channel I will use to re-upload all images I see.', key: 'channels.image-logs' },
	{
		name: 'Prune Logs',
		description: 'The channel for prune logs, same requirement as normal message logs, but will only send prune messages.',
		key: 'channels.prune-logs'
	},
	{
		name: 'Reaction Logs',
		description: 'The channel for the reaction logs, same requirement as normal message logs, but will only send message reactions',
		key: 'channels.reaction-logs'
	}
];

export const ConfigurableIgnoreChannels: Channels.IgnoreChannel[] = [
	{ name: 'All logs', description: 'Channels I should ignore for all types of logging.', key: 'channels.ignore.all' },
	{
		name: 'Message delete logs',
		description: 'Channels I should ignore when checking for deleted messages to log.',
		key: 'channels.ignore.message-delete'
	},
	{
		name: 'Message edit logs',
		description: 'Channels I should ignore when checking for edited messages to log.',
		key: 'channels.ignore.message-edit'
	},
	{
		name: 'Reaction add logs',
		description: 'Channels I should ignore when checking for added reactions.',
		key: 'channels.ignore.reaction-add'
	}
];
