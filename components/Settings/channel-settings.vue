<script setup lang="ts">
import useGuild from '~/composables/settings/useGuildData';
import { useGuildSettings } from '~/composables/settings/useGuildSettings';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';
import { ConfigurableLoggingChannels, ConfigurableIgnoreChannels } from '~/utils/types/SettingsDataEntries';

const { guildData } = useGuild();
const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const handleResetKey = (key: string) => {
	setGuildSettingsChanges({ [key]: undefined });
};

const commonProps = {
	guild: guildData.value, // Update the type of the guild property to match the expected type
	buttonProps: {
		class: 'w-full text-left min-h-[60px] md:min-h-[inherit]'
	}
};
</script>

<template>
	<div>
		<PresentationalLayoutsSettingsSection title="Logging Channels">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<SelectsSelectChannel
					v-for="{ name, description, key } in ConfigurableLoggingChannels"
					:key="key"
					v-bind="commonProps"
					:label="name"
					:tooltip-title="description"
					:value="guildSettings[key]"
					@change="(channel) => setGuildSettingsChanges({ [key]: channel })"
					@reset="() => handleResetKey(key)"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Logging Ignore Channels" class="mt-10 md:mt-20">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<SelectsSelectChannels
					v-for="{ name, description, key } in ConfigurableIgnoreChannels"
					:key="key"
					v-bind="commonProps"
					:label="name"
					:tooltip-title="description"
					:value="guildSettings[key]"
					@change="(channels) => setGuildSettingsChanges({ [key]: channels })"
					@reset="() => handleResetKey(key)"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>
	</div>
</template>
