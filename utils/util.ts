import type { Selfmod } from '~/utils/types/ConfigurableData';
import type { GuildSettings } from '~/utils/types/GuildSettings';

export const isBrowser = typeof window !== 'undefined';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function removeNonAlphaNumeric(str: string) {
	return str.replace(/[^0-9a-zA-Z]/gi, '');
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
 * Toggle a bit in a bitfield.
 * @param bits The bitfield value to modify.
 * @param bit The bit to toggle.
 * @param toggle The value to set.
 */
export function bitwiseSet(bits: number, bit: number, toggle: boolean) {
	return toggle ? bits | bit : bits & ~bit;
}

export const updateSliderValueObj = (prop: Selfmod.Union, value: number | number[], multiplier = 1) => ({
	[prop]: Array.isArray(value) ? value[0] * multiplier : value * multiplier
});

export const handleResetKey = (
	guildSettingsChanges: GuildSettings | undefined,
	setGuildSettingsChanges: (changes?: Partial<GuildSettings> | undefined) => void,
	key: keyof GuildSettings
) => {
	// If there are pre-existing "guildSettingsChanges" and the key exists in that object then remove it from the "guildSettingsChanges"
	if (guildSettingsChanges && key in guildSettingsChanges) {
		Reflect.deleteProperty(guildSettingsChanges, key);
	} else if (guildSettingsChanges) {
		Reflect.set(guildSettingsChanges, key, null);
	} else {
		guildSettingsChanges = { [key]: null } as unknown as typeof guildSettingsChanges;
	}

	setGuildSettingsChanges(guildSettingsChanges);
};
