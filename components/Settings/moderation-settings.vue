<script setup lang="ts">
import { useGuildSettings } from '~/composables/settings/useGuildSettings';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';
import { ConfigurableModerationKeys } from '~/utils/types/SettingsDataEntries';

import SelectBoolean from '~/components/selects/select-boolean.vue';

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();
</script>

<template>
	<PresentationalLayoutsSettingsSection title="Punishment Settings">
		<p>These settings affect what Skyra does when you're punishing (ban, kick, mute, etc) someone.</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<SelectBoolean
				v-for="{ description, key, name } in ConfigurableModerationKeys"
				:key="key"
				:title="name"
				:current-value="guildSettings[key]"
				:description="description"
				@change="(value) => setGuildSettingsChanges({ [key]: value })"
			/>
		</div>
	</PresentationalLayoutsSettingsSection>
</template>
