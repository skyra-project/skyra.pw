<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';
import { useColorMode } from '@vueuse/core';

const { system, store } = useColorMode({
	attribute: 'data-theme',
	selector: 'data-theme'
});

let myColorMode = computed(() => (store.value === 'auto' ? system.value : store.value));
</script>

<template>
	<Transition name="fade">
		<button @click="store = myColorMode === 'dark' ? 'light' : 'dark'" class="btn btn-circle btn-ghost btn-sm" aria-label="Toggle theme">
			<Sun v-if="myColorMode === 'light'" class="h-4 w-4" />
			<Icon name="mdi:auto-mode" v-else-if="store === 'auto'" class="h-4 w-4" />
			<Moon v-else class="h-4 w-4" /></button
	></Transition>
</template>
