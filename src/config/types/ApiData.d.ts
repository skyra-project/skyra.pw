import type { TrackInfo } from '@skyra/audio';
import type { Guild } from 'discord.js';

export interface DashboardPack {
	user: DashboardUserPack | null;
}

export interface DashboardUserPack extends FlattenedUser {
	guilds?: FlattenedGuild[];
}

export interface FlattenedGuild
	extends Pick<
		Guild,
		| 'afkChannelID'
		| 'afkTimeout'
		| 'applicationID'
		| 'approximateMemberCount'
		| 'approximatePresenceCount'
		| 'available'
		| 'banner'
		| 'defaultMessageNotifications'
		| 'description'
		| 'embedEnabled'
		| 'explicitContentFilter'
		| 'features'
		| 'icon'
		| 'id'
		| 'joinedTimestamp'
		| 'mfaLevel'
		| 'name'
		| 'ownerID'
		| 'partnered'
		| 'preferredLocale'
		| 'premiumSubscriptionCount'
		| 'premiumTier'
		| 'region'
		| 'splash'
		| 'systemChannelID'
		| 'vanityURLCode'
		| 'verificationLevel'
		| 'verified'
	> {
	channels: FlattenedGuildChannel[];
	roles: FlattenedRole[];
	emojis: FlattenedEmoji[];
	skyraIsIn: boolean;
	manageable: boolean;
	permissions?: number;
}

export type PublicFlattenedGuild = Pick<FlattenedGuild, 'id' | 'name' | 'icon' | 'vanityURLCode' | 'description'>;

export interface PublicFlattenedMusic {
	guildData: PublicFlattenedGuild;
	currentlyPlaying?: TrackInfo;
	queueLength: number;
}

export interface FlattenedEmoji {
	name: string;
	roles: any[];
	id: string;
	require_colons: boolean;
	managed: boolean;
	animated: boolean;
	available: boolean;
}

export interface FlattenedRole {
	id: string;
	guildID: string;
	name: string;
	color: number;
	hoist: boolean;
	rawPosition: number;
	permissions: number;
	managed: boolean;
	mentionable: boolean;
}

export interface FlattenedChannel {
	id: string;
	type: 'dm' | 'text' | 'voice' | 'category' | 'news' | 'store' | 'unknown';
	createdTimestamp: number;
}

export interface FlattenedGuildChannel extends FlattenedChannel {
	type: 'text' | 'voice' | 'category' | 'news' | 'store' | 'unknown';
	guildID: string;
	name: string;
	rawPosition: number;
	parentID: string | null;
	permissionOverwrites?: [string, { id: string; type: string; deny: number; allow: number }][];
	topic?: string | null;
	nsfw?: boolean;
	rateLimitPerUser?: number;
	bitrate?: number;
	userLimit?: number;
}

export interface FlattenedNewsChannel extends FlattenedGuildChannel {
	type: 'news';
	topic: string | null;
	nsfw: boolean;
}

export interface FlattenedTextChannel extends FlattenedGuildChannel {
	type: 'text';
	topic: string | null;
	nsfw: boolean;
	rateLimitPerUser: number;
}

export interface FlattenedVoiceChannel extends FlattenedGuildChannel {
	type: 'voice';
	bitrate: number;
	userLimit: number;
}

export interface FlattenedDMChannel extends FlattenedChannel {
	type: 'dm';
	recipient: string;
}

export interface FlattenedUser {
	id: string;
	bot: boolean;
	username: string;
	discriminator: string;
	avatar: string | null;
	avatarURL: string | null;
}

export interface FlattenedMember {
	id: string;
	guildID: string;
	user: FlattenedUser;
	joinedTimestamp: number | null;
	premiumSinceTimestamp: number | null;
	roles: FlattenedRole[];
}

export interface FlattenedCommand {
	bucket: number;
	category: string;
	cooldown: number;
	description: string;
	extendedHelp: LanguageHelpDisplayOptions;
	guarded: boolean;
	guildOnly: boolean;
	name: string;
	permissionLevel: number;
	requiredPermissions: string[];
	usage: string;
}

export interface LanguageHelpDisplayOptions {
	extendedHelp?: string[] | string;
	explainedUsage?: Array<[string, string]>;
	possibleFormats?: Array<[string, string]>;
	examples?: string[];
	reminder?: string[] | string;
	multiline?: boolean;
}

export interface OauthFlattenedUser extends FlattenedUser {
	guilds: OauthFlattenedGuild[];
}

interface PartialOauthFlattenedGuild extends Omit<FlattenedGuild, 'joinedTimestamp' | 'ownerID' | 'region'> {
	joinedTimestamp: FlattenedGuild['joinedTimestamp'] | null;
	ownerID: FlattenedGuild['ownerID'] | null;
	region: FlattenedGuild['region'] | null;
}

interface OauthFlattenedGuild extends PartialOauthFlattenedGuild {
	permissions: number;
	manageable: boolean;
	skyraIsIn: boolean;
}

type GuildFeatures =
	| 'ANIMATED_ICON'
	| 'BANNER'
	| 'COMMERCE'
	| 'COMMUNITY'
	| 'DISCOVERABLE'
	| 'FEATURABLE'
	| 'INVITE_SPLASH'
	| 'NEWS'
	| 'PARTNERED'
	| 'VANITY_URL'
	| 'VERIFIED'
	| 'VIP_REGIONS'
	| 'WELCOME_SCREEN_ENABLED';
