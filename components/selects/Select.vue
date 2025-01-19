<template>
	<div class="form-control w-full">
		<label :for="`label-for-${title}-select`" class="label">
			<span class="label-text">{{ title }}</span>
		</label>
		<select
			:id="`label-for-${title}-select`"
			v-model="selectedValue"
			class="select select-bordered w-full"
			:class="{ 'select-error': error }"
			v-bind="{ ...propsWithoutValue, onChange: undefined }"
			@change="handleChange"
		>
			<slot />
		</select>
		<span v-if="helperText" class="mt-1 text-xs">{{ helperText }}</span>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps } from 'vue';

interface SelectProps {
	title: string;
	onChange: (value: (string | number | null) | (string | null) | string | number) => void;
	value?: string | number | null;
	children?: Array<HTMLElement>;
	error?: boolean;
	fullWidth?: boolean;
	helperText?: string;
}

const props = defineProps<SelectProps>();

const selectedValue = ref<string | number | null>(props.value ?? '');

watch(
	() => props.value,
	(newValue) => {
		selectedValue.value = newValue ?? null;
	}
);

const handleChange = (event: Event) => {
	const target = event.target as HTMLSelectElement;
	const value = target.value;
	selectedValue.value = value;
	props.onChange(value);
};

const propsWithoutValue = computed(() => {
	const { value, ...rest } = props;
	return rest;
});
</script>

<style scoped>
.select-error {
	border-color: red;
}

.text-xs {
	font-size: 0.75rem;
}
</style>
