<script setup lang="ts">
import { computed } from 'vue';
import { useError } from '#app';

const error = useError();
const { isMobile } = useDevice();

const statusCode = computed(() => error.value?.statusCode || 500);

const errorInfo = computed(() => {
	switch (statusCode.value) {
		case 404:
			return {
				title: '404',
				message:
					'Woah! Looks like you just ran into a non-existent page. If you think you found this page by mistake, feel free to join the support server on Discord or go back home.'
			};
		case 403:
			return {
				title: '403',
				message:
					"Oops! You don't have permission to access this page. If you think this is an error, please contact support or return to the home page."
			};
		case 500:
			return {
				title: '500',
				message:
					"Oh no! Something went wrong on our end. We're working on fixing it. Please try again later or contact support if the problem persists."
			};
		default:
			return {
				title: 'Error',
				message:
					"An unexpected error occurred. We're sorry for the inconvenience. Please try again or contact support if the problem continues."
			};
	}
});

const clearErrorAndNavigate = (path: string) => {
	clearError();
	navigateTo(path);
};
</script>

<template>
	<div class="container mx-auto flex min-h-screen max-w-md flex-col items-center justify-center p-4">
		<h1
			class="text-9xl font-bold"
			:class="{ 'text-error': statusCode === 404, 'text-warning': statusCode === 403, 'text-info': statusCode === 500 }"
		>
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
