<template>
	<div class="relative">
		<button
			type="button"
			class="btn w-full"
			:class="{ 'btn-error': error }"
			:title="tooltipTitle"
			:aria-label="label"
			:aria-expanded="isOpen"
			@click="openDialog"
		>
			<span class="flex items-center">
				{{ label }}: {{ displayValue }}
				<img v-if="imageInName" :src="imageInName" :alt="label" class="ml-2 h-8 w-8" />
			</span>
		</button>

		<Transition name="fade">
			<div
				v-if="isOpen"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
				role="dialog"
				aria-modal="true"
				:aria-labelledby="`${name}-title`"
			>
				<div class="w-full max-w-md rounded-lg bg-white shadow-xl" @keydown.esc="closeDialog">
					<div class="flex items-center justify-between border-b p-4">
						<h3 :id="`${name}-title`" class="text-xl font-medium">
							{{ label }}
						</h3>
						<button type="button" class="btn btn-ghost btn-sm btn-circle" aria-label="Close dialog" @click="closeDialog">✕</button>
					</div>

					<div class="p-4">
						<VeeForm v-slot="{ errors }" :validation-schema="validationSchema" @submit="handleSubmit">
							<VeeField
								v-if="searchable && options.length > 10"
								v-model="search"
								name="search"
								type="search"
								placeholder="Search..."
								class="input"
								:class="{ 'input-error': errors.search }"
							/>

							<div class="mt-4 max-h-64 overflow-y-auto" role="listbox" :aria-label="label">
								<ul class="divide-y divide-gray-100">
									<li
										v-for="item in filteredOptions"
										:key="item.value"
										class="flex cursor-pointer items-center p-2 hover:bg-gray-50"
										:class="{ 'bg-primary/10': selectedValue === item.value }"
										role="option"
										:aria-selected="selectedValue === item.value"
										@click="selectItem(item.value)"
									>
										<span>{{ item.label }}</span>
										<img v-if="item.iconUrl" :src="item.iconUrl" :alt="`${item.label} icon`" class="ml-2 h-8 w-8" />
									</li>
								</ul>
							</div>

							<div class="mt-4 flex justify-end gap-2">
								<button v-if="!required" type="button" class="btn btn-ghost" @click="handleReset">Clear</button>
								<button type="submit" class="btn btn-primary">Confirm</button>
							</div>
						</VeeForm>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
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
	value?: T;
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
	value: undefined,
	error: false,
	name: () => `one-select-${Math.random().toString(36).slice(2)}`,
	tooltipTitle: undefined,
	required: true,
	placeholder: undefined,
	searchable: true,
	imageInName: undefined
});

const emit = defineEmits<{
	'update:value': [value: Props['value']];
	change: [value: Props['value']];
	reset: [];
}>();

const isOpen = ref(false);
const search = ref('');
const selectedValue = ref<Props['value']>(props.value);

const validationSchema = computed(() =>
	toTypedSchema(
		z.object({
			[props.name]: props.required ? z.string().min(1, 'This field is required') : z.string().optional(),
			search: z.string().optional()
		})
	)
);

const filteredOptions = computed(() => {
	if (!search.value) return props.options;
	const searchLower = search.value.toLowerCase();
	return props.options.filter((item) => item.label.toLowerCase().includes(searchLower));
});

const displayValue = computed(() => {
	const option = props.options.find((opt) => opt.value === selectedValue.value);
	return option?.label ?? props.placeholder ?? 'Select...';
});

const openDialog = () => {
	isOpen.value = true;
	search.value = '';
};

const closeDialog = () => {
	isOpen.value = false;
	search.value = '';
};

const selectItem = (value: Props['value']) => {
	selectedValue.value = value;
};

const handleSubmit = () => {
	if (selectedValue.value !== undefined) {
		emit('update:value', selectedValue.value);
		emit('change', selectedValue.value);
		closeDialog();
	}
};

const handleReset = () => {
	selectedValue.value = undefined;
	emit('reset');
	closeDialog();
};

watch(
	() => props.value,
	(newValue) => {
		selectedValue.value = newValue;
	}
);

// Cleanup on unmount
onUnmounted(() => {
	if (isOpen.value) {
		closeDialog();
	}
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
