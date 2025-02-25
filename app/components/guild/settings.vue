<template>
	<div>
		<Loading :is-loading="loading" />
		<div class="flex h-screen">
			<main class="bg-base-300 text-base-content mt-16 flex flex-grow flex-col overflow-y-scroll p-4 sm:mt-0">
				<component
					:is="settingsComponent"
					v-if="readyToRender"
					:commands="commands"
					:languages="languages"
					:guild-data="guildData"
					:guild-settings="settings"
					:guild-settings-changes="changes"
					@update:settings="updateGuildSettings"
				/>

				<Transition name="fade">
					<div v-if="hasChanges" class="bg-base-300 fixed right-0 bottom-0 left-0 flex justify-end gap-4 p-4 shadow-lg">
						<UButton variant="outline" :loading="loading" :disabled="loading" @click="resetChanges"> Reset Changes </UButton>

						<UButton variant="solid" color="primary" :loading="loading" :disabled="loading" @click="submitChanges">
							Save Changes
						</UButton>
					</div>
				</Transition>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import type { GuildData } from '@//lib/database';
import type { FlattenedCommand } from '@/server/utils/types';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const guildId = useRouteParams('guildId');

// Use the composable
const { settings, setBaseSettings, resetChanges, hasChanges, changes } = useGuildSettings();

const loading = ref(true);
const commands = ref<FlattenedCommand[]>([]);
const languages = ref<string[]>([]);
const guildData = ref<any>(null);

const fetchData = async () => {
	try {
		loading.value = true;

		const [commandsData, languagesData, guildDataResponse, guildSettingsResponse] = await Promise.all([
			useFetch('commands'),
			useFetch('languages'),
			useFetch(`guilds/${guildId.value}`),
			useFetch(`guilds/${guildId}/settings`)
		]);

		commands.value = commandsData.value ?? [];
		languages.value = languagesData.value ?? [];
		guildData.value = guildDataResponse;
		setBaseSettings(guildSettingsResponse);
	} catch (error) {
		consola.error('Error fetching data:', error);
		handleError(error);
	} finally {
		loading.value = false;
	}
};

const handleError = async (error: any) => {
	if (error.status === 401) {
		await useAuth().updateSession();
		await router.push('/');
	} else {
		toast.add({
			title: 'Error',
			description: 'An error occurred. Please try again.',
			color: 'error'
		});
	}
};

const submitChanges = async () => {
	try {
		loading.value = true;

		const response = await $fetch<GuildData>(`guilds/${guildId}/settings`, {
			method: 'PATCH',
			body: {
				guildId,
				data: Object.entries(changes.value ?? {})
			}
		});

		if (!response || !Object.keys(response).length) {
			throw new Error('Invalid response');
		}

		setBaseSettings(response);
		resetChanges();
	} catch (error) {
		handleError(error);
	} finally {
		loading.value = false;
	}
};

const updateGuildSettings = (newSettings: Partial<GuildData>) => {
	settings.value = newSettings;
};

const readyToRender = computed(
	() => !loading.value && guildData.value && settings.value && Object.keys(guildData.value).length > 0 && Object.keys(settings.value).length > 0
);

const settingsComponent = computed(() =>
	defineAsyncComponent(() => import(`@//components/guild/Settings/${route.fullPath.split('/').slice(2).join('/')}.vue`))
);

useHead({
	title: computed(() => `${guildData.value?.name ?? 'Guild'} Settings`)
});

onMounted(fetchData);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	@apply transition-all duration-300 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	@apply translate-y-full opacity-0;
}
</style>
