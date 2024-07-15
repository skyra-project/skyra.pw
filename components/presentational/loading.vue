<template>
	<div v-if="loading" class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
		<div class="progress"></div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	loading: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.progress {
	@apply h-20 w-20 border-collapse animate-spin rounded-full border-4 border-t-4;
	border-top-color: --primary; /* Cambia questo colore se necessario */
}
</style>
