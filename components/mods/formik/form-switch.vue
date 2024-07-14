<script setup lang="ts">
import { useField } from 'vee-validate';
import { useToggle } from '@vueuse/core';
import type { Path, FormikValues } from './types';

interface Props<T extends FormikValues> {
	name: Path<T>;
	title: string;
	description?: string;
	defaultValue?: boolean;
}

const props = withDefaults(defineProps<Props<FormikValues>>(), {
	defaultValue: false
});

const { value, handleChange, handleBlur, meta } = useField(props.name, undefined, {
	initialValue: props.defaultValue
});

const [isCheckedValue, toggleChecked] = useToggle(value.value ?? props.defaultValue);

const handleToggle = () => {
	toggleChecked();
	handleChange(isCheckedValue.value);
};
</script>

<template>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">
				{{ title }}
				<span v-if="description" class="text-sm text-base-content text-opacity-60">
					{{ description }}
				</span>
			</span>
			<input type="checkbox" :checked="isCheckedValue" @change="handleToggle" @blur="handleBlur" class="toggle toggle-primary" />
		</label>
	</div>
</template>
