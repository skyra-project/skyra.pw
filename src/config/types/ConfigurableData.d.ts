import type { PickByValue } from 'utility-types';
import type {
	Channels as GuildChannels,
	Events as GuildEvents,
	IgnoreChannels as GuildIgnoreChannels,
	Messages as GuildMessages,
	Roles as GuildRoles,
	SuggestionActions,
	SuggestionEmojis
} from './GuildSettings';

export namespace Suggestions {
	export interface OnAction {
		title: string;
		key: keyof SuggestionActions;
		description: string;
	}

	export interface Emoji {
		title: string;
		key: keyof SuggestionEmojis;
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
		key: keyof PickByValue<GuildRoles, string | string[] | boolean>;
	}
}

export namespace Moderation {
	export interface Message {
		name: string;
		description: string;
		key: keyof PickByValue<GuildMessages, boolean>;
	}
}

export namespace Messages {
	export interface Message {
		name: string;
		placeholder: string;
		tooltipText: string;
		key: keyof PickByValue<GuildMessages, string>;
	}

	export interface Matcher {
		matchKey: Matches;
		description: string;
	}

	export enum Matches {
		Guild = '%GUILD%',
		Member = '%MEMBER%',
		MemberName = '%MEMBERNAME%',
		MemberTag = '%MEMBERTAG%',
		MemberCount = '%MEMBERCOUNT%',
		Position = '%POSITION%'
	}
}

export namespace Events {
	export interface Event {
		title: string;
		key: keyof GuildEvents;
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
		key: keyof PickByValue<GuildChannels, string>;
		description: string;
	}

	export interface IgnoreChannel {
		name: string;
		key: keyof GuildIgnoreChannels;
		description: string;
	}
}
