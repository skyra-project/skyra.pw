<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';

const { colorMode, toggleTheme } = useTheme();
</script>

<template>
	<Transition name="fade">
		<button @click="toggleTheme" class="btn btn-circle btn-ghost btn-sm" aria-label="Toggle theme">
			<Sun v-if="colorMode === 'light'" class="h-4 w-4" />
			<Moon v-else class="h-4 w-4" /></button
	></Transition>
</template>
