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
					@reset="handleResetKey(guilData, setGuildSettingsChanges, key)"
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

<script setup lang="ts">
const { guildData } = useGuild();
const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const commonProps = {
	guild: guildData.value, // Update the type of the guild property to match the expected type
	buttonProps: {
		class: 'w-full text-left min-h-[60px] md:min-h-[inherit]'
	}
};
</script>
