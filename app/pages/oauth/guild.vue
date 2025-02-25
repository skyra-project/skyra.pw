<template>
	<div>
		<Head>
			<Title>OAUTH Guild Callback</Title>

			<Meta property="og:title" content="OAUTH Guild Callback" />
			<Meta property="og:description" content="A landing page for the OAuth2.0 guild callback flow." />
		</Head>
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
const route = useRoute();
const router = useRouter();

const guildId = ref<string | null>(null);

onMounted(() => {
	const queryGuildId = route.query.guild_id;
	if (queryGuildId && typeof queryGuildId === 'string') {
		guildId.value = queryGuildId;
		// Redirect after a short delay to show the loading animation
		setTimeout(() => {
			router.push(`/guilds/${guildId.value}`);
		}, 1500);
	}
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
