<template>
	<div class="app-layout" :class="appName">
		<sections-app-navbar></sections-app-navbar>
		<main
			:class="[
				'mx-4 flex flex-grow flex-col items-center sm:mx-auto sm:w-5/6 lg:max-w-5xl xl:max-w-7xl',
				{ 'flex h-[calc(100vh-200px)] items-center justify-center': loading }
			]"
		>
			<div v-if="loading" class="w-full">
				<div class="loading-bar loading loading-lg"></div>
			</div>
			<slot v-else></slot>
		</main>

		<sections-app-footer></sections-app-footer>
		<div class="fixed bottom-4 right-4 z-50 flex space-x-2">
			<PresentationalLayoutsChangeTheme></PresentationalLayoutsChangeTheme>
			<PresentationalLayoutsScrollToTopButton></PresentationalLayoutsScrollToTopButton>
		</div>
	</div>
</template>

<script setup lang="ts">
const appName = inject(ProviderAppNameKey)!;

const props = defineProps<{
	loading?: boolean;
}>();
</script>

<style scoped>
.app-layout {
	@apply flex min-h-screen flex-col;
	background-image: linear-gradient(to top in oklch, oklch(var(--b1) / 1) 0%, transparent 70%),
		radial-gradient(ellipse at calc(100vw * 0.5) 0% in oklch, oklch(var(--color) / 0.2), transparent 80%);
	background-size: max(100vw, 600px) 50rem;
	background-repeat: no-repeat;
}

.app-layout.wolfstar {
	--color: var(--branding-wolfstar);
}
</style>
