<template>
	<section class="prose prose-stone max-w-none dark:prose-invert">
		<template v-if="!code">
			<h1>Missing code</h1>
			<p>Please use the <code>Login</code> button instead or click <NuxtLink to="/login" class="underline">here</NuxtLink>.</p>
		</template>
		<client-only v-else>
			<div v-if="status === 'pending'">
				<Loading :loading="status === 'pending'"></Loading>
				<h1>Authenticating...</h1>
			</div>
			<template v-else-if="error">
				<h1>Failed to complete authentication flow:</h1>
				<pre><code>{{ error }}</code></pre>
			</template>
			<template v-else-if="data">
				<h1>Welcome {{ data.name }}</h1>
				<p>You will be redirected to the main page in a second.</p>
				<div class="bg-gray-200 dark:bg-stone-900 mt-2 rounded-lg p-1" aria-label="Progress" role="progressbar">
					<div class="progress h-4 rounded-md bg-rose-500"></div>
				</div>
			</template>
		</client-only>
	</section>
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core';
import Loading from '~/components/presentational/loading.vue';

const { code } = useRoute().query;

const redirectUri = `${getOrigin()}/oauth/callback`;
const { data, error, status, execute } = useFetch('/api/auth/callback', {
	body: JSON.stringify({ code, redirectUri }),
	method: 'POST',
	key: 'callback',
	server: false,
	immediate: false
});

if (import.meta.client && code) {
	void performCall().catch(console.error);
}

async function performCall() {
	await execute();
	if (!data.value) return;

	useAuth().session.value = data.value;
	await promiseTimeout(1000);
	await useRouter().replace(useAuth().redirectTo.value);
}

useSeoMeta({
	title: 'Auth Callback',
	robots: { none: true },
	ogTitle: 'Auth Callback',
	ogDescription: 'A landing page for the OAuth2.0 callback flow, use the Login button instead.'
});
</script>

<style scoped>
.progress {
	animation: progressAnimation 1s;
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
