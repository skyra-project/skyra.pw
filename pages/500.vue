<script setup lang="ts">
import { computed } from 'vue';

const { isMobile } = useDevice();

const errorInfo = computed(() => {
	return {
		title: '500',
		message:
			"Oh no! Something went wrong on our end. We're working on fixing it. Please try again later or contact support if the problem persists."
	};
});

const clearErrorAndNavigate = () => clearError({ redirect: '/' });

const rule = useRobotsRule();
rule.value = 'noindex,nofollow,nosnippet,notranslate,noimageindex,noarchive,max-snippet:-1,max-image-preview:none,max-video-preview:-1';
</script>

<template>
	<div class="container mx-auto flex min-h-screen max-w-md flex-col items-center justify-center p-4">
		<h1 class="text-9xl font-bold text-info">
			{{ errorInfo.title }}
		</h1>
		<h2 :class="[isMobile ? 'text-2xl' : 'text-3xl', 'mb-5 text-center']">
			{{ errorInfo.message }}
		</h2>

		<div class="btn-group flex-col sm:flex-row">
			<a href="https://join.wolfstar.rocks" target="_blank" class="btn btn-primary mb-2 sm:mb-0 sm:mr-2">
				<Icon name="mdi:forum" class="mr-2" /> Join Support Server
			</a>
			<button @click="clearErrorAndNavigate()" class="btn btn-primary"><Icon name="mdi:home" class="mr-2" /> Go Back Home</button>
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
