<script setup lang="ts">
import { computed } from 'vue';

const { isMobile } = useDevice();

const errorInfo = computed(() => {
	return {
		title: '404',
		message:
			'Woah! Looks like you just ran into a non-existent page. If you think you found this page by mistake, feel free to join the support server on Discord or go back home.'
	};
});

const clearErrorAndNavigate = (path: string) => {
	clearError();
	navigateTo(path);
};
</script>

<template>
	<div class="container mx-auto flex min-h-screen max-w-md flex-col items-center justify-center p-4">
		<h1 class="text-9xl font-bold text-error">
			{{ errorInfo.title }}
		</h1>
		<h2 :class="[isMobile ? 'text-2xl' : 'text-3xl', 'mb-5 text-center']">
			{{ errorInfo.message }}
		</h2>

		<div class="btn-group flex-col sm:flex-row">
			<a href="https://join.wolfstar.rocks" target="_blank" class="btn btn-primary mb-2 sm:mb-0 sm:mr-2">
				<Icon name="mdi:forum" class="mr-2" /> Join Support Server
			</a>
			<button @click="clearErrorAndNavigate('/')" class="btn btn-primary"><Icon name="mdi:home" class="mr-2" /> Go Back Home</button>
		</div>
	</div>
</template>

<style scoped>
.btn-group {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

@media (min-width: 640px) {
	.btn-group {
		flex-wrap: nowrap;
	}
}
</style>
