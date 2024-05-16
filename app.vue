<template>
	<nuxt-loading-indicator />
	<nuxt-layout name="main">
		<nuxt-page />
	</nuxt-layout>
</template>

<script setup lang="ts">
const router = useRouter();
const appName = ref<'wolfstar'>('wolfstar');
watch(
	router.currentRoute,
	(v) => {
		appName.value = 'wolfstar';
	},
	{ immediate: true }
);

provide(ProviderAppNameKey, appName);
</script>
