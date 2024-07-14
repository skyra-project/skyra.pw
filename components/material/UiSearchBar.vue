<template>
	<div class="bg-gray-800 relative flex items-center justify-between rounded-md p-2 shadow-md">
		<input
			v-model="innerValue"
			ref="inputRef"
			type="text"
			:placeholder="placeholder"
			@focus="handleFocus"
			@blur="handleBlur"
			@input="handleInput"
			@keyup="handleKeyUp"
			class="w-full bg-transparent text-white outline-none"
		/>
		<button
			@click="handleRequestSearch"
			:disabled="disabled"
			class="text-white transition-transform"
			:class="{ 'scale-0 opacity-0': innerValue === '' }"
		>
			<SearchIcon />
		</button>
		<button
			@click="handleCancel"
			:disabled="disabled"
			class="text-white transition-transform"
			:class="{ 'scale-0 opacity-0': innerValue === '' }"
		>
			<ClearIcon />
		</button>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { SearchIcon, ClearIcon } from '@heroicons/vue/solid';

const props = defineProps({
	cancelOnEscape: { type: Boolean, default: false },
	className: { type: String, default: '' },
	disabled: { type: Boolean, default: false },
	onCancelSearch: { type: Function },
	onRequestSearch: { type: Function },
	style: { type: Object, default: () => ({}) },
	onFocus: { type: Function },
	onBlur: { type: Function },
	onChange: { type: Function },
	onKeyUp: { type: Function },
	value: { type: String, default: '' },
	placeholder: { type: String, default: '' }
});

const innerValue = ref(props.value);
const inputRef = ref(null);

watch(
	() => props.value,
	(newValue) => {
		innerValue.value = newValue;
	}
);

const handleFocus = (e) => {
	if (props.onFocus) props.onFocus(e);
};

const handleBlur = (e) => {
	innerValue.value = innerValue.value.trim();
	if (props.onBlur) props.onBlur(e);
};

const handleInput = (e) => {
	innerValue.value = e.target.value;
	if (props.onChange) props.onChange(e.target.value);
};

const handleCancel = () => {
	innerValue.value = '';
	if (props.onCancelSearch) props.onCancelSearch();
};

const handleRequestSearch = () => {
	if (props.onRequestSearch) props.onRequestSearch(innerValue.value);
};

const handleKeyUp = (e) => {
	if (e.key === 'Enter') {
		handleRequestSearch();
	} else if (props.cancelOnEscape && e.key === 'Escape') {
		handleCancel();
	}
	if (props.onKeyUp) props.onKeyUp(e);
};
</script>

<style scoped>
.scale-0 {
	transform: scale(0);
	opacity: 0;
}
.opacity-0 {
	opacity: 0;
}
</style>
