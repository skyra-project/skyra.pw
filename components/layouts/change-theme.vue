<script setup lang="ts">
const device = useDevice();
const isMobile = computed(() => device.isMobile);

const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	}
});

const toggleTheme = () => {
	isDark.value = !isDark.value;
};
</script>

<template>
	<ClientOnly>
		<template #default>
			<Transition name="fade">
				<button class="btn btn-circle btn-ghost btn-sm" :class="isMobile ? 'btn-md fixed' : 'btn-sm'" @click="toggleTheme">
					<NuxtIcon v-if="!isDark" name="heroicons-moon-20-solid" :class="{ 'h-4 w-4': !isMobile, 'h-6 w-6': isMobile }" />
					<NuxtIcon v-else name="heroicons-sun-20-solid" :class="{ 'h-4 w-4': !isMobile, 'h-6 w-6': isMobile }" />
				</button>
			</Transition>
		</template>

		<template #fallback>
			<div class="h-8 w-8" />
		</template>
	</ClientOnly>
</template>

<style scoped>
.icon-sun,
.icon-moon {
	transition: all 0.3s ease;
}
</style>
