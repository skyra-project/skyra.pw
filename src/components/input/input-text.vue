<template>
	<input
		type="text"
		class="border border-gray-300 text-gray-800 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200"
		:value="value"
		@input="$emit('update:value', getValue($event))"
	/>
</template>

<script setup lang="ts">
defineProps<{ value: string }>();
defineEmits<(event: 'update:value', value: string) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).value;
}
</script>
