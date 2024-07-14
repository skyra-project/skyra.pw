<template>
	<FormKit
		type="text"
		:name="name"
		:label="label"
		:value="value"
		:classes="{
			outer: 'mb-4',
			label: 'block mb-1 font-bold text-sm',
			inner: 'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
			input: 'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
			help: 'text-xs text-gray-500',
			messages: 'list-none p-0 mt-1 mb-0',
			message: 'text-red-500 mb-1 text-xs'
		}"
		:validation="validation"
		@input="handleInput"
	>
		<template #suffix>
			<button type="button" @click="togglePicker" class="text-gray-500 hover:text-gray-700 h-full bg-white px-2 focus:outline-none">
				<Icon v-if="!useDevice().isMobile" name="fa6-solid:eye-dropper" />
			</button>
		</template>
	</FormKit>

	<Teleport to="body">
		<div v-if="showPicker" @click.self="togglePicker" class="fixed inset-0 z-10 overflow-y-auto">
			<div class="flex min-h-screen items-center justify-center">
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="bg-gray-500 absolute inset-0 opacity-75"></div>
				</div>
				<div class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
					<div class="p-4">
						<div class="mb-4">
							<label for="color-input" class="mb-1 block text-sm font-bold">Enter Color:</label>
							<input
								id="color-input"
								v-model="inputColor"
								type="text"
								class="border-gray-300 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								@input="updateColor"
							/>
						</div>
						<div class="mb-4">
							<label class="mb-1 block text-sm font-bold">Selected Color:</label>
							<div class="h-10 w-full rounded-md" :style="{ backgroundColor: selectedColor }"></div>
						</div>
					</div>
					<button @click="setFieldValue" class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Select</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { parse, REGEXP } from '@/utils/Color';

interface Props {
	label: string;
	name: string;
	value?: string;
	validation?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['input']);

const showPicker = ref(false);
const togglePicker = () => (showPicker.value = !showPicker.value);

const inputColor = ref('');
const selectedColor = ref('');

const updateColor = () => {
	if (REGEXP.HEX.test(inputColor.value)) {
		selectedColor.value = inputColor.value;
	} else {
		try {
			const color = parse(inputColor.value);
			selectedColor.value = color.toString();
		} catch (error) {
			// Invalid color input, do nothing
		}
	}
};

const setFieldValue = () => {
	emit('input', selectedColor.value);
	togglePicker();
};

const handleInput = (value: string | undefined) => {
	emit('input', value || '');
};

watch(selectedColor, (newColor) => {
	if (REGEXP.HEX.test(newColor)) {
		inputColor.value = newColor;
	}
});
</script>
