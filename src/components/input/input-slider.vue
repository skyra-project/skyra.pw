<template>
	<input
		type="range"
		class="border w-full app border-gray-300 p-2 my-2 rounded-md focus:outline-none"
		:value="value"
		@change="$emit('update:value', getValue($event))"
	/>
</template>

<script setup lang="ts">
defineProps<{ value: number }>();
defineEmits<(event: 'update:value', value: number) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).valueAsNumber;
}
</script>
