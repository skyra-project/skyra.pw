<template>
	<div>
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
						<button class="btn btn-outline" :class="{ loading: loading }" :disabled="loading" @click="resetChanges">Reset Changes</button>

						<button class="btn btn-primary" :class="{ loading: loading }" :disabled="loading" @click="submitChanges">Save Changes</button>
					</div>
				</Transition>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import type { NuxtError } from '#app';
import type { GuildData } from '~~/lib/database';
import type { FlattenedCommand, FlattenedGuild } from '~~/shared/types';

const route = useRoute();
const router = useRouter();
const guildId = useRouteParams('guildId');

// Use the composable with correct usage
const { settings, resetChanges, hasChanges, changes } = useGuildSettings();

const loading = ref(true);
const commands = ref<FlattenedCommand[]>([]);
const languages = ref<string[]>([]);
const guildData = ref<FlattenedGuild | null>(null);

const fetchData = async () => {
	try {
		loading.value = true;
		if (typeof guildId.value === 'string') {
			const [commandsData, languagesData, guildDataResponse, guildSettingsResponse] = await Promise.all([
				await useClientTrpc().commands.getAll.query(),
				await useClientTrpc().languages.getAll.query(),
				await useClientTrpc().guilds.search.query({
					guildid: guildId.value
				}),
				await useClientTrpc().guilds.settings.fetch.query({
					guildid: guildId.value,
					shouldSerialize: true
				})
			]);

			commands.value = commandsData;
			languages.value = languagesData;
			guildData.value = guildDataResponse;
			// Update settings using changes function
			if (typeof guildSettingsResponse !== 'string') {
				changes(guildSettingsResponse);
			}
		}
	} catch (error) {
		consola.error('Error fetching data:', error);
		handleError(error as NuxtError<unknown>);
	} finally {
		loading.value = false;
	}
};

const handleError = async (error: NuxtError<unknown>) => {
	if (error.statusCode === 401) {
		await useAuth().updateSession();
		await router.push('/');
	} else {
		toast.error('An error occurred. Please try again.');
	}
};

const submitChanges = async () => {
	try {
		loading.value = true;

		if (!guildId.value) {
			throw createError({
				statusCode: 500,
				message: 'Guild ID not found'
			});
		}

		if (typeof guildId.value === 'string') {
			const response = await useClientTrpc().guilds.settings.update.mutate({
				guildId: guildId.value,
				data: Object.entries(changes.value ?? {})
			});

			if (!response) {
				throw createError({
					statusCode: 500,
					message: 'Failed to update settings'
				});
			}

			setBaseSettings(response);
			resetChanges();
		}
	} catch (error) {
		handleError(error as NuxtError<unknown>);
	} finally {
		loading.value = false;
	}
};

const updateGuildSettings = (newSettings: Partial<GuildData>) => {
	changes(newSettings);
};

const readyToRender = computed(
	() => !loading.value && guildData.value && settings.value && Object.keys(guildData.value).length > 0 && Object.keys(settings.value).length > 0
);

const settingsComponent = computed(() =>
	defineAsyncComponent(() => import(`@/app/components/guild/Settings/${route.fullPath.split('/').slice(2).join('/')}.vue`))
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
