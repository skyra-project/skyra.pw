<script setup lang="ts">
import { watch, computed } from 'vue';
import debounce from 'lodash/debounce';
import { Time } from '@/utils/wolfstarUtils';
import type { FormKitNode } from '@formkit/core';

export interface AutoSaveProps {
	submitDebounceMs?: number;
	form: FormKitNode;
}

const props = withDefaults(defineProps<AutoSaveProps>(), {
	submitDebounceMs: Time.Second
});

const debouncedSubmit = computed(() =>
	debounce(async () => {
		if (props.form.context?.state.valid) {
			await props.form.submit();
		}
	}, props.submitDebounceMs)
);

watch(
	() => props.form.context?.state,
	(state) => {
		if (state?.dirty) {
			debouncedSubmit.value();
		}
	},
	{ deep: true }
);
</script>

<template>
	<!-- Il componente non renderizza nulla -->
</template>
