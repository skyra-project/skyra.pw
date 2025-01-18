<template>
	<nuxt-layout name="main">
		<Errors :statusCode="statusCode" :message="error?.message ?? null" />
	</nuxt-layout>
</template>

<script setup lang="ts">
const error = useError();

const statusCode = computed(() => error.value?.statusCode ?? 500);

console.log(error.value?.message);

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
