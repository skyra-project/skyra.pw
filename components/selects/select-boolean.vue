<template>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">{{ title }}</span>
			<input type="checkbox" class="toggle toggle-primary" :checked="currentValue" @change="handleChange" />
		</label>
		<p v-if="description" class="mt-1 text-xs">{{ description }}</p>
	</div>
</template>

<script setup lang="ts">
interface SelectBooleanProps {
	title: string;
	currentValue: boolean;
	description?: string;
	onChange: (checked: boolean) => void;
	FormControlLabelProps?: Record<string, any>;
}

const props = defineProps<SelectBooleanProps>();

const handleChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	props.onChange(target.checked);
};
</script>

<style scoped>
.text-xs {
	font-size: 0.75rem;
}
</style>
