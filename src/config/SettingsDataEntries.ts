import { FlattenedGuild } from './types/ApiData';
import { Channels, Events, Messages, Moderation, Roles, Suggestions } from './types/ConfigurableData';
import { GuildSettings } from './types/GuildSettings';

export const CONFIGURABLE_SUGGESTION_ACTIONS: Suggestions.OnAction[] = [
	{ title: 'DM', key: 'dm', description: "If this setting is enabled, Skyra will DM the suggestion's author every time it is updated." },
	{
		title: 'Repost',
		key: 'repost',
		description:
			"If this setting is enabled, Skyra will repost the suggestion's message every time it is updated. If it is disabled, it will edit the original message."
	},
	{
		title: 'Hide Author',
		key: 'hide-author',
		description:
			'This setting allows you to update suggestions anonymously. It will substitute the updater\'s name with either "An administrator" or "A moderator", according to their permission level.'
	}
];

export const CONFIGURABLE_EMOJIS: Suggestions.Emoji[] = [
	{
		title: 'Upvote Emoji',
		key: 'upvote',
		description: 'The upvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowT',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285487652954.png',
		defaultId: '694594285487652954'
	},
	{
		title: 'Downvote Emoji',
		key: 'downvote',
		description: 'The downvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowB',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285269680179.png',
		defaultId: '694594285269680179'
	}
];

export const REMOVE_INITIAL: Roles.Role = {
	name: 'Remove Initial',
	tooltip: 'Whether the claim of a public role should remove the initial one too.',
	key: 'removeInitial'
};

export const PUBLIC_ROLES: Roles.Role = {
	name: 'Public Roles',
	tooltip: 'The public roles, they will be given with no cost to any user using the roles command.',
	key: 'public'
};

export const ROLES: Roles.Role[] = [
	{
		name: 'Administrator',
		tooltip:
			'The administrator role, their priviledges in Skyra will be upon moderative, covering management. Defaults to anyone with the Manage Server permission.',
		key: 'admin'
	},
	{ name: 'Initial', tooltip: 'The initial role, if configured, I will give it to users as soon as they join.', key: 'initial' },
	{
		name: 'Moderator',
		tooltip: 'The moderator role, their priviledges will cover almost all moderation commands. Defaults to anyone who can ban members.',
		key: 'moderator'
	},
	{
		name: 'Muted',
		tooltip: 'The muted role, if configured, I will give new muted users this role. Otherwise I will prompt you the creation of one.',
		key: 'muted'
	},
	{
		name: 'Restricted Reaction',
		tooltip: 'The role that is used for the restrictReaction moderation command.',
		key: 'restricted-reaction'
	},
	{
		name: 'Restricted Embed',
		tooltip: 'The role that is used for the restrictEmbed moderation command.',
		key: 'restricted-embed'
	},
	{
		name: 'Restricted Attachment',
		tooltip: 'The role that is used for the restrictAttachment moderation command.',
		key: 'restricted-attachment'
	},
	{
		name: 'Restricted Emoji',
		tooltip: 'The role that is used for the restrictEmoji moderation command.',
		key: 'restricted-emoji'
	},
	{
		name: 'Restricted Voice',
		tooltip: 'The role that is used for the restrictVoice moderation command.',
		key: 'restricted-voice'
	},
	{
		name: 'DJ',
		tooltip: "The DJ role for this server. DJs have more advanced control over Skyra's music commands.",
		key: 'dj'
	},
	{
		name: 'Subscriber',
		tooltip:
			'The subscriber role, this role will be mentioned every time you use the announce command. I will always keep it non-mentionable so people do not abuse mentions.',
		key: 'subscriber'
	}
];

export const CONFIGURABLE_MODERATION: Moderation.Message[] = [
	{ name: 'Hide Message', key: 'moderation-auto-delete', description: 'Will delete your message to hide the mod.' },
	{ name: 'Message User', key: 'moderation-dm', description: "DM's the punished person with the reason/duration." },
	{
		name: 'Send Punishment Response',
		key: 'moderation-message-display',
		description: 'Responds to the punishment command.'
	},
	{
		name: 'Show Reason',
		key: 'moderation-reason-display',
		description: 'Whether to show the reason in the response.'
	},
	{
		name: 'Show Mod Name',
		key: 'moderator-name-display',
		description: 'Whether to show the moderators name in the DM.'
	}
];

export const CONFIGURABLE_MESSAGES = (guildSettings: GuildSettings, guildData: FlattenedGuild): Messages.Message[] => [
	{
		name: 'Join DMs',
		key: 'join-dm',
		placeholder: [!guildSettings.events.memberAdd ? 'You must configure Member Join on the Events page.' : null].join(' '),
		tooltipText: 'This is the message I will send in a DM to a member when they join.'
	},
	{
		name: 'Greeting',
		key: 'greeting',
		placeholder: [
			!guildSettings.channels.greeting ? 'You must set up the greeting channel in channels page.' : null,
			!guildSettings.events.memberAdd ? 'You must configure Member Join on the Events page.' : null
		].join(' '),
		tooltipText: `This is the message I will send to ${
			guildData?.channels.find(c => c.id === guildSettings.channels.greeting)?.name ?? 'the configured Greeting channel'
		} when a member joins.`
	},
	{
		name: 'Farewell',
		key: 'farewell',
		placeholder: [
			!guildSettings.channels.farewell ? 'You must set up the farewell channel in channels page.' : null,
			!guildSettings.events.memberRemove ? 'You must configure Member Leave on the Events page.' : null
		].join(' '),
		tooltipText: `This is the message I will send to ${
			guildData?.channels.find(c => c.id === guildSettings.channels.farewell)?.name ?? 'the configured Farewell channel'
		} when a member leaves.`
	}
];

