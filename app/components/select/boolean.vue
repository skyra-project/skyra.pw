<template>
	<SelectBase
		:label="title"
		:options="options"
		:value="modelValue"
		:error="error"
		:helper-text="description"
		:name="name"
		:tooltip-title="tooltipTitle"
		:required="true"
		@update:value="handleChange"
		@change="handleChange"
	/>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	modelValue: boolean;
	description?: string;
	error?: boolean;
	name?: string;
	tooltipTitle?: string;
}

withDefaults(defineProps<Props>(), {
	name: () => `boolean-${Math.random().toString(36).slice(2)}`,
	tooltipTitle: undefined,
	error: false
});

const emit = defineEmits<{
	(e: 'update:modelValue' | 'change', value: boolean): void;
}>();

const options = [
	{ label: 'Yes', value: true },
	{ label: 'No', value: false }
];

const handleChange = (value: boolean) => {
	emit('update:modelValue', value);
	emit('change', value);
};
</script>

<style>
@reference "../../assets/css/main.css";
</style>
