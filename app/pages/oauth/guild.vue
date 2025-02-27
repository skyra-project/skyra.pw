<template>
	<div>
		<section class="prose prose-stone dark:prose-invert max-w-none">
			<client-only>
				<template v-if="!guildId">
					<h1>Missing guild ID</h1>
					<p>Please use the <code>Login</code> button instead or click <NuxtLink to="/login" class="underline">here</NuxtLink>.</p>
				</template>
				<template v-else>
					<h1 class="animate-pulse">Redirecting to guild...</h1>
					<PresentationalLoading :loading="true" />
				</template>
			</client-only>
		</section>
	</div>
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core';

const router = useRouter();
const guildId = ref<string | null>(null);

onMounted(() => {
	const queryGuildId = useRouteParams('guildid');
	if (queryGuildId && typeof queryGuildId.value === 'string') {
		guildId.value = queryGuildId.value;
		// Redirect after a short delay to show the loading animation
		promiseTimeout(1500);
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
