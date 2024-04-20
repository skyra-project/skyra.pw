<template>
	<div class="app-layout" :class="appName">
		<app-navbar></app-navbar>
		<main class="mx-4 sm:mx-auto sm:w-5/6 lg:max-w-5xl xl:max-w-7xl flex flex-col items-center flex-grow">
			<slot></slot>
		</main>
		<app-footer></app-footer>
	</div>
</template>

<script setup lang="ts">
const appName = inject(ProviderAppNameKey)!;
</script>

<style scoped>
.app-layout {
	@apply flex flex-col min-h-screen;
	background-image: linear-gradient(to top in oklch, oklch(var(--b1) / 1) 0%, transparent 70%),
		radial-gradient(ellipse at 50% 0% in oklch, oklch(var(--color) / 0.2), transparent 80%);
	background-size: 100vw 100vh;
	background-repeat: no-repeat;
}

.app-layout.skyra {
	--color: var(--branding-skyra);
}

.app-layout.artiel {
	--color: var(--branding-artiel);
}

.app-layout.iriss {
	--color: var(--branding-iriss);
}

.app-layout.nekokai {
	--color: var(--branding-nekokai);
}

.app-layout.teryl {
	--color: var(--branding-teryl);
}
</style>
