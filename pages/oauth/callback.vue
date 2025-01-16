<template>
	<section class="container mx-auto p-4">
		<template v-if="!code">
			<h1>Missing code</h1>
			<p>Please use the <code>Login</code> button instead or click <NuxtLink to="/login" class="underline">here</NuxtLink>.</p>
		</template>
		<client-only v-else>
			<h1 v-if="isLoading" class="animate-pulse">Loading...</h1>
			<template v-else-if="error">
				<h1>Failed to complete authentication flow:</h1>
				<pre><code>{{ error }}</code></pre>
			</template>
			<template v-else-if="data">
				<p>You will be redirected to the main page in a second.</p>
				<div class="bg-gray-200 dark:bg-stone-900 mt-2 rounded-lg p-1" aria-label="Progress" role="progressbar">
					<div class="progress h-4 rounded-md bg-rose-500"></div>
				</div>
			</template>
		</client-only>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { promiseTimeout } from '@vueuse/core';
import type { APIUser } from 'discord-api-types/v10';
import { useClientTrpc } from '~/composables/public';
import { useAuth } from '~/composables/auth';
import { getOrigin } from '~/composables/public';

const { code } = useRoute().query as { code: string };
const client = useClientTrpc();
const auth = useAuth();
const redirectUri = `${getOrigin()}/oauth/callback`;

const isLoading = ref(false);
const error = ref<Error | null>(null);

const { data } = await useAsyncData('callback', async () => await client.auth.callback.mutate({ code, redirectUri }), {
	server: false,
	immediate: false
});

async function performCall() {
	isLoading.value = true;
	error.value = null;

	try {
		useAuth().session.value = data.value;

		await promiseTimeout(1000);
		await useRouter().replace(auth.redirectTo.value);
	} catch (e) {
		error.value = e as Error;
	} finally {
		isLoading.value = false;
	}
}

if (import.meta.client && code) {
	void performCall();
}

useSeoMeta({
	title: 'Auth Callback',
	robots: { none: true },
	ogTitle: 'Auth Callback',
	ogDescription: 'A landing page for the OAuth2.0 callback flow, use the Login button instead.'
});
</script>
