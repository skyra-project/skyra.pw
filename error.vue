<template>
	<nuxt-layout name="main">
		<Errors :statusCode="statusCode" />
	</nuxt-layout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

interface Props {
	error: NuxtError;
}

const props = defineProps<Props>();
const statusCode = computed(() => props.error.statusCode);

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
