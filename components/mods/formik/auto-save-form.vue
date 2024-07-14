<script setup lang="ts">
import { provide, ref, h } from 'vue';
import { FormKit } from '@formkit/vue';
import { Time } from '@/utils/wolfstarUtils';
import AutoSave from '@/components/mods/formik/auto-save.vue';
import type { FormikValues, UnpackNestedValue } from './types';

export interface AutoSavingFormProps<T extends FormikValues> {
	initialValues: UnpackNestedValue<T>;
	validationSchema: Record<string, any>;
	submitDebounceMs?: number;
	onSubmit: (values: UnpackNestedValue<T>) => Promise<any> | void;
}

const props = withDefaults(defineProps<AutoSavingFormProps<FormikValues>>(), {
	submitDebounceMs: Time.Second
});

const formRef = ref();

provide('form', formRef);

const slots = useSlots();

interface FormKitProps {
	type: string;
	value: UnpackNestedValue<FormikValues>;
	validationSchema: Record<string, any>;
	actions: {
		submit: (values: UnpackNestedValue<FormikValues>) => Promise<any> | void;
	};
}

const formProps: FormKitProps = {
	type: 'form',
	value: props.initialValues,
	validationSchema: props.validationSchema,
	actions: {
		submit: props.onSubmit
	}
};

const renderForm = () =>
	h(
		FormKit as Component,
		{
			...formProps,
			ref: formRef
		},
		[
			h(AutoSave, {
				submitDebounceMs: props.submitDebounceMs,
				form: formRef.value
			}),
			slots.default?.()
		]
	);
</script>

<template>
	<component :is="renderForm" />
</template>
