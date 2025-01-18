<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set(value: boolean) {
		colorMode.preference = value ? 'dark' : 'light';
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
				<button class="btn btn-circle btn-ghost" @click="toggleTheme">
					<Icon name="heroicons-moon-20-solid" v-if="!isDark" class="h-5 w-5" />
					<Icon name="heroicons-sun-20-solid" v-else class="h-5 w-5" />
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
