<template>
	<div>
		<section class="prose prose-stone dark:prose-invert max-w-none">
			<client-only>
				<template v-if="!guildId">
					<h1>Missing guild ID</h1>
					<p>Please use the <code>Login</code> button instead or click <NuxtLink to="/login" class="underline">here</NuxtLink>.</p>
				</template>
				<div v-else-if="isLoading" class="h-2 w-full rounded-full bg-gray-200">
					<div class="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out" :style="{ width: `${progress}%` }"></div>
				</div>
			</client-only>
		</section>
	</div>
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core';

const router = useRouter();
const guildId = ref<string | null>(null);

const { progress, isLoading, start, finish } = useLoadingIndicator();

onMounted(async () => {
	const queryGuildId = useRouteParams('guildid');
	if (queryGuildId && typeof queryGuildId.value === 'string') {
		guildId.value = queryGuildId.value;

		// Start the loading indicator
		start();

		// Wait for animation
		await promiseTimeout(1500);

		// Finish loading and redirect
		finish();
		router.push(`/guilds/${guildId.value}`);
	}
});

useSeoMeta({
	title: 'Auth Guild Callback',
	robots: { none: true },
	ogTitle: 'OAuth Guild Callback',
	ogDescription: '"A landing page for the OAuth2.0 guild callback flow.'
});
</script>

<style scoped>
.progress {
	animation: progressAnimation 1.5s;
}

@keyframes progressAnimation {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}
</style>
