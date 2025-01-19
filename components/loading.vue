<template>
	<div v-if="isLoading" class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<span class="loading loading-spinner loading-lg" />
			<p class="mt-4 text-base-content/80">{{ message || 'Caricamento...' }}</p>
		</div>
	</div>
	<slot v-else />
</template>

<script lang="ts" setup>
interface LoadingProps {
	isLoading: boolean;
	message?: string;
}

defineProps<LoadingProps>();
</script>

<style scoped>
.loading {
	@apply text-primary;
}
</style>
