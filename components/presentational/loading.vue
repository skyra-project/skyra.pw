<template>
	<div v-if="loading" class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
		<div class="progress"></div>
	</div>
</template>

<script setup>
import { useMemo } from '@vueuse/nuxt';

const props = defineProps({
	loading: {
		type: Boolean,
		required: true
	}
});

// Memoize for performance optimization (if needed)
const loading = useMemo(() => props.loading, [props.loading]);
</script>

<style>
/* Customize progress appearance if needed */
.progress {
	@apply border-gray-200 h-20 w-20 animate-spin rounded-full border-4 border-t-4; /* DaisyUI default styling */
	/* Or add your own Tailwind CSS classes for a custom look */
}
</style>
