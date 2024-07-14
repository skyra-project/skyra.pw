<template>
	<slot />
</template>

<script setup lang="ts">
import { onMounted, defineProps } from 'vue';

interface RedirectRouteProps {
	redirectUri: string;
}

const props = defineProps<RedirectRouteProps>();

const router = useRouter();

onMounted(() => {
	router.replace(props.redirectUri);
});
</script>
