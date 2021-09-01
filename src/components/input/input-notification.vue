<template>
	<article v-if="!closed" class="rounded-md relative shadow-md" :class="[getColors(level), getLight(light)]">
		<button type="button" class="absolute right-2 top-2" :aria-label="ariaCloseLabel" @click="handleClose">
			<heroicons-outline-x-circle />
		</button>
		<div class="p-4 pr-8">
			<slot></slot>
		</div>
	</article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<(event: 'close') => void>();
defineProps<{ level?: Level; light?: boolean; ariaCloseLabel?: string }>();

function getColors(level: Level = 'none') {
	switch (level) {
		case 'none':
			return 'bg-white bg-opacity-10';
		case 'success':
			return 'bg-green-500';
		case 'warning':
			return 'bg-yellow-500';
		case 'error':
			return 'bg-red-500';
		case 'info':
			return 'bg-blue-400';
	}
}

function getLight(light = false) {
	return light ? 'bg-opacity-20' : '';
}

const closed = ref(false);

function handleClose() {
	emit('close');
	closed.value = true;
}

type Level = 'success' | 'warning' | 'error' | 'info' | 'none';
</script>
