import { DiscordSnowflake } from '@sapphire/snowflake';
import type {
	APIChannel,
	APIEmoji,
	APIGuildCategoryChannel,
	APIGuildVoiceChannel,
	APIOverwrite,
	APITextChannel,
	APIGuildForumChannel,
	APIDMChannel,
	Locale,
	APIGroupDMChannel,
	APIGuildStageVoiceChannel,
	APIGuild,
	APIGuildMember,
	APINewsChannel,
	APIThreadChannel,
	APIUser,
	APIRole,
	APIGuildMediaChannel
} from 'discord-api-types/v10';
import { GuildFeature, ChannelType } from 'discord-api-types/v10';
import api from '~~/shared/utils/api';
import type {
	FlattenedDMChannel,
	FlattenedMember,
	FlattenedTextChannel,
	FlattenedVoiceChannel,
	FlattenedUser,
	FlattenedThreadChannel,
	FlattenedAnnouncementChannel,
	FlattenedGuild,
	FlattenedRole,
	FlattenedGuildEmoji,
	FlattenedAnyChannel,
	FlattenedCategoryChannel,
	FlattenedGroupDMChannel,
	FlattenedForumChannel,
	FlattenedMediaChannel,
	FlattenedStageVoiceChannel
} from '~~/shared/types';
import { lazy } from '@sapphire/utilities';

// #region Guild

export function flattenGuild(
	guild: APIGuild & {
		channels: Exclude<APIChannel, APIDMChannel | APIGroupDMChannel>[];
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		channels: guild.channels.map((channel) => flattenGuildChannel(channel as any)) ?? [],
		emojis: guild.emojis.map((emoji) => flattenGuildEmoji(guild.id, emoji))
	};
}

// #endregion Guild

// #region Emoji

