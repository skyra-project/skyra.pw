import type { LoginData } from '@sapphire/plugin-api';
import type { Guild } from 'discord.js';

export interface TransformedLoginData extends LoginData {
	transformedGuilds?: OauthFlattenedGuild[];
}

interface FlattenedGuild
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

interface FlattenedEmoji {
	name: string;
	roles: any[];
	id: string;
	require_colons: boolean;
	managed: boolean;
	animated: boolean;
	available: boolean;
}

interface FlattenedRole {
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

interface FlattenedChannel {
	id: string;
	type: 'dm' | 'text' | 'voice' | 'category' | 'news' | 'store' | 'unknown';
	createdTimestamp: number;
}

interface FlattenedGuildChannel extends FlattenedChannel {
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

interface FlattenedNewsChannel extends FlattenedGuildChannel {
	type: 'news';
	topic: string | null;
	nsfw: boolean;
}

interface FlattenedTextChannel extends FlattenedGuildChannel {
	type: 'text';
	topic: string | null;
	nsfw: boolean;
	rateLimitPerUser: number;
}

interface FlattenedVoiceChannel extends FlattenedGuildChannel {
	type: 'voice';
	bitrate: number;
	userLimit: number;
}

interface FlattenedDMChannel extends FlattenedChannel {
	type: 'dm';
	recipient: string;
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

interface FlattenedMember {
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

interface LanguageHelpDisplayOptions {
	extendedHelp?: string[] | string;
	explainedUsage?: Array<[string, string]>;
	possibleFormats?: Array<[string, string]>;
	examples?: string[];
	reminder?: string[] | string;
	multiline?: boolean;
}

interface PartialOauthFlattenedGuild extends Omit<FlattenedGuild, 'joinedTimestamp' | 'ownerID' | 'region' | 'features'> {
	joinedTimestamp: FlattenedGuild['joinedTimestamp'] | null;
	ownerID: FlattenedGuild['ownerID'] | null;
	region: FlattenedGuild['region'] | null;
}

interface OauthFlattenedGuild extends PartialOauthFlattenedGuild {
	permissions: number;
	manageable: boolean;
	skyraIsIn: boolean;
}