export const REPLACEABLE_MATCHERS = (guildData: FlattenedGuild): Messages.Matcher[] => [
	{ matchKey: Messages.Matches.Guild, description: `I will replace this with ${guildData?.name}` },
	{ matchKey: Messages.Matches.Member, description: `I will replace this with a mention of the member` },
	{ matchKey: Messages.Matches.MemberName, description: `I will replace this with the username of the member` },
	{ matchKey: Messages.Matches.MemberTag, description: `I will replace this with the unique tag of the member` },
	{ matchKey: Messages.Matches.MemberCount, description: `I will replace this with the amount of members currently in the server` },
	{
		matchKey: Messages.Matches.Position,
		description: `I will replace this with the ordinal position this member has in the server.`
	}
];

export const CONFIGURABLE_MODERATION_EVENTS: Events.Event[] = [
	{ title: 'Ban Added', key: 'banAdd', description: 'This event posts anonymous moderation logs when a user gets banned.' },
	{ title: 'Ban Revoked', key: 'banRemove', description: 'This event posts anonymous moderation logs when a user gets unbanned' }
];

export const CONFIGURABLE_MEMBER_EVENTS: Events.Event[] = [
	{ title: 'Member Join', key: 'memberAdd', description: 'This event posts member logs when a user joins' },
	{ title: 'Member Leave', key: 'memberRemove', description: 'This event posts member logs when a user leaves' },
	{ title: 'Member Role Changes', key: 'memberRoleUpdate', description: "This events posts member logs when a member's roles change" },
	{ title: 'Member Name Changes', key: 'memberNameUpdate', description: 'This events posts member logs when a member changes their name' }
];

export const CONFIGURABLE_MESSAGE_EVENTS: Events.Event[] = [
	{
		title: 'Message Edit',
		key: 'messageEdit',
		description:
			'This event logs to the Message Logs channel when a message is edited. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Message Delete',
		key: 'messageDelete',
		description:
			'This event logs to the Message Logs channel when a message is deleted. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Twemoji Reactions',
		key: 'twemoji-reactions',
		description:
			'This event posts messages whenever a member reacts to a message with a twemoji, they will be send to the Reaction Logs channel'
	}
];

export const DISABLED_CHANNELS: Channels.Channel = {
	name: 'Disabled Channels',
	description: [
		'A list of channels for disabled commands, for example,',
		'setting up a channel called general will forbid all users',
		'from using my commands there. Moderators+ override this',
		'purposedly to allow them to moderate without switching channels.'
	].join(' '),
	key: 'spam'
};

export const CHANNELS: Channels.Channel[] = [
	{ name: 'Announcements', description: 'The channel for announcements', key: 'announcements' },
	{ name: 'Greetings', description: 'The channel I will use to send greetings', key: 'greeting' },
	{ name: 'Farewells', description: 'The channel I will use to send farewells', key: 'farewell' },
	{ name: 'Spam', description: 'The channel for me to redirect users to when they use commands I consider spammy.', key: 'spam' }
];

export const LOGGING_CHANNELS: Channels.Channel[] = [
	{ name: 'Message Logs', description: 'The channel for (non-NSFW) message logs', key: 'message-logs' },
	{
		name: 'Member Logs',
		description: 'The channel for member logs, once enabled, I will post all member related events there.',
		key: 'member-logs'
	},
	{
		name: 'Moderation Logs',
		description: 'The channel for moderation logs, once enabled, I will post all my moderation cases there.',
		key: 'moderation-logs'
	},
	{
		name: 'NSFW Logs',
		description: 'The channel for NSFW message logs, same requirement as normal message logs, but will only send NSFW messages.',
		key: 'nsfw-message-logs'
	},
	{ name: 'Image Logs', description: 'The channel I will use to re-upload all images I see.', key: 'image-logs' },
	{
		name: 'Prune Logs',
		description: 'The channel for prune logs, same requirement as normal mesasge logs, but will only send prune messages.',
		key: 'prune-logs'
	},
	{
		name: 'Reaction Logs',
		description: 'The channel for the reaction logs, same requirement as normal message logs, but will only send message reactions',
		key: 'reaction-logs'
	}
];

export const IGNORE_CHANNELS: Channels.IgnoreChannel[] = [
	{ name: 'All logs', description: 'Channels I should ignore for all types of logging.', key: 'all' },
	{
		name: 'Message delete logs',
		description: 'Channels I should ignore when checking for deleted messages to log.',
		key: 'message-delete'
	},
	{ name: 'Message edit logs', description: 'Channels I should ignore when checking for edited messags to log.', key: 'message-edit' },
	{ name: 'Reaction add logs', description: 'Channels I should ignore when checking for added reactions.', key: 'reaction-add' }
];