export function flattenGuildEmoji(guildId: string, emoji: APIEmoji): FlattenedGuildEmoji {
	return {
		animated: emoji.animated ?? false,
		available: emoji.available ?? false,
		id: emoji.id ?? '',
		guildId,
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

export function getParentChannel(channel: APIThreadChannel | Exclude<APIChannel, APIDMChannel | APIGroupDMChannel>) {
	const channelResult = lazy(async () => {
		if (!channel.parent_id) return null;
		const parentChannel = await api().channels.get(channel.parent_id);
		if (parentChannel.type !== ChannelType.GuildCategory) return null;
		return flattenChannelCategory(parentChannel as APIGuildCategoryChannel);
	});
	return channelResult;
}

// #endregion Role

// #region Channel

export function flattenChannel(channel: APINewsChannel): FlattenedAnnouncementChannel;
export function flattenChannel(channel: APITextChannel): FlattenedTextChannel;
export function flattenChannel(channel: APIGuildVoiceChannel): FlattenedVoiceChannel;
export function flattenChannel(channel: APIDMChannel): FlattenedDMChannel;
export function flattenChannel(channel: APIThreadChannel): FlattenedThreadChannel;
export function flattenChannel(channel: APIGuildCategoryChannel): FlattenedCategoryChannel;
export function flattenChannel(channel: APIGuildForumChannel): FlattenedForumChannel;
export function flattenChannel(channel: APIGuildMediaChannel): FlattenedMediaChannel;
export function flattenChannel(channel: APIThreadChannel | APIChannel): FlattenedAnyChannel {
	switch (channel.type) {
		case ChannelType.GuildAnnouncement:
			return flattenChannelAnnouncement(channel);
		case ChannelType.GuildText:
			return flattenChannelText(channel);
		case ChannelType.GuildVoice:
			return flattenChannelVoice(channel);
		case ChannelType.GuildStageVoice:
			return flattenChannelStageVoice(channel);
		case ChannelType.DM:
			return flattenChannelDM(channel);
		case ChannelType.GroupDM:
			return flattenChannelGroupDM(channel);
		case ChannelType.GuildCategory:
			return flattenChannelCategory(channel);
		case ChannelType.PublicThread:
		case ChannelType.PrivateThread:
		case ChannelType.AnnouncementThread:
			return flattenChannelThread(channel);

		case ChannelType.GuildForum:
			return flattenChannelForum(channel);

		case ChannelType.GuildMedia:
			return flattenChannelMedia(channel);
		default:
			throw new Error(`Unsupported channel type: unknown`);
	}
}

export function flattenGuildChannel(channel: APINewsChannel): FlattenedAnnouncementChannel;
export function flattenGuildChannel(channel: APITextChannel): FlattenedTextChannel;
export function flattenGuildChannel(channel: APIGuildVoiceChannel): FlattenedVoiceChannel;
export function flattenGuildChannel(channel: APIThreadChannel): FlattenedThreadChannel;
export function flattenGuildChannel(channel: APIGuildCategoryChannel): FlattenedCategoryChannel;
export function flattenGuildChannel(channel: APIGuildForumChannel): FlattenedForumChannel;
export function flattenGuildChannel(channel: APIGuildMediaChannel): FlattenedMediaChannel;
export function flattenGuildChannel(
	channel: APIThreadChannel | Exclude<APIChannel, APIDMChannel | APIGroupDMChannel>
): Exclude<FlattenedAnyChannel, FlattenedDMChannel | FlattenedGroupDMChannel> {
	switch (channel.type) {
		case ChannelType.GuildAnnouncement:
			return flattenChannelAnnouncement(channel);
		case ChannelType.GuildText:
			return flattenChannelText(channel);
		case ChannelType.GuildVoice:
			return flattenChannelVoice(channel);
		case ChannelType.GuildStageVoice:
			return flattenChannelStageVoice(channel);
		case ChannelType.GuildCategory:
			return flattenChannelCategory(channel);
		case ChannelType.PublicThread:
		case ChannelType.PrivateThread:
		case ChannelType.AnnouncementThread:
			return flattenChannelThread(channel);

		case ChannelType.GuildForum:
			return flattenChannelForum(channel);

		case ChannelType.GuildMedia:
			return flattenChannelMedia(channel);
		default:
			throw new Error(`Unsupported channel type: unknown`);
	}
}

function flattenChannelCategory(channel: APIGuildCategoryChannel): FlattenedCategoryChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? null,
		name: channel.name,
		rawPosition: channel.position ?? 0,
		parentId: channel.parent_id ?? null, // Categories cannot have parents,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelAnnouncement(channel: APINewsChannel): FlattenedAnnouncementChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? null,
		name: channel.name,
		lastPinTimestamp: channel.last_pin_timestamp ? Date.parse(channel.last_pin_timestamp) : null,
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
		guildId: channel.guild_id ?? null,
		lastPinTimestamp: channel.last_pin_timestamp ? Date.parse(channel.last_pin_timestamp) : null,
		name: channel.name,
		rawPosition: channel.position ?? 0,
		parentId: channel.parent_id ?? null,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		topic: channel.topic ?? null,
		nsfw: channel.nsfw ?? false,
		rateLimitPerUser: channel.rate_limit_per_user ?? 0,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelVoice(channel: APIGuildVoiceChannel, guildId?: string): FlattenedVoiceChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? guildId ?? null,
		name: channel.name ?? '',
		rawPosition: channel.position ?? 0,
		rtcRegion: channel.rtc_region ?? null,
		videoQualityMode: channel.video_quality_mode ?? 1,
		parentId: channel.parent_id ?? null,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		bitrate: channel.bitrate ?? 64000,
		userLimit: channel.user_limit ?? 0,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelStageVoice(channel: APIGuildStageVoiceChannel, guildId?: string): FlattenedStageVoiceChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? guildId ?? null,
		name: channel.name ?? '',
		rawPosition: channel.position ?? 0,
		rtcRegion: channel.rtc_region ?? null,
		videoQualityMode: channel.video_quality_mode ?? 1,
		parentId: channel.parent_id ?? null,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		bitrate: channel.bitrate ?? 64000,
		userLimit: channel.user_limit ?? 0,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelGroupDM(channel: APIGroupDMChannel): FlattenedGroupDMChannel {
	return {
		id: channel.id,
		type: channel.type,
		applicationId: channel.application_id ?? null,
		ownerId: channel.owner_id ?? null,
		icon: channel.icon ?? null,
		lastMessageId: channel.last_message_id ?? null,
		name: channel.name ?? null,
		recipients: channel.recipients?.map((recipient) => flattenUser(recipient)) ?? null,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id)
	};
}

function flattenChannelForum(channel: APIGuildForumChannel): FlattenedForumChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? null,
		name: channel.name,
		rawPosition: channel.position ?? 0,
		parentId: channel.parent_id ?? null,
		defaultThreadRateLimitPerUser: channel.default_thread_rate_limit_per_user ?? 0,
		lastMessageId: channel.last_message_id ?? null,
		lastPinTimestamp: channel.last_pin_timestamp ? Date.parse(channel.last_pin_timestamp) : null,
		defaultSortOrder: channel.default_sort_order ?? 0,
		defaultAutoArchiveDuration: channel.default_auto_archive_duration ?? 60,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		topic: channel.topic ?? null,
		rateLimitPerUser: channel.rate_limit_per_user ?? 0,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id),
		availableTags:
			channel.available_tags.map((tag) => ({
				emoji: {
					id: tag.emoji_id ?? null,
					name: tag.emoji_name ?? null
				},
				...tag
			})) ?? [],
		defaultReactionEmoji: {
			id: channel.default_reaction_emoji?.emoji_id ?? null,
			name: channel.default_reaction_emoji?.emoji_name ?? null
		}
	};
}

