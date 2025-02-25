import type { Selfmod } from '~/shared/types/ConfigurableData';
import type { GuildData } from '~~/lib/database';

export const updateSliderValueObj = (prop: Selfmod.Union, value: number | number[], multiplier = 1) => ({
	[prop]: Array.isArray(value) && value[0] !== undefined ? value[0] * multiplier : value * multiplier
});

export const handleResetKey = (
	guildSettingsChanges: GuildData | undefined,
	setGuildSettingsChanges: (changes?: Partial<GuildData> | undefined) => void,
	key: keyof GuildData
) => {
	// If there are pre-existing "guildSettingsChanges" and the key exists in that object then remove it from the "guildSettingsChanges"
	if (guildSettingsChanges && key in guildSettingsChanges) {
		Reflect.deleteProperty(guildSettingsChanges, key);
	} else if (guildSettingsChanges) {
		Reflect.set(guildSettingsChanges, key, null);
	} else {
		guildSettingsChanges = {
			[key]: null
		} as unknown as typeof guildSettingsChanges;
	}

	setGuildSettingsChanges(guildSettingsChanges);
};
