<template>
	<div class="app-layout" :class="appName">
		<sections-app-navbar />
		<main class="mx-4 flex flex-grow flex-col items-center sm:mx-auto sm:w-5/6 lg:max-w-5xl xl:max-w-7xl">
			<slot></slot>
		</main>

		<sections-app-footer />
		<div class="fixed right-4 bottom-4 z-50 flex space-x-2">
			<layout-change-theme />
			<layout-scroll-to-top-button />
		</div>
	</div>
</template>

<script setup lang="ts">
const appName = inject(ProviderAppNameKey)!;
</script>

<style scoped>
.app-layout {
	@apply flex min-h-screen flex-col;
	background-image:
		linear-gradient(to top in oklch, oklch(var(--color-base-100) / 1) 0%, transparent 70%),
		radial-gradient(ellipse at calc(100vw * 0.5) 0% in oklch, oklch(var(--color) / 0.2), transparent 80%);
	background-size: max(100vw, 600px) 50rem;
	background-repeat: no-repeat;
}

.app-layout.wolfstar {
	--color: var(--color-primary);
}
</style>
