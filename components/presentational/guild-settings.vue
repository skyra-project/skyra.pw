<template>
	<div>
		<PresentationalLoading :loading="loading" v-if="loading" />
		<PresentationalLayoutsSettingsDashboardLayout v-else :guild-id="guildId">
			<component :is="settingsComponent" :commands="commands" :languages="languages" />
		</PresentationalLayoutsSettingsDashboardLayout>
	</div>
</template>

<script setup lang="ts">
import { LocalStorageKeys, type ExpirableLocalStorageStructure } from '~/utils/constants.ts';
import type { FlattenedCommand } from '~/types/ApiData';
import { useLocalStorage } from '@vueuse/core';
import { Time } from '~/utils/wolfstarUtils';

// Components

const route = useRoute();

const guildId = ref(route.params.guildId as string);

const loading = ref(true);
const commands = ref<FlattenedCommand[]>([]);
const languages = ref<string[]>([]);

const fetchCommandsAndLanguages = async () => {
	loading.value = true;

	// Fetch and cache commands (same logic as before)
	const commandsFromLocalStorage = useLocalStorage<ExpirableLocalStorageStructure<FlattenedCommand[]>>(LocalStorageKeys.Commands, {
		expire: 0,
		data: []
	});
	if (commandsFromLocalStorage.value.expire > Date.now() || import.meta.env.DEV) {
		commands.value = commandsFromLocalStorage.value.data;
	} else {
		const commandsData = await $fetch<FlattenedCommand[]>(`${getApiOrigin()}/commands`);
		commands.value = commandsData;
		commandsFromLocalStorage.value = {
			expire: Date.now() + Time.Day * 6,
			data: commandsData
		};
	}

	// Fetch and cache languages
	const languagesFromLocalStorage = useLocalStorage<ExpirableLocalStorageStructure<string[]>>(LocalStorageKeys.Languages, {
		expire: 0,
		data: []
	});
	if (languagesFromLocalStorage.value.expire > Date.now() || import.meta.env.DEV) {
		languages.value = languagesFromLocalStorage.value.data;
	} else {
		const languagesData = await $fetch<string[]>(`${getApiOrigin()}/languages`);
		languages.value = languagesData;
		languagesFromLocalStorage.value = {
			expire: Date.now() + Time.Day * 6,
			data: languagesData
		};
	}

	loading.value = false;
};

onMounted(fetchCommandsAndLanguages);

const joinedPath = computed(() => route.fullPath.split('/').slice(2).join('/') || '');

const settingsComponent = computed(() => {
	switch (joinedPath.value) {
		case 'channels':
			return defineAsyncComponent(() => import('~/components/pages/Settings/channel-settings.vue'));
		case 'disabled-commands':
			return defineAsyncComponent(() => import('~/components/pages/Settings/disabled-commands-settings.vue'));
		case 'events':
			return defineAsyncComponent(() => import('~/components/pages/Settings/event-settings.vue'));
		case 'moderation':
			return defineAsyncComponent(() => import('~/components/pages/Settings/moderation-settings.vue'));
		case 'roles':
			return defineAsyncComponent(() => import('~/components/pages/Settings/role-settings.vue'));
		case 'filter/capitals':
			return defineAsyncComponent(() => import('~/components/pages/Settings/Filter/FilterCapitalsSettings.vue'));
		case 'filter/invites':
			return defineAsyncComponent(() => import('~/components/pages/Settings/Filter/FilterInvitesSettings.vue'));
		case 'filter/links':
			return defineAsyncComponent(() => import('~/components/pages/Settings/Filter/FilterLinksSettings.vue'));
		case 'filter/message-duplication':
			return defineAsyncComponent(() => import('~/components/pages/Settings/Filter/FilterMessagesSettings.vue'));
		case 'filter/new-lines':
			return defineAsyncComponent(() => import('~/components/pages/Settings/Filter/FilterNewLineSettings.vue'));
		case 'filter/reactions':
			return defineAsyncComponent(() => import('~/components/pages/Settings/Filter/FilterReactionSettings.vue'));
		case 'filter/words':
			return defineAsyncComponent(() => import('~/components/pages/Settings/Filter/FilterWordSettings.vue'));
		default:
			return defineAsyncComponent(() => import('~/components/pages/Settings/general-settings.vue'));
	}
});
</script>
