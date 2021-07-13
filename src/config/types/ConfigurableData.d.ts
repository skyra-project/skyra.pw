import type { ReactNode } from 'react';

export namespace Suggestions {
	export interface OnAction {
		title: string;
		key: `suggestionsOnAction${'Dm' | 'RePost' | 'HideAuthor'}`;
		description: string;
	}

	export interface Emoji {
		title: string;
		key: `suggestionsEmojis${'DownVote' | 'UpVote'}`;
		description: string;
		defaultName: string;
		defaultImage: `https://cdn.discordapp.com/emojis/${string}.${'gif' | 'png'}`;
		defaultId: string;
	}
}

export namespace Roles {
	export interface Role {
		name: string;
		tooltip: string;
		key: `roles${
			| 'Admin'
			| 'Initial'
			| 'Moderator'
			| 'Muted'
			| 'RestrictedReaction'
			| 'RestrictedEmbed'
			| 'RestrictedAttachment'
			| 'RestrictedEmoji'
			| 'RestrictedVoice'
			| 'Public'
			| 'RemoveInitial'
			| 'Dj'
			| 'Subscriber'}`;
	}
}

export namespace Moderation {
	export interface Message {
		name: string;
		description: string;
		key: `messages${
			| 'AnnouncementEmbed'
			| 'ModerationDm'
			| 'ModerationReasonDisplay'
			| 'ModerationMessageDisplay'
			| 'ModerationAutoDelete'
			| 'ModeratorNameDisplay'}`;
	}
}

export namespace Messages {
	export interface Message {
		name: string;
		placeholder: string;
		tooltipText: NonNullable<ReactNode>;
		key: `messages${'Farewell' | 'Greeting' | 'JoinDM'}`;
	}
}

export namespace Events {
	export interface Event {
		title: string;
		key: `events${'BanAdd' | 'BanRemove' | 'TwemojiReactions'}`;
		description: string;
	}
}

export namespace DisableCommands {
	export interface Command {
		name: string;
		description: string;
		isEnabled: boolean;
		category: string;
	}
}

export namespace General {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export type Form = {
		prefix: string;
	};
}

export namespace CustomCommands {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export type Form = {
		id: string;
		content: string;
		color: string;
		embed: boolean;
	};
}

export namespace Channels {
	export interface Channel {
		name: string;
		key:
			| `channels${'Announcements' | 'Greeting' | 'Farewell' | 'Spam'}`
			| `channelsLogs${
					| 'ChannelCreate'
					| 'ChannelDelete'
					| 'ChannelUpdate'
					| 'EmojiCreate'
					| 'EmojiDelete'
					| 'EmojiUpdate'
					| 'Image'
					| 'MemberAdd'
					| 'MemberRemove'
					| 'MemberNickNameUpdate'
					| 'MemberUserNameUpdate'
					| 'MemberRoleUpdate'
					| 'MessageDelete'
					| 'MessageDeleteNsfw'
					| 'MessageUpdate'
					| 'MessageUpdateNsfw'
					| 'Moderation'
					| 'Prune'
					| 'Reaction'
					| 'RoleCreate'
					| 'RoleDelete'
					| 'RoleUpdate'
					| 'ServerUpdate'}`;
		description: string;
	}

	export interface IgnoreChannel {
		name: string;
		key: `channelsIgnore${'All' | 'MessageDeletes' | 'MessageEdits' | 'ReactionAdds'}`;
		description: string;
	}
}

export namespace Selfmod {
	type SelfmodKeyHelper<P1 extends string[]> = `selfmod${Capitalize<P1[0]>}${P1[1] extends string ? Capitalize<P1[1]> : ''}${P1[2] extends string
		? Capitalize<P1[2]>
		: ''}`;

	type Split<S extends string> = string extends S ? string[] : S extends '' ? [] : S extends `${infer T}.${infer U}` ? [T, ...Split<U>] : [S];

	export type Union =
		| SelfmodKeyHelper<Split<'capitals.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'capitals.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'capitals.maximum'>>
		| SelfmodKeyHelper<Split<'capitals.minimum'>>
		| SelfmodKeyHelper<Split<'invites.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'invites.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'links.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'links.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'messages.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'messages.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'newlines.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'newlines.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'newlines.maximum'>>
		| SelfmodKeyHelper<Split<'reactions.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'reactions.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'filter.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'filter.thresholdDuration'>>;
}
