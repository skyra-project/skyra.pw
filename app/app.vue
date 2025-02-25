<template>
	<vite-pwa-manifest />
	<nuxt-loading-indicator />
	<nuxt-layout name="main">
		<nuxt-page />
	</nuxt-layout>
</template>

<script setup lang="ts">
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
