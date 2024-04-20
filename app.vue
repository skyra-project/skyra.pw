<template>
	<nuxt-loading-indicator />
	<nuxt-layout name="main">
		<nuxt-page />
	</nuxt-layout>
</template>

<script setup lang="ts">
const router = useRouter();
const appName = ref<'artiel' | 'iriss' | 'nekokai' | 'skyra' | 'teryl'>('skyra');
watch(
	router.currentRoute,
	(v) => {
		if (v.path.startsWith('/artiel')) appName.value = 'artiel';
		else if (v.path.startsWith('/iriss')) appName.value = 'iriss';
		else if (v.path.startsWith('/nekokai')) appName.value = 'nekokai';
		else if (v.path.startsWith('/teryl')) appName.value = 'teryl';
		else appName.value = 'skyra';
	},
	{ immediate: true }
);

provide(ProviderAppNameKey, appName);
</script>
