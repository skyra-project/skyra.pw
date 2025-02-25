import type { Guild as GuildData } from '@prisma/client';
import type { DeepReadonly, PickByValue } from '@sapphire/utilities';
import type { Snowflake } from 'discord-api-types/v10';

export type GuildDataKey = keyof GuildData;
export type GuildDataValue = GuildData[GuildDataKey];

export type ReadonlyGuildData = DeepReadonly<GuildData>;
export type ReadonlyGuildDataValue = DeepReadonly<GuildDataValue>;

export type GuildSettingsOfType<T> = PickByValue<GuildData, T>;

export type { Guild as GuildData } from '@prisma/client';

export interface PermissionsNode {
	allow: readonly Snowflake[];
	deny: readonly Snowflake[];
	id: Snowflake;
}

export type CommandAutoDelete = readonly [Snowflake, number];

export interface DisabledCommandChannel {
	channel: Snowflake;
	commands: readonly Snowflake[];
}

export interface StickyRole {
	roles: readonly Snowflake[];
	user: Snowflake;
}

export interface ReactionRole {
	channel: Snowflake;
	emoji: string;
	message: Snowflake | null;
	role: Snowflake;
}

export interface UniqueRoleSet {
	name: string;
	roles: readonly Snowflake[];
}
