<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGuildSettings } from '~/composables/useGuildSettings';
import { ConfigurableRemoveInitialRole, ConfigurableRoles } from '~/config/SettingsDataEntries';
import PageHeader from '~/components/Settings/PageHeader.vue';
import Section from '~/components/Settings/Section.vue';
import SelectBoolean from '~/components/selects/SelectBoolean.vue';
import SelectRole from '~/components/selects/SelectRole.vue';
import SelectRoles from '~/components/selects/SelectRoles.vue';

const { guildData, guildSettings, setGuildSettingsChanges } = useGuildSettings();

const isOnMobile = useDevice().isMobile;

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
		<PageHeader
			title="Roles"
			:subtitle="`Here you can configure special roles known to Skyra for your server. ${
				isOnMobile ? 'Long press' : 'Hover over'
			} a button to get more information about that particular role`"
		/>

		<Section title="Toggles">
			<SelectBoolean
				:title="ConfigurableRemoveInitialRole.name"
				:description="ConfigurableRemoveInitialRole.tooltip"
				:current-value="guildSettings.rolesRemoveInitial"
				@change="(value) => setGuildSettingsChanges({ rolesRemoveInitial: value })"
			/>
		</Section>

		<Section title="Configurable Roles">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<template v-for="{ name, tooltip, key } in ConfigurableRoles" :key="key">
					<SelectRoles
						v-if="Array.isArray(guildSettings[key])"
						v-bind="commonProps"
						:label="name"
						:tooltip-title="tooltip"
						:value="guildSettings[key]"
						@change="(newRole) => setGuildSettingsChanges({ [key]: newRole })"
						@reset="() => handleResetKey(key)"
					/>
					<SelectRole
						v-else
						v-bind="commonProps"
						:label="name"
						:tooltip-title="tooltip"
						:value="guildSettings[key]"
						@change="(newRole) => setGuildSettingsChanges({ [key]: newRole })"
						@reset="() => handleResetKey(key)"
					/>
				</template>
			</div>
		</Section>
	</div>
</template>
