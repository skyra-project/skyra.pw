<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGuildSettings } from '~/composables/settings/useGuildSettings';
import { ConfigurableModerationEvents, ConfigurableMessageEvents } from '~/config/SettingsDataEntries';

import SelectBoolean from '~/components/selects/SelectBoolean.vue';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';

const router = useRouter();
const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const guildId = computed(() => router.currentRoute.value.params.id as string);
</script>

<template>
	<div>
		<PresentationalLayoutsSettingsSection title="Moderation Events">
			<p class="mb-4 text-sm">
				These events involve moderation actions and require that you setup the Moderation Logs channel on
				<NuxtLink :to="`/guilds/${guildId}/channels`" class="link">the Channels page</NuxtLink>
			</p>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<SelectBoolean
					v-for="{ title, key, description } in ConfigurableModerationEvents"
					:key="key"
					:title="title"
					:description="description"
					:current-value="guildSettings[key]"
					@change="(value) => setGuildSettingsChanges({ [key]: value })"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Message Events">
			<p class="mb-4 text-sm">
				These events involve message events, the channels to set up vary on the type of event and each channel can be configured on
				<NuxtLink :to="`/guilds/${guildId}/channels`" class="link">the Channels page</NuxtLink>
			</p>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<SelectBoolean
					v-for="{ title, key, description } in ConfigurableMessageEvents"
					:key="key"
					:title="title"
					:description="description"
					:current-value="guildSettings[key]"
					@change="(value) => setGuildSettingsChanges({ [key]: value })"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>
	</div>
</template>
