<template>
	<select
		class="border border-gray-300 text-gray-800 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200"
		:value="value"
		@input="$emit('update:value', getValue($event))"
	>
		<option v-for="option in options" :key="option.name" :value="option.value">{{ option.name }}</option>
	</select>
</template>

<script setup lang="ts">
defineProps<{ value: string; options: readonly Option[] }>();
defineEmits<(event: 'update:value', value: string) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).value;
}

export interface Option {
	name: string;
	value: string;
}
</script>
