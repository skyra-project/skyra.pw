<script setup lang="ts">
import useGuildData from '~/composables/settings/useGuildData';
import { useGuildSettings } from '~/composables/settings/useGuildSettings';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';
import { ConfigurableRemoveInitialRole, ConfigurableRoles } from '~/config/SettingsDataEntries';

const { guildData } = useGuildData();
const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const handleResetKey = (key: string) => {
	setGuildSettingsChanges({ [key]: undefined });
};

const commonProps = computed(() => ({
	guild: guildData.value,
	filterEveryone: true,
	buttonProps: {
		class: 'w-full text-left min-h-[60px] md:min-h-[inherit]'
	}
}));
</script>

<template>
	<div>
		<PresentationalLayoutsSettingsSection title="Toggles">
			<SelectsSelectBoolean
				:title="ConfigurableRemoveInitialRole.name"
				:description="ConfigurableRemoveInitialRole.tooltip"
				:current-value="guildSettings.rolesRemoveInitial"
				@change="(value) => setGuildSettingsChanges({ rolesRemoveInitial: value })"
			/>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Configurable Roles">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<template v-for="{ name, tooltip, key } in ConfigurableRoles" :key="key">
					<SelectsSelectRoles
						v-if="Array.isArray(guildSettings[key])"
						v-bind="commonProps"
						:label="name"
						:tooltip-title="tooltip"
						:value="guildSettings[key]"
						@change="(newRole) => setGuildSettingsChanges({ [key]: newRole })"
						@reset="() => handleResetKey(key)"
					/>
					<SelectsSelectRole
						v-else
						v-bind="commonProps"
						:label="name"
						:tooltip-title="tooltip"
						:value="guildSettings[key] as string"
						@change="(newRole) => setGuildSettingsChanges({ [key]: newRole })"
						@reset="() => handleResetKey(key)"
					/>
				</template>
			</div>
		</PresentationalLayoutsSettingsSection>
	</div>
</template>
