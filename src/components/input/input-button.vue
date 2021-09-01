<template>
	<button type="button" class="rounded-md p-2 focus:ring ring-offset-2" :class="getColors(level)">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
defineProps<{ level?: Level }>();

function getColors(level: Level = 'none') {
	switch (level) {
		case 'none':
			return 'hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10';
		case 'success':
			return 'bg-green-500 hover:bg-green-600 ring-green-600';
		case 'warning':
			return 'bg-yellow-500 hover:bg-yellow-600 ring-yellow-600';
		case 'error':
			return 'bg-red-500 hover:bg-red-600 ring-red-600';
		case 'info':
			return 'bg-blue-500 hover:bg-blue-600 ring-blue-600';
	}
}

type Level = 'success' | 'warning' | 'error' | 'info' | 'none';
</script>
