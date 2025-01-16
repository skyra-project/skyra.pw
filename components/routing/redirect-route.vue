<template>
	<slot />
</template>

<script setup lang="ts">
interface RedirectRouteProps {
	redirectUri: string;
}

const props = defineProps<RedirectRouteProps>();

const router = useRouter();

onMounted(() => {
	router.replace(props.redirectUri);
});
</script>
