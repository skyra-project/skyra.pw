<template>
	<VeeForm v-slot="{ errors, values }" :validation-schema="validationSchema" :initial-values="initialData" @submit="onSubmit">
		<div class="flex flex-col gap-4 p-4">
			<slot name="fields" :errors="errors" :values="values"></slot>

			<div class="flex items-center gap-2">
				<button type="submit" class="btn btn-primary" :class="{ loading }" :disabled="loading">
					{{ submitLabel || 'Submit' }}
				</button>

				<div v-if="saveError" class="text-error text-sm">
					{{ saveError }}
				</div>
			</div>
		</div>
	</VeeForm>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useDebounceFn } from '@vueuse/core';
import type { z } from 'zod';
import { toast } from '@/lib/toast'; // Adjust the import path as needed

const props = defineProps<{
	schema: z.ZodObject<any>;
	initialData?: Record<string, unknown>;
	submitLabel?: string;
	autoSaveDelay?: number;
}>();

// Convert Zod schema to Vee-validate compatible schema
const validationSchema = toTypedSchema(props.schema);

const emit = defineEmits<{
	save: [data: Record<string, any>];
	error: [error: Error];
}>();

const loading = ref(false);
const saveError = ref<string | null>(null);

// Auto-save using VueUse's useDebounceFn
const autoSave = useDebounceFn(async (values: Record<string, any>) => {
	try {
		loading.value = true;
		saveError.value = null;

		emit('save', values);

		toast.success('Changes saved', {
			description: 'Your changes have been saved'
		});
	} catch (error) {
		saveError.value = error instanceof Error ? error.message : 'Save failed';
		emit('error', error as Error);

		toast.error('Error', {
			description: saveError.value
		});
	} finally {
		loading.value = false;
	}
}, props.autoSaveDelay || 2000);

// Watch form values and trigger auto-save
watch(
	() => props.initialData,
	(newValues) => {
		if (props.autoSaveDelay !== undefined && newValues) {
			autoSave(newValues);
		}
	},
	{ deep: true }
);

// Handle form submission
async function onSubmit(values: Record<string, unknown>) {
	try {
		loading.value = true;
		saveError.value = null;

		emit('save', values);

		toast.success('Success', {
			description: 'Form has been submitted successfully'
		});
	} catch (error) {
		saveError.value = error instanceof Error ? error.message : 'Save failed';
		emit('error', error as Error);

		toast.error('Error', {
			description: saveError.value
		});
	} finally {
		loading.value = false;
	}
}
</script>
