// TODO: Remove LGTM ignore comments when they start using TS 4.1

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
	} // lgtm [js/syntax-error]
} // lgtm [js/syntax-error]

export namespace Roles {
	export interface Role {
		name: string;
		tooltip: string;
		key: `roles.${ // lgtm [js/syntax-error]
			| 'admin' // lgtm [js/syntax-error]
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
} // lgtm [js/syntax-error]

export namespace Moderation {
	export interface Message {
		name: string;
		description: string;
		key: `messages.${ // lgtm [js/syntax-error]
			| 'announcement-embed' // lgtm [js/syntax-error]
			| 'moderation-dm'
			| 'moderation-reason-display'
			| 'moderation-message-display'
			| 'moderation-auto-delete'
			| 'moderator-name-display'
		}`;
	}
} // lgtm [js/syntax-error]

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
} // lgtm [js/syntax-error]

export namespace Events {
	export interface Event {
		title: string;
		key: `events.${ // lgtm [js/syntax-error]
			| 'banAdd' // lgtm [js/syntax-error]
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
} // lgtm [js/syntax-error]

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
			| 'announcements' // lgtm [js/syntax-error]
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
			| 'all' // lgtm [js/syntax-error]
			| 'message-delete'
			| 'message-edit'
			| 'reaction-add'
		}`;
		description: string;
	} // lgtm [js/syntax-error]
} // lgtm [js/syntax-error]
