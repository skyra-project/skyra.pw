import { hasAtLeastOneKeyInMap } from '@sapphire/utilities';
import type { APIGuildMember, RESTAPIPartialCurrentUserGuild, APIGuild } from 'discord-api-types/v10';
import {
	GuildDefaultMessageNotifications,
	GuildExplicitContentFilter,
	GuildMFALevel,
	GuildPremiumTier,
	GuildVerificationLevel,
	Locale,
	PermissionFlagsBits
} from 'discord-api-types/v10';
import { flattenGuild } from '~~/server/utils/ApiTransformers';
import type { FlattenedGuild, LoginData, OauthFlattenedGuild, PartialOauthFlattenedGuild, TransformedLoginData } from '~~/shared/types';
import { PermissionsBits } from '~/utils/bits';
import { readSettings } from '~~/lib/database/settings/functions';
import useApi from '~~/shared/utils/api';

function isAdmin(member: APIGuildMember, roles: readonly string[]): boolean {
	const memberRolePermissions = BigInt((member as unknown as { permissions: string }).permissions);
	return roles.length === 0
		? PermissionsBits.has(memberRolePermissions, PermissionFlagsBits.ManageGuild)
		: hasAtLeastOneKeyInMap(new Map(roles.map((role) => [role, true])), member.roles);
}

export async function canManage(guild: APIGuild, member: APIGuildMember): Promise<boolean> {
	if (guild.owner_id === member.user.id) return true;

	const settings = await readSettings(guild.id);
	return isAdmin(member, settings.rolesAdmin);
}

async function getManageable(id: string, oauthGuild: RESTAPIPartialCurrentUserGuild, guild: APIGuild | undefined): Promise<boolean> {
	if (oauthGuild.owner) return true;
	if (typeof guild === 'undefined') return PermissionsBits.has(BigInt(oauthGuild.permissions), PermissionFlagsBits.ManageGuild);

	const member = await useApi().guilds.getMember(guild.id, id);
	if (!member) return false;

	return canManage(guild, member);
}

async function transformGuild(userId: string, data: RESTAPIPartialCurrentUserGuild): Promise<OauthFlattenedGuild> {
	const guild =
		(await useApi().guilds.get(data.id, {
			with_counts: true
		})) ?? undefined;
	const channels = await useApi().guilds.getChannels(guild.id);
	const serialized: PartialOauthFlattenedGuild =
		typeof guild === 'undefined'
			? ({
					afkChannelId: null,
					afkTimeout: 60,
					applicationId: null,
					approximateMemberCount: null,
					approximatePresenceCount: null,
					available: true,
					banner: null,
					channels: [],
					defaultMessageNotifications: GuildDefaultMessageNotifications.OnlyMentions,
					description: null,
					widgetEnabled: false,
					explicitContentFilter: GuildExplicitContentFilter.Disabled,
					emojis: [],
					icon: data.icon,
					id: data.id,
					joinedTimestamp: null,
					mfaLevel: GuildMFALevel.None,
					name: data.name,
					ownerId: data.owner ? userId : null,
					partnered: false,
					preferredLocale: Locale.EnglishUS,
					premiumSubscriptionCount: null,
					premiumTier: GuildPremiumTier.None,
					roles: [],
					splash: null,
					systemChannelId: null,
					vanityURLCode: null,
					verificationLevel: GuildVerificationLevel.None,
					verified: false
				} as unknown as FlattenedGuild)
			: // eslint-disable-next-line @typescript-eslint/no-explicit-any
				flattenGuild({ ...guild, channels: channels as any });

	return {
		...serialized,
		permissions: Number(data.permissions),
		manageable: await getManageable(userId, data, guild),
		wolfstarIsIn: typeof guild !== 'undefined'
	};
}

export async function transformOauthGuildsAndUser({ user, guilds }: LoginData): Promise<TransformedLoginData> {
	if (!user || !guilds) return { user, guilds };

	const userId = user.id;

	const transformedGuilds = await Promise.all(guilds.map((guild) => transformGuild(userId, guild)));
	return { user, transformedGuilds };
}
