import { BitField, enumToObject } from '@sapphire/bitfield';
import { objectEntries, omitKeysFromObject } from '@sapphire/utilities';
import { GuildSystemChannelFlags, PermissionFlagsBits } from 'discord-api-types/v10';

export const PermissionsBits = new BitField(omitKeysFromObject(PermissionFlagsBits, 'ManageEmojisAndStickers'));
export const PermissionsBitsList = objectEntries(PermissionsBits.flags);
export function toPermissionsArray(bits: bigint) {
	return PermissionsBits.toArray(bits);
}

export const SystemChannelFlag = new BitField(enumToObject(GuildSystemChannelFlags));
export const SystemChannelFlagList = objectEntries(SystemChannelFlag.flags);
export function toChannelsArray(bits: number) {
	return SystemChannelFlag.toArray(bits);
}

/**
 * Toggle a bit in a bitfield.
 * @param bits The bitfield value to modify.
 * @param bit The bit to toggle.
 * @param toggle The value to set.
 */
export function bitwiseSet(bits: number, bit: number, toggle: boolean) {
	return toggle ? bits | bit : bits & ~bit;
}

/**
 * Check if a bit is set in a bitfield.
 * @param bits The bitfield value to check.
 * @param bit The bit to check.
 */
export function bitwiseHas(bits: number, bit: number) {
	return (bits & bit) === bit;
}

/**
 * Get the bitfield value from an array of bits.
 * @param bits The bits to convert.
 */
export function bitwiseArray(bits: readonly number[]) {
	return bits.reduce((acc, bit) => acc | bit, 0);
}
