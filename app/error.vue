<template>
	<nuxt-layout name="main">
		<error-message :error="error" />
	</nuxt-layout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const error = useError() as unknown as NuxtError;

const router = useRouter();
const appName = ref<'wolfstar' | 'staryl'>('wolfstar');
watch(
	router.currentRoute,
	(v) => {
		if (v.path.startsWith('/staryl')) appName.value = 'staryl';
		else appName.value = 'wolfstar';
	},
	{ immediate: true }
);

provide(ProviderAppNameKey, appName);
</script>
