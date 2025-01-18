<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { ValuesType } from 'utility-types';
import type { TransformedLoginData } from '~/utils/types/ApiData';
import type { GuildSettings } from '~/utils/types/GuildSettings';

const props = defineProps<{
	guildId: string;
}>();

const router = useRouter();

const guildData = ref<any>(null);
const guildSettings = ref<any>(null);
const guildSettingsChanges = ref<any>({});
const isLoading = ref(true);
const mobileOpen = ref(false);
const hasError = ref(false);

const syncGuildData = async () => {
	isLoading.value = true;
	try {
		const [guildDataResponse, guildSettingsResponse] = await Promise.all([
			$fetch<ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>>(`guilds/${props.guildId}`),
			$fetch(`guilds/${props.guildId}/settings`)
		]);
		guildData.value = guildDataResponse;
		guildSettings.value = guildSettingsResponse;
	} catch (err: any) {
		if (err.status === 401) {
			await useAuth().updateSession();
			await router.push('/');
		} else {
			await router.push('/404');
		}
	} finally {
		isLoading.value = false;
	}
};

onMounted(syncGuildData);

const submitChanges = async () => {
	try {
		isLoading.value = true;
		const response = await $fetch<GuildSettings>(`guilds/${props.guildId}/settings`, {
			method: 'patch',
			body: {
				guild_id: props.guildId,
				data: Object.entries(guildSettingsChanges.value)
			}
		});
		if (!response || Array.isArray(response) || typeof response !== 'object' || Object.keys(response).length === 0) {
			hasError.value = true;
			setTimeout(() => (isLoading.value = false), 1000);
		} else {
			guildSettingsChanges.value = {};
			guildSettings.value = response;
			isLoading.value = false;
		}
	} catch (error: any) {
		hasError.value = true;
		setTimeout(() => (isLoading.value = false), 1000);
		if (error.status === 401) {
			await useAuth().updateSession();
			await router.push('/');
		}
	}
};

const toggleSidebar = () => (mobileOpen.value = !mobileOpen.value);

const readyToRender = computed(
	() =>
		!isLoading.value &&
		guildData.value !== null &&
		guildSettings.value !== null &&
		Object.keys(guildData.value).length !== 0 &&
		Object.keys(guildSettings.value).length !== 0
);

// Add this computed property
const pageTitle = computed(() => `${guildData.value?.name ?? 'Guild'} Settings`);

// Add the useHead call
useHead({
	title: pageTitle
});
</script>

<template>
	<div>
		<Loading :is-loading="isLoading" />

		<ErrorAlert
			:open="hasError"
			@update:open="hasError = $event"
			error-text="An error occurred getting data from WolfStar's server."
			:error-sub-text="'Maybe try again later, or join the support server and ask for support.'"
		/>

		<div class="flex h-screen">
			<SettingsNavBar :guild-data="guildData" :toggle-sidebar="toggleSidebar" />
			<main class="mt-16 flex flex-grow flex-col overflow-y-scroll bg-base-300 p-4 text-base-content sm:mt-0">
				<slot v-if="readyToRender"></slot>

				<Transition name="fade">
					<div v-if="Object.keys(guildSettingsChanges).length > 0" class="fixed bottom-8 right-8 flex items-end justify-end space-x-2">
						<SubmitResetButtons :is-loading="isLoading" :submit-changes="submitChanges" />
					</div>
				</Transition>
			</main>
		</div>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
