import { DiscordSnowflake } from '@sapphire/snowflake';
import type {
	APIChannel,
	APIEmoji,
	APIGuildVoiceChannel,
	APIOverwrite,
	APIPartialChannel,
	APITextChannel,
	Locale
	// eslint-disable-next-line import/no-duplicates
} from 'discord-api-types/v10';
import {
	GuildFeature,
	type APIDMChannel,
	type APIGuild,
	type APIGuildMember,
	type APINewsChannel,
	type APIThreadChannel,
	type APIUser,
	type APIRole
	// eslint-disable-next-line import/no-duplicates
} from 'discord-api-types/v10';
import { ChannelType } from 'discord-api-types/v10';
import type {
	FlattenedChannel,
	FlattenedDMChannel,
	FlattenedGuildChannel,
	FlattenedMember,
	FlattenedTextChannel,
	FlattenedVoiceChannel,
	FlattenedUser,
	FlattenedThreadChannel,
	FlattenedNewsChannel,
	FlattenedGuild,
	FlattenedRole
} from '../../app/shared/types';

// #region Guild

export function flattenGuild(
	guild: APIGuild & {
		channels: APIChannel[];
	}
): FlattenedGuild {
	return {
		afkChannelId: guild.afk_channel_id,
		afkTimeout: guild.afk_timeout,
		applicationId: guild.application_id,
		approximateMemberCount: guild.approximate_member_count ?? 0,
		approximatePresenceCount: guild.approximate_presence_count ?? 0,
		banner: guild.banner,
		defaultMessageNotifications: guild.default_message_notifications,
		description: guild.description,
		widgetEnabled: guild.widget_enabled ?? false,
		explicitContentFilter: guild.explicit_content_filter,
		features: guild.features,
		icon: guild.icon,
		id: guild.id,
		joinedTimestamp: Date.now(), // Add missing property
		mfaLevel: guild.mfa_level,
		name: guild.name,
		acronym: guild.name
			.replace(/'s /g, ' ')
			.replace(/\w+/g, (e) => e[0])
			.replace(/\s/g, ''), // Fix misplaced comma
		ownerId: guild.owner_id,
		partnered: guild.features.includes(GuildFeature.Partnered),
		preferredLocale: guild.preferred_locale as Locale,
		premiumSubscriptionCount: guild.premium_subscription_count ?? 0,
		premiumTier: guild.premium_tier,
		roles: guild.roles.map((role) => flattenRole(guild.id, role)),
		splash: guild.splash,
		systemChannelId: guild.system_channel_id,
		vanityURLCode: guild.vanity_url_code,
		verificationLevel: guild.verification_level,
		verified: guild.features.includes(GuildFeature.Verified),
		channels: [], // .map(channel => flattenChannel(channel)), // Add missing property
		emojis: guild.emojis.map((emoji) => flattenEmoji(guild.id, emoji)) // Add missing property
	};
}

// #endregion Guild

// #region Emoji

export function flattenEmoji(guildId: string, emoji: APIEmoji): FlattenedEmoji {
	return {
		animated: emoji.animated ?? false,
		available: emoji.available ?? false,
		id: emoji.id ?? '',
		managed: emoji.managed ?? false,
		name: emoji.name ?? null,
		require_colons: Boolean(emoji.require_colons),
		roles: []
	};
}

// #region Role

// Update flattenRole function to accept guildId parameter
export function flattenRole(guildId: string, role: APIRole): FlattenedRole {
	return {
		id: role.id,
		name: role.name,
		color: role.color,
		hoist: role.hoist,
		rawPosition: role.position,
		permissions: role.permissions,
		managed: role.managed,
		mentionable: role.mentionable,
		icon: role.icon ?? null,
		guildId: guildId ?? null // Add guildId with null fallback
	};
}

function transformPermissionOverwrites(
	overwrites: APIOverwrite[] | undefined
): [string, { id: string; type: string; deny: number; allow: number }][] {
	return (overwrites ?? []).map((overwrite) => [
		overwrite.id,
		{
			id: overwrite.id,
			type: String(overwrite.type),
			deny: Number(overwrite.deny),
			allow: Number(overwrite.allow)
		}
	]);
}

// #endregion Role

// #region Channel

export function flattenChannel(channel: APINewsChannel): FlattenedNewsChannel;
export function flattenChannel(channel: APITextChannel): FlattenedTextChannel;
export function flattenChannel(channel: APIGuildVoiceChannel): FlattenedVoiceChannel;
export function flattenChannel(channel: APIDMChannel): FlattenedDMChannel;
export function flattenChannel(channel: APIThreadChannel): FlattenedThreadChannel;
export function flattenChannel(channel: APIPartialChannel): FlattenedChannel;
export function flattenChannel(channel: APIPartialChannel | APIThreadChannel): FlattenedChannel {
	if (channel.type === ChannelType.GuildAnnouncement) return flattenChannelAnnouncement(channel as APINewsChannel);
	if (channel.type === ChannelType.GuildText) return flattenChannelText(channel as APITextChannel);
	if (channel.type === ChannelType.GuildVoice) return flattenChannelVoice(channel as APIGuildVoiceChannel);
	if ('thread_metadata' in channel) return flattenChannelThread(channel as APIThreadChannel);
	if (channel.type === ChannelType.DM) return flattenChannelDM(channel as APIDMChannel);
	return {
		id: channel.id,
		type: channel.type,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	} as FlattenedGuildChannel;
}

function flattenChannelAnnouncement(channel: APINewsChannel): FlattenedNewsChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? '',
		name: channel.name ?? '',
		rawPosition: channel.position ?? 0,
		parentId: channel.parent_id ?? null,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		topic: channel.topic ?? null,
		nsfw: channel.nsfw ?? false,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelText(channel: APITextChannel): FlattenedTextChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? '',
		name: channel.name ?? '',
		rawPosition: channel.position ?? 0,
		parentId: channel.parent_id ?? null,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		topic: channel.topic ?? null,
		nsfw: channel.nsfw ?? false,
		rateLimitPerUser: channel.rate_limit_per_user ?? 0,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelVoice(channel: APIGuildVoiceChannel): FlattenedVoiceChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? '',
		name: channel.name ?? '',
		rawPosition: channel.position ?? 0,
		parentId: channel.parent_id ?? null,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		bitrate: channel.bitrate ?? 64000,
		userLimit: channel.user_limit ?? 0,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelDM(channel: APIDMChannel): FlattenedDMChannel {
	return {
		id: channel.id,
		type: channel.type,
		recipient: channel.recipients?.[0]?.id ?? null,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelThread(channel: APIThreadChannel): FlattenedThreadChannel {
	return {
		id: channel.id,
		type: channel.type,
		archived: channel.thread_metadata?.archived ?? false,
		archivedTimestamp: channel.thread_metadata?.archive_timestamp ? Date.parse(channel.thread_metadata.archive_timestamp) : null,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id),
		guildId: channel.guild_id ?? '',
		name: channel.name ?? '',
		parentId: channel.parent_id ?? null,
		permissionOverwrites: [],
		rawPosition: null,
		rateLimitPerUser: channel.rate_limit_per_user ?? null
	};
}

// #endregion Channel

// #region User

export function flattenUser(user: APIUser): FlattenedUser {
	return {
		id: user.id,
		bot: user.bot ?? false,
		username: user.username,
		globalName: user.global_name,
		discriminator: user.discriminator,
		avatar: user.avatar
	};
}

// #endregion User

// #region Member

export function flattenMember(member: APIGuildMember, guild: APIGuild): FlattenedMember {
	return {
		id: member.user.id,
		guildId: guild.id,
		user: flattenUser(member.user),
		joinedTimestamp: Date.parse(member.joined_at),
		premiumSinceTimestamp: member.premium_since ? Date.parse(member.premium_since) : null,
		roles: member.roles
			.map((roleId) => {
				const role = guild.roles.find((r) => r.id === roleId);
				return role ? flattenRole(guild.id, role) : null;
			})
			.filter((role): role is FlattenedRole => role !== null)
	};
}

// #endregion Member
