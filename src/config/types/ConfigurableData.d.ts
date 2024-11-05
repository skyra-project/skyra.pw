export namespace Roles {
	export interface Role {
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
			| 'RemoveInitial'}`;

		name: string;

		tooltip: string;
	}
}

export namespace Moderation {
	export interface Message {
		description: string;

		key: `messages${'ModerationDm' | 'ModerationReasonDisplay' | 'ModerationMessageDisplay' | 'ModerationAutoDelete' | 'ModeratorNameDisplay'}`;

		name: string;
	}
}

export namespace Events {
	export interface Event {
		description: string;

		key: `events${'BanAdd' | 'BanRemove' | 'TwemojiReactions'}`;

		title: string;
	}
}

export namespace DisableCommands {
	export interface Command {
		category: string;

		description: string;

		isEnabled: boolean;

		name: string;
	}
}

export namespace General {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export type Form = {
		prefix: string;
	};
}

export namespace Channels {
	export interface Channel {
		description: string;

		key:
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
					| 'MemberNicknameUpdate'
					| 'MemberUsernameUpdate'
					| 'MemberRolesUpdate'
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

		name: string;
	}

	export interface IgnoreChannel {
		description: string;

		key: `channelsIgnore${'All' | 'MessageDelete' | 'MessageEdit' | 'ReactionAdd'}` | 'messagesIgnoreChannels';

		name: string;
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
