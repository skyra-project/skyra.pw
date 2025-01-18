<template>
	<div
		class="paper bg-secondary-light sticky mb-1 flex justify-between"
		:class="className"
		:style="[paperStyle, { top: useDevice().isMobile ? '34px' : '36px' }]"
	>
		<div class="mx-4 w-full">
			<input
				ref="inputRef"
				:placeholder="placeholder"
				:value="modelValue"
				@input="handleInput"
				@blur="handleBlur"
				@keyup="handleKeyUp"
				@focus="handleFocus"
				:disabled="disabled"
				class="input input-ghost w-full text-white focus:outline-none"
			/>
		</div>
		<button
			@click="handleRequestSearch"
			:disabled="disabled"
			class="btn btn-circle btn-ghost transition-all duration-200"
			:class="{ 'scale-0 opacity-0': !modelValue, 'scale-100 opacity-100': modelValue }"
		>
			<i class="fas fa-search text-white"></i>
		</button>
		<button
			@click="handleCancel"
			:disabled="disabled"
			class="btn btn-circle btn-ghost transition-all duration-200"
			:class="{ 'scale-0 opacity-0': !modelValue, 'scale-100 opacity-100': modelValue }"
		>
			<i class="fas fa-times text-white"></i>
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface Props {
	modelValue: string;
	cancelOnEscape?: boolean;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	paperStyle?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	cancelOnEscape: false,
	className: '',
	disabled: false,
	placeholder: '',
	paperStyle: () => ({})
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'cancelSearch'): void;
	(e: 'requestSearch', value: string): void;
	(e: 'focus', event: FocusEvent): void;
	(e: 'blur', event: FocusEvent): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const handleInput = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};

const handleBlur = (e: FocusEvent) => {
	emit('blur', e);
};

const handleFocus = (e: FocusEvent) => {
	emit('focus', e);
};

const handleCancel = () => {
	emit('update:modelValue', '');
	emit('cancelSearch');
};

const handleRequestSearch = () => {
	emit('requestSearch', props.modelValue);
};

const handleKeyUp = (e: KeyboardEvent) => {
	if (e.key === 'Enter') {
		handleRequestSearch();
	} else if (props.cancelOnEscape && e.key === 'Escape') {
		handleCancel();
	}
};

// Expose focus and blur methods
defineExpose({
	focus: () => inputRef.value?.focus(),
	blur: () => inputRef.value?.blur()
});

// Watch for external value changes
watch(
	() => props.modelValue,
	(newValue) => {
		if (inputRef.value) {
			inputRef.value.value = newValue;
		}
	}
);

onMounted(() => {
	if (inputRef.value) {
		inputRef.value.value = props.modelValue;
	}
});
</script>

<style scoped>
.paper {
	z-index: 1099; /* Adjust as needed */
	height: 48px; /* Equivalent to theme.spacing(6) */
}
</style>
