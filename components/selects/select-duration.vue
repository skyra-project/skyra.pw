<template>
	<div class="mb-3">
		<input
			v-model="duration"
			:class="['input input-bordered', { 'input-error': error }]"
			type="tel"
			placeholder="Duration"
			@change="onChangeDuration"
		/>
		<p v-if="error" class="text-error">{{ error }}</p>
		<Select :title="error ? '' : 'Duration unit'" :options="unitOptions" :value="unit" :error="!!error" @change="onChangeUnit" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Select from './select.vue';

interface UnitOption {
	name: string;
	value: string;
}

const props = defineProps<{
	value: number | null;
	min: number;
	max?: number | null;
	onChange: (value: number) => void;
}>();

const unitMap: Record<string, number> = {
	seconds: 1000,
	minutes: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24
};

const unitOptions: UnitOption[] = Object.keys(unitMap).map((unit) => ({
	name: unit.charAt(0).toUpperCase() + unit.slice(1),
	value: unit
}));

const determineUnit = (ms: number): [number, string] => {
	for (let i = 0; i < unitOptions.length; i++) {
		const nextDuration = unitMap[unitOptions[i + 1]?.value as keyof typeof unitMap];
		if (ms < nextDuration || i === unitOptions.length - 1) {
			return [Math.floor(ms / unitMap[unitOptions[i].value as keyof typeof unitMap]), unitOptions[i].value];
		}
	}
	return [0, 'seconds'];
};

const [inputDuration, inputUnit] = determineUnit(props.value ?? 0);
const duration = ref<number>(inputDuration);
const unit = ref<string>(inputUnit);
const error = ref<string>('');

const change = (ms: number | string) => {
	if (typeof ms === 'string') {
		ms = parseInt(ms, 10);
	}
	if (props.min && ms < props.min) {
		error.value = `The minimum duration is ${determineUnit(props.min).join(' ')}.`;
		return;
	}
	if (props.max && ms > props.max) {
		error.value = `The maximum duration is ${determineUnit(props.max).join(' ')}.`;
		return;
	}
	error.value = '';
	props.onChange(ms);
};

const onChangeDuration = (e: Event) => {
	const target = e.target as HTMLInputElement;
	const newDuration = parseInt(target.value, 10);
	duration.value = newDuration;
	change(newDuration * unitMap[unit.value]);
};

const onChangeUnit = (newUnit: string | number | null) => {
	if (typeof newUnit === 'string') {
		unit.value = newUnit;
		change(duration.value * unitMap[newUnit]);
	}
};
</script>

<style scoped>
.input-error {
	border-color: red;
}
.text-error {
	color: red;
}
</style>
