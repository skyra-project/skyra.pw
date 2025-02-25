<template>
	<div class="join">
		<button :class="['btn', { 'btn-error': error }]" :title="tooltipTitle" type="button" @click="openDialog">
			{{ label }}: {{ displayValue }}
		</button>

		<div v-if="isOpen" class="modal modal-open">
			<div class="modal-box">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-bold">{{ label }}</h3>
					<button class="btn btn-sm btn-circle btn-ghost" type="button" @click="closeDialog">✕</button>
				</div>

				<VeeForm v-slot="{ errors }" :validation-schema="validationSchema" @submit="handleSubmit">
					<div class="fieldset w-full">
						<VeeField
							v-model="selectedValue"
							:name="name"
							as="select"
							class="select w-full"
							:class="{ 'select-error': errors[name] || error }"
						>
							<option value="" disabled>{{ placeholder || `Select ${label}` }}</option>
							<option v-for="option in options" :key="option.value" :value="option.value">
								{{ option.label }}
							</option>
						</VeeField>

						<label class="label">
							<span v-if="errors[name]" class="text-error">
								{{ errors[name] }}
							</span>
							<span v-else-if="helperText" class="">
								{{ helperText }}
							</span>
						</label>
					</div>

					<div class="modal-action">
						<button type="button" class="btn" @click="closeDialog">Cancel</button>
						<button type="submit" class="btn btn-primary">Confirm</button>
					</div>
				</VeeForm>
			</div>
			<div class="modal-backdrop" @click="closeDialog"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

interface Option<T = string | number> {
	label: string;
	value: T;
}

interface Props<T = string | number> {
	label: string;
	options: Option<T>[];
	value?: T | null;
	error?: boolean;
	helperText?: string;
	name?: string;
	tooltipTitle?: string;
	required?: boolean;
	placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	error: false,
	name: () => `select-${Math.random().toString(36).slice(2)}`,
	tooltipTitle: undefined,
	required: true,
	placeholder: undefined
});

const emit = defineEmits<{
	(e: 'update:value' | 'change', value: Props['value'] | null): void;
}>();

const isOpen = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedValue = ref<any>(props.value);

const validationSchema = computed(() =>
	toTypedSchema(
		z.object({
			[props.name]: props.required ? z.string().min(1, 'This field is required') : z.string().optional()
		})
	)
);

const displayValue = computed(() => {
	const option = props.options.find((opt) => opt.value === selectedValue.value);
	return option?.label ?? (props.placeholder || 'Select...');
});

const openDialog = () => {
	isOpen.value = true;
};

const closeDialog = () => {
	isOpen.value = false;
};

const handleSubmit = () => {
	emit('update:value', selectedValue.value);
	emit('change', selectedValue.value);
	closeDialog();
};

watch(
	() => props.value,
	(newValue) => {
		selectedValue.value = newValue;
	}
);
</script>

<style>
@reference "../../assets/css/main.css";
.modal-backdrop {
	@apply bg-black/50;
}
</style>
