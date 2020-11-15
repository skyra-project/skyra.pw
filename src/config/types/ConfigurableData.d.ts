// TODO: When LGTM switching to TS 4.1, remove the lgtm ignore comments

export namespace Suggestions {
	export interface OnAction {
		title: string;
		// eslint-disable-next-line prettier/prettier
		key: `suggestions.on-action.${'dm' | 'repost' | 'hide-author'}`; // lgtm [js/syntax-error]
		description: string;
	}

	export interface Emoji {
		title: string;
		key: `suggestions.emojis.${'downvote' | 'upvote'}`; // lgtm [js/syntax-error]
		description: string;
		defaultName: string;
		defaultImage: string;
		defaultId: string;
	}
}

export namespace Roles {
	export interface Role {
		name: string;
		tooltip: string;
		key: `roles.${ // lgtm [js/syntax-error]
			| 'admin'
			| 'initial'
			| 'moderator'
			| 'muted'
			| 'restricted-reaction'
			| 'restricted-embed'
			| 'restricted-attachment'
			| 'restricted-emoji'
			| 'restricted-voice'
			| 'public'
			| 'removeInitial'
			| 'dj'
			| 'subscriber'
		}`
	}
}

export namespace Moderation {
	export interface Message {
		name: string;
		description: string;
		key: `messages.${ // lgtm [js/syntax-error]
			| 'announcement-embed'
			| 'moderation-dm'
			| 'moderation-reason-display'
			| 'moderation-message-display'
			| 'moderation-auto-delete'
			| 'moderator-name-display'
		}`;
	}
}

export namespace Messages {
	export interface Message {
		name: string;
		placeholder: string;
		tooltipText: string;
		key: `messages.${'farewell' | 'greeting' | 'join-dm'}`; // lgtm [js/syntax-error]
	}

	export interface Matcher {
		matchKey: Matches;
		description: string;
	}
}

export namespace Events {
	export interface Event {
		title: string;
		key: `events.${ // lgtm [js/syntax-error]
			| 'banAdd'
			| 'banRemove'
			| 'memberAdd'
			| 'memberRemove'
			| 'memberNameUpdate'
			| 'memberRoleUpdate'
			| 'messageDelete'
			| 'messageEdit'
			| 'twemoji-reactions'
		}`;
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
		key: `channels.${ // lgtm [js/syntax-error]
			| 'announcements'
			| 'greeting'
			| 'farewell'
			| 'greeting'
			| 'member-logs'
			| 'message-logs'
			| 'moderation-logs'
			| 'nsfw-message-logs'
			| 'image-logs'
			| 'prune-logs'
			| 'reaction-logs'
			| 'spam'
		}`;
		description: string;
	}

	export interface IgnoreChannel {
		name: string;
		key: `channels.ignore.${ // lgtm [js/syntax-error]
			| 'all'
			| 'message-delete'
			| 'message-edit'
			| 'reaction-add'
		}`;
		description: string;
	}
}
