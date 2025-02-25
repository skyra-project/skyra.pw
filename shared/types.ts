import type {
	APIEmoji,
	APIGuild,
	ChannelType,
	RESTGetAPICurrentUserConnectionsResult,
	RESTGetAPICurrentUserGuildsResult,
	RESTGetAPICurrentUserResult,
	ThreadChannelType
} from 'discord-api-types/v10';

export interface PartialOauthFlattenedGuild extends Omit<FlattenedGuild, 'joinedTimestamp' | 'ownerId' | 'features'> {
	joinedTimestamp: FlattenedGuild['joinedTimestamp'] | null;
	ownerId: FlattenedGuild['ownerId'] | null;
}

export interface OauthFlattenedGuild extends PartialOauthFlattenedGuild {
	permissions: number;
	manageable: boolean;
	wolfstarIsIn: boolean;
}

export interface OauthFlattenedUser {
	user: FlattenedUser;
	guilds: OauthFlattenedGuild[];
}

export interface LoginData {
	/**
	 * The user data, defined when the `'identify'` scope is defined.
	 *
	 */
	user?: RESTGetAPICurrentUserResult | null;
	/**
	 * The guilds data, defined when the `'guilds'` scope is defined.
	 *
	 */
	guilds?: RESTGetAPICurrentUserGuildsResult | null;
	/**
	 * The connections data, defined when the `'connections'` scope is defined.
	 *
	 */
	connections?: RESTGetAPICurrentUserConnectionsResult | null;
}

export interface TransformedLoginData extends LoginData {
	transformedGuilds?: OauthFlattenedGuild[];
}

export interface FlattenedGuild {
	afkChannelId: APIGuild['afk_channel_id'];
	afkTimeout: APIGuild['afk_timeout'];
	applicationId: APIGuild['application_id'];
	approximateMemberCount: NonNullable<APIGuild['approximate_member_count']>;
	approximatePresenceCount: NonNullable<APIGuild['approximate_presence_count']>;
	banner: APIGuild['banner'];
	defaultMessageNotifications: APIGuild['default_message_notifications'];
	description: APIGuild['description'];
	widgetEnabled: NonNullable<APIGuild['widget_enabled']>;
	explicitContentFilter: APIGuild['explicit_content_filter'];
	features: APIGuild['features'];
	icon: APIGuild['icon'];
	id: APIGuild['id'];
	joinedTimestamp: number;
	mfaLevel: APIGuild['mfa_level'];
	name: APIGuild['name'];
	acronym: string;
	ownerId: APIGuild['owner_id'];
	partnered: boolean;
	preferredLocale: APIGuild['preferred_locale'];
	premiumSubscriptionCount: NonNullable<APIGuild['premium_subscription_count']>;
	premiumTier: APIGuild['premium_tier'];
	splash: APIGuild['splash'];
	systemChannelId: APIGuild['system_channel_id'];
	vanityURLCode: APIGuild['vanity_url_code'];
	verificationLevel: APIGuild['verification_level'];
	verified: boolean;
	channels: FlattenedGuildChannel[];
	emojis: FlattenedEmoji[];
	permissions?: number;
	roles: FlattenedRole[];
}

export interface FlattenedEmoji extends Pick<APIEmoji, 'animated' | 'available' | 'id' | 'managed' | 'name'> {
	animated: boolean;

	available: boolean;

	id: string;

	managed: boolean;

	name: string | null;

	require_colons: boolean;

	roles: FlattenedRole[];
}

export interface FlattenedRole {
	color: number;
	guildId: string;
	hoist: boolean;
	id: string;
	icon: string | null;
	managed: boolean;
	mentionable: boolean;
	name: string;
	permissions: string;
	rawPosition: number;
}

export interface FlattenedChannel {
	id: string;
	type: ChannelType;
	createdTimestamp: number;
}

// #region  Guild Channels

export interface FlattenedGuildChannel extends FlattenedChannel {
	type: ChannelType;
	guildId: string;
	name: string;
	parentId: string | null;
	permissionOverwrites: [string, { id: string; type: string; deny: number; allow: number }][];
	rawPosition: number;
}

export interface FlattenedNewsChannel extends FlattenedGuildChannel {
	type: ChannelType.GuildAnnouncement;
	nsfw: boolean;
	topic: string | null;
}

export interface FlattenedTextChannel extends FlattenedGuildChannel {
	type: ChannelType.GuildText;
	nsfw: boolean;
	rateLimitPerUser: number;
	topic: string | null;
}

export interface FlattenedThreadChannel extends Pick<FlattenedGuildChannel, 'id' | 'createdTimestamp'> {
	type: ThreadChannelType;
	archived: boolean;
	archivedTimestamp: number | null;
	guildId: string;
	name: string;
	parentId: string | null;
	permissionOverwrites: [string, { id: string; type: string; deny: number; allow: number }][];
	rateLimitPerUser: number | null;
	rawPosition: number | null;
}

export interface FlattenedNewsThreadChannel extends FlattenedChannel {
	type: ChannelType.AnnouncementThread;
}

export interface FlattenedPublicThreadChannel extends FlattenedChannel {
	type: ChannelType.PublicThread;
}

export interface FlattenedPrivateThreadChannel extends FlattenedChannel {
	type: ChannelType.PrivateThread;
}

export interface FlattenedVoiceChannel extends FlattenedGuildChannel {
	type: ChannelType.GuildVoice;
	bitrate: number;
	userLimit: number;
}

export interface FlattenedDMChannel extends FlattenedChannel {
	type: ChannelType.DM;
	recipient: string | null;
}

// #endregion

// #region  User

export interface FlattenedUser {
	avatar: string | null;

	discriminator: string;

	globalName: string | null;

	bot: boolean | undefined;

	id: string;

	username: string;
}

// #endregion

// #region  Guild Member

export interface FlattenedMember {
	guildId: string;

	id: string;

	joinedTimestamp: number | null;

	premiumSinceTimestamp: number | null;

	roles: FlattenedRole[];

	user: FlattenedUser;
}

// #endregion

// #region Command

export interface FlattenedCommand {
	category: string;

	description: string;

	extendedHelp: ExtendedHelp;

	guarded: boolean;

	name: string;

	permissionLevel: number;

	preconditions: Preconditions;
}
export interface Command extends FlattenedCommand {
	aliases: string[];
	subCategory: string;
}

export interface Preconditions {
	entries: PreconditionsEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionsEntry {
	entries: PreconditionEntryEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionEntryEntry {
	context: unknown;

	name: string;
}

interface ExtendedHelp {
	examples?: (null | string)[];

	explainedUsage?: [string, string][];

	extendedHelp?: string;

	possibleFormats?: [string, string][];

	reminder?: string;

	usages?: string[];
}

// #endregion
