<template>
	<div class="join">
		<button :class="['btn', { 'btn-error': error }]" :title="tooltipTitle" type="button" @click="openDialog">
			{{ label }}: {{ displayValue }}
			<img v-if="imageInName" :src="imageInName" alt="nuxt-icon" class="ml-2 inline-flex h-6 w-6" />
		</button>

		<div v-if="isOpen" class="modal modal-open">
			<div class="modal-box">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-bold">{{ label }}</h3>
					<button class="btn btn-sm btn-circle btn-ghost" type="button" @click="closeDialog">✕</button>
				</div>

				<VeeForm v-slot="{ errors }" :validation-schema="validationSchema" @submit="handleSubmit">
					<div class="fieldset w-full">
						<Field
							v-if="searchable && options.length > 10"
							v-model="search"
							name="search"
							type="text"
							class="input mb-4 w-full"
							placeholder="Search..."
						/>

						<div class="max-h-64 overflow-y-auto">
							<div v-for="option in filteredOptions" :key="option.value" class="fieldset">
								<label class="label cursor-pointer">
									<span class="flex items-center">
										{{ option.label }}
									</span>
									<nuxt-img v-if="option.iconUrl" :src="option.iconUrl" :alt="option.label" class="ml-2 h-6 w-6" />
									<Field
										type="checkbox"
										class="checkbox checkbox-primary"
										:name="props.name"
										:value="option.value"
										:checked="selectedValues.includes(option.value)"
										@change="toggleSelection(option.value)"
									/>
								</label>
							</div>
						</div>

						<ErrorMessage v-slot="{ message }" :name="props.name">
							<span class="text-error text-sm">{{ message }}</span>
						</ErrorMessage>

						<label v-if="helperText && !errors[props.name]" class="label">
							<span class="text-base-content/70">
								{{ helperText }}
							</span>
						</label>
					</div>

					<div class="modal-action">
						<button type="button" class="btn btn-ghost" @click="clearSelection">Clear</button>
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
import { Field, ErrorMessage, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

interface Option<T = string> {
	label: string;
	value: T;
	iconUrl?: string;
}

interface Props<T = string> {
	label: string;
	options: Option<T>[];
	value: T[];
	error?: boolean;
	helperText?: string;
	name?: string;
	tooltipTitle?: string;
	required?: boolean;
	placeholder?: string;
	searchable?: boolean;
	imageInName?: string;
}

const props = withDefaults(defineProps<Props>(), {
	error: false,
	name: () => `multi-select-${Math.random().toString(36).slice(2)}`,
	tooltipTitle: undefined,
	required: true,
	placeholder: undefined,
	searchable: true,
	imageInName: undefined
});

const emit = defineEmits<{
	(e: 'update:value' | 'change', value: Props['value']): void;
}>();

const isOpen = ref(false);
const search = ref('');
const validationSchema = toTypedSchema(props.required ? z.array(z.string()).min(1, 'At least one item must be selected') : z.array(z.string()));

const { value: fieldValue, errorMessage } = useField<string[]>(props.name, validationSchema);

const selectedValues = computed({
	get: () => fieldValue.value ?? [...props.value],
	set: (newValue) => {
		fieldValue.value = newValue;
	}
});

const filteredOptions = computed(() => {
	if (!search.value) return props.options;
	const searchLower = search.value.toLowerCase();
	return props.options.filter((item) => item.label.toLowerCase().includes(searchLower));
});

const displayValue = computed(() => {
	if (!selectedValues.value.length) return props.placeholder || 'Select...';
	return `${selectedValues.value.length} selected`;
});

const openDialog = () => {
	isOpen.value = true;
};

const closeDialog = () => {
	isOpen.value = false;
	search.value = '';
};

const toggleSelection = (value: Props['value'][number]) => {
	const currentValues = Array.isArray(selectedValues.value) ? [...selectedValues.value] : [];
	const index = currentValues.indexOf(value);

	if (index === -1) {
		selectedValues.value = [...currentValues, value];
	} else {
		currentValues.splice(index, 1);
		selectedValues.value = currentValues;
	}
};

const clearSelection = () => {
	selectedValues.value = [];
};

const handleSubmit = () => {
	emit('update:value', selectedValues.value);
	emit('change', selectedValues.value);
	closeDialog();
};

watch(
	() => props.value,
	(newValue) => {
		selectedValues.value = [...newValue];
	}
);
</script>

<style>
@reference "../../assets/css/main.css";

.modal-backdrop {
	@apply bg-black/50;
}

.checkbox:checked {
	@apply border-primary bg-primary;
}
</style>
