import type {
	APIEmoji,
	APIGuild,
	APIGuildChannel,
	APIGuildForumTag,
	ChannelFlags,
	ChannelType,
	RESTGetAPICurrentUserConnectionsResult,
	RESTGetAPICurrentUserGuildsResult,
	RESTGetAPICurrentUserResult,
	Snowflake,
	SortOrderType,
	ThreadAutoArchiveDuration,
	ThreadChannelType,
	VideoQualityMode
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

//#region Guild
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

//#endregion

//#region Emoji
export interface FlattenedEmoji extends Pick<APIEmoji, 'animated' | 'available' | 'id' | 'managed' | 'name'> {
	animated: boolean;

	available: boolean;

	id: string;

	managed: boolean;

	name: string | null;

	require_colons: boolean;

	roles: FlattenedRole[];
}

export interface FlattenedGuildEmoji extends FlattenedEmoji {
	guildId: string;
}

//#endregion

//#region Guild Role
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

//#endregion

export interface FlattenedPartialChannel {
	id: string;
	createdTimestamp: number;
}

export interface FlattenedBaseChannel<T extends GuildChannelTypeWithThreads> extends FlattenedPartialChannel {
	type: T;
	flags?: ChannelFlags;
}

export interface FlattenedGuildTextBasedChannel<T extends GuildChannelTypeWithThreads> extends FlattenedGuildChannel<T> {
	lastMessageId?: Snowflake | null;
	lastPinTimestamp: number | null;
	rateLimitPerUser?: number;
}

// #region  Guild Channels

export interface FlattenedGuildChannel<T extends GuildChannelTypeWithThreads = GuildChannelTypeWithThreads> extends FlattenedBaseChannel<T> {
	guildId: string | null;
	name: string;
	parentId: string | null;
	permissionOverwrites: [string, { id: string; type: string; deny: number; allow: number }][];
	rawPosition: number;
}

export interface FlattenedBaseVoiceChannel<T extends ChannelType.GuildStageVoice | ChannelType.GuildVoice>
	extends FlattenedGuildChannel<T>,
		Omit<FlattenedGuildTextBasedChannel<T>, 'lastPinTimestamp' | 'name'> {
	bitrate: number;
	userLimit: number;
	rtcRegion: string | null;
	videoQualityMode: VideoQualityMode;
}

export type GuildChannelType =
	| ChannelType.GuildAnnouncement
	| ChannelType.GuildText
	| ChannelType.GuildCategory
	| ChannelType.GuildStageVoice
	| ChannelType.GuildVoice
	| ChannelType.GuildMedia
	| ChannelType.GuildForum
	| ChannelType.GuildNews;

export type GuildChannelTypeWithThreads = GuildChannelType | ThreadChannelType;

export type BaseAPIGuildChannel = APIGuildChannel<GuildChannelTypeWithThreads>;

export interface FlattenedAnnouncementChannel extends FlattenedGuildTextBasedChannel<ChannelType.GuildAnnouncement> {
	nsfw: boolean;
	guildId: string | null;
	topic: string | null;
}

export interface FlattenedTextChannel extends FlattenedGuildTextBasedChannel<ChannelType.GuildText> {
	nsfw: boolean;
	guildId: string | null;
	topic: string | null;
}

export type FlattenedCategoryChannel = FlattenedGuildChannel<ChannelType.GuildCategory>;

export type FlattenedStageVoiceChannel = FlattenedBaseVoiceChannel<ChannelType.GuildStageVoice>;

export type FlattenedVoiceChannel = FlattenedBaseVoiceChannel<ChannelType.GuildVoice>;

//#region Forum and Media Channels
export interface FlattenedThreadOnlyChannel<T extends ChannelType.GuildForum | ChannelType.GuildMedia> extends FlattenedGuildChannel<T> {
	topic: string | null;
	lastMessageId: Snowflake | null;
	rateLimitPerUser: number;
	lastPinTimestamp: number | null;
	defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
	availableTags: FlattenedGuildForumTag[];
	defaultThreadRateLimitPerUser: number;
	defaultReactionEmoji: FlattenedEmojiGuildForumTag | null;
	defaultSortOrder: SortOrderType | null;
}

export interface FlattenedGuildForumTag extends Exclude<APIGuildForumTag, 'emoji_id' | 'emoji_name'> {
	emoji: FlattenedEmojiGuildForumTag;
}
export interface FlattenedEmojiGuildForumTag {
	id: string | null;
	name: string | null;
}
//#endregion

export interface FlattenedBaseThreadChannel<T extends ThreadChannelType> extends Pick<FlattenedBaseChannel<T>, 'id' | 'createdTimestamp'> {
	type: ThreadChannelType;
	archived: boolean;
	archivedTimestamp: number | null;
	guildId: string | null;
	name: string;
	parentId: string | null;
	ownerId: string | null;
	permissionOverwrites: [string, { id: string; type: string; deny: number; allow: number }][];
	rateLimitPerUser: number | null;
	threadMetadata: {
		archived: boolean;
		autoArchiveDuration: ThreadAutoArchiveDuration;
		archiveTimestamp: string;
		locked: boolean;
	} | null;
	rawPosition: number | null;
}

export type FlattenedAnnouncementThreadChannel = FlattenedBaseThreadChannel<ChannelType.AnnouncementThread>;

export type FlattenedPublicThreadChannel = FlattenedBaseThreadChannel<ChannelType.PublicThread>;

export type FlattenedPrivateThreadChannel = FlattenedBaseThreadChannel<ChannelType.PrivateThread>;

export type FlattenedThreadChannel = FlattenedAnnouncementThreadChannel | FlattenedPublicThreadChannel | FlattenedPrivateThreadChannel;

export type FlattenedForumChannel = FlattenedThreadOnlyChannel<ChannelType.GuildForum>;

export type FlattenedMediaChannel = FlattenedThreadOnlyChannel<ChannelType.GuildMedia>;
export interface FlattenedDMChannel extends FlattenedPartialChannel {
	type: ChannelType.DM;
	recipient: string | null;
}

export interface FlattenedGroupDMChannel extends FlattenedPartialChannel {
	type: ChannelType.GroupDM;
	icon: string | null;
	name: string | null;
	ownerId: string | null;
	recipients: FlattenedUser[] | null;
	lastMessageId: string | null;
	applicationId: string | null;
}

export type FlattenedAnyChannel =
	| FlattenedAnnouncementChannel
	| FlattenedTextChannel
	| FlattenedVoiceChannel
	| FlattenedDMChannel
	| FlattenedGroupDMChannel
	| FlattenedThreadChannel
	| FlattenedForumChannel
	| FlattenedMediaChannel
	| FlattenedCategoryChannel
	| FlattenedStageVoiceChannel;
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
