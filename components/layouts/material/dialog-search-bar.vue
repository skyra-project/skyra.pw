<template>
	<div class="mx-5 my-0 flex items-center p-3">
		<NuxtIcon name="mdi-magnify" class="mr-5" />
		<input
			v-bind="otherProps"
			autofocus
			autocapitalize="false"
			autocomplete="off"
			autocorrect="false"
			results="4"
			placeholder="Search…"
			aria-label="search input"
			class="input input-bordered w-full"
			@input="handleInput"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface InputBaseProps {
	onChange?: (event: Event) => void;
	[key: string]: any;
}

const props = defineProps<InputBaseProps>();
const emit = defineEmits(['change']);

const handleInput = (event: Event) => {
	if (props.onChange) {
		props.onChange(event);
	}
	emit('change', event);
};

const { onChange, ...otherProps } = props;
</script>

<style scoped>
.input {
	@apply w-full;
}
</style>