function flattenChannelMedia(channel: APIGuildMediaChannel): FlattenedMediaChannel {
	return {
		id: channel.id,
		type: channel.type,
		guildId: channel.guild_id ?? null,
		name: channel.name,
		rawPosition: channel.position ?? 0,
		parentId: channel.parent_id ?? null,
		defaultThreadRateLimitPerUser: channel.default_thread_rate_limit_per_user ?? 0,
		lastMessageId: channel.last_message_id ?? null,
		lastPinTimestamp: channel.last_pin_timestamp ? Date.parse(channel.last_pin_timestamp) : null,
		defaultSortOrder: channel.default_sort_order ?? 0,
		defaultAutoArchiveDuration: channel.default_auto_archive_duration ?? 60,
		permissionOverwrites: transformPermissionOverwrites(channel.permission_overwrites),
		topic: channel.topic ?? null,
		rateLimitPerUser: channel.rate_limit_per_user ?? 0,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id),
		availableTags:
			channel.available_tags.map((tag) => ({
				...tag,
				emoji: {
					id: tag.emoji_id ?? null,
					name: tag.emoji_name ?? null
				}
			})) ?? [],
		defaultReactionEmoji: {
			id: channel.default_reaction_emoji?.emoji_id ?? null,
			name: channel.default_reaction_emoji?.emoji_name ?? null
		}
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

function flattenChannelThread(channel: APIThreadChannel, guildId?: string): FlattenedThreadChannel {
	return {
		id: channel.id,
		type: channel.type,
		archived: channel.thread_metadata?.archived ?? false,
		archivedTimestamp: channel.thread_metadata?.archive_timestamp ? Date.parse(channel.thread_metadata.archive_timestamp) : null,
		createdTimestamp: DiscordSnowflake.timestampFrom(channel.id),
		guildId: channel.guild_id ?? guildId ?? null,
		name: channel.name,
		parentId: channel.parent_id ?? null,
		ownerId: channel.owner_id ?? null,
		permissionOverwrites: [],
		rawPosition: channel.position ?? 0,
		threadMetadata: channel.thread_metadata
			? {
					archived: channel.thread_metadata.archived,
					autoArchiveDuration: channel.thread_metadata.auto_archive_duration,
					archiveTimestamp: channel.thread_metadata.archive_timestamp,
					locked: channel.thread_metadata.locked
				}
			: null,
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
