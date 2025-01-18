<template>
	<div>
		<PresentationalLayoutsSettingsDashboardLayout :guild-id="guildId">
			<component :is="settingsComponent" :commands="commands" :languages="languages" />
		</PresentationalLayoutsSettingsDashboardLayout>
	</div>
</template>

<script setup lang="ts">
import type { FlattenedCommand } from '~/utils/types/ApiData';
import { useRouteParams } from '@vueuse/router';

const route = useRoute();
const trpc = useClientTrpc();

const guildId = useRouteParams('guildId');

const loading = ref(true);
const commands = ref<FlattenedCommand[]>([]);
const languages = ref<string[]>([]);

const fetchCommandsAndLanguages = async () => {
	loading.value = true;

	try {
		const { data: commandsData } = await useAsyncData('commands', () => trpc.commands.getAll.query());
		const { data: languagesData } = await useAsyncData('languages', () => trpc.languages.getAll.query());

		commands.value = commandsData.value ?? [];
		languages.value = languagesData.value ?? [];
	} catch (error) {
		console.error('Error fetching data:', error);
	} finally {
		loading.value = false;
	}
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
