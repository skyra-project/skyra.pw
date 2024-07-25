<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';

const { theme, toggleTheme } = useThemeStore();
</script>

<template>
	<Transition name="fade">
		<button @click="toggleTheme" class="btn btn-circle btn-ghost btn-sm" aria-label="Toggle theme">
			<Sun v-if="theme === 'light'" class="h-4 w-4" />
			<Icon name="mdi:auto-mode" v-else-if="theme === 'auto'" class="h-4 w-4" />
			<Moon v-else class="h-4 w-4" /></button
	></Transition>
</template>
