<template>
	<section class="container mx-auto p-4">
		<template v-if="!code">
			<h1>Missing code</h1>
			<p>Please use the <code>Login</code> button instead or click <NuxtLink to="/login" class="underline">here</NuxtLink>.</p>
		</template>
		<client-only v-else>
			<div v-if="isLoading">
				<PresentationalLoading :loading="isLoading" />
				<h1>Authenticating...</h1>
			</div>
			<template v-else-if="error">
				<h1>Failed to complete authentication flow:</h1>
				<pre><code>{{ error }}</code></pre>
			</template>
			<template v-else-if="userData">
				<h1>Welcome {{ auth.session?.value?.global_name ?? auth.session?.value?.username }}</h1>
				<p>You will be redirected to the main page in a second.</p>
				<PresentationalLoading :loading="true" />
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

const { code } = useRoute().query;
const client = useClientTrpc();
const auth = useAuth();
const redirectUri = `${getOrigin()}/oauth/callback`;

const isLoading = ref(false);
const error = ref<Error | null>(null);
const userData = ref<APIUser | null>(null);

async function performCall() {
	isLoading.value = true;
	error.value = null;

	try {
		const response = await client.auth.callback.mutate({
			code: code as string,
			redirectUri
		});

		if (!response?.user) throw new Error('No response from server');

		userData.value = response.user;
		await auth.updateSession();

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
