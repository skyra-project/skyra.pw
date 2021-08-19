<template>
	<input
		type="checkbox"
		class="border border-gray-300 text-green-600 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200"
		:value="value"
		@change="$emit('update:value', getValue($event))"
	/>
</template>

<script setup lang="ts">
defineProps<{ value: boolean }>();
defineEmits<(event: 'update:value', value: boolean) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).checked;
}
</script>
