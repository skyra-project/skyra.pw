import type { LoginData } from '@sapphire/plugin-api';
import type { APIGuild, ChannelType } from 'discord-api-types/v10';

export interface TransformedLoginData extends LoginData {
	transformedGuilds?: OauthFlattenedGuild[];
}

interface FlattenedGuild {
	afkChannelId: APIGuild['afk_channel_id'];
	afkTimeout: APIGuild['afk_timeout'];
	applicationId: APIGuild['application_id'];
	approximateMemberCount: NonNullable<APIGuild['approximate_member_count']>;
	approximatePresenceCount: NonNullable<APIGuild['approximate_presence_count']>;
	available: boolean;
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
	manageable: boolean;
	permissions?: number;
	roles: FlattenedRole[];
	skyraIsIn: boolean;
}

interface FlattenedEmoji {
	animated: boolean;

	available: boolean;

	id: string;

	managed: boolean;

	name: string;

	require_colons: boolean;

	roles: any[];
}

interface FlattenedRole {
	color: number;

	guildId: string;

	hoist: boolean;

	id: string;

	managed: boolean;

	mentionable: boolean;

	name: string;

	permissions: string;

	rawPosition: number;
}

interface FlattenedChannel {
	createdTimestamp: number;

	id: string;

	type: ChannelType;
}

interface FlattenedGuildChannel extends FlattenedChannel {
	bitrate?: number;

	guildId: string;

	name: string;

	nsfw?: boolean;

	parentId: string | null;

	permissionOverwrites?: [string, { id: string; type: string; deny: number; allow: number }][];

	rateLimitPerUser?: number;

	rawPosition: number;

	topic?: string | null;

	type: ChannelType;

	userLimit?: number;
}

export interface FlattenedNewsChannel extends FlattenedGuildChannel {
	nsfw: boolean;

	topic: string | null;

	type: ChannelType.GuildAnnouncement;
}

export interface FlattenedTextChannel extends FlattenedGuildChannel {
	nsfw: boolean;

	rateLimitPerUser: number;

	topic: string | null;

	type: ChannelType.GuildText;
}

export interface FlattenedVoiceChannel extends FlattenedGuildChannel {
	bitrate: number;

	type: ChannelType.GuildVoice;

	userLimit: number;
}

export interface FlattenedDMChannel extends FlattenedChannel {
	recipient: string;

	type: ChannelType.DM;
}

interface FlattenedUser {
	avatar: string | null;

	discriminator: string;

	flags: number;

	id: string;

	locale: string;

	mfa_enabled: boolean;

	premium_type: number;

	public_flags: number;

	username: string;
}

export interface FlattenedMember {
	guildId: string;

	id: string;

	joinedTimestamp: number | null;

	premiumSinceTimestamp: number | null;

	roles: FlattenedRole[];

	user: FlattenedUser;
}

export interface FlattenedCommand {
	category: string;

	description: string;

	extendedHelp: ExtendedHelp;

	guarded: boolean;

	name: string;

	permissionLevel: number;

	preconditions: Preconditions;
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

interface PartialOauthFlattenedGuild extends Omit<FlattenedGuild, 'joinedTimestamp' | 'ownerId' | 'region' | 'features'> {
	joinedTimestamp: FlattenedGuild['joinedTimestamp'] | null;

	ownerId: FlattenedGuild['ownerId'] | null;
}

interface OauthFlattenedGuild extends PartialOauthFlattenedGuild {
	manageable: boolean;

	permissions: number;

	skyraIsIn: boolean;
}
