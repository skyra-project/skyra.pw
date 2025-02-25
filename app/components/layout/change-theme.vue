<template>
	<ClientOnly v-if="!colorMode?.forced">
		<template #default>
			<div class="fixed right-3 bottom-36 z-50 sm:bottom-20">
				<SpotlightButton
					class="btn btn-ghost text-base-content flex size-10 items-center justify-center p-1 transition-all duration-200"
					rounded
					@click="() => (isDark = !isDark)"
				>
					<nuxt-icon :name="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" class="z-20 size-6" />
				</SpotlightButton>
			</div>
		</template>
		<template #fallback>
			<div class="size-8 h-8 w-8"></div>
		</template>
	</ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	}
});
</script>
