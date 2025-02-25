<template>
	<div class="join">
		<VeeForm v-slot="{ errors }" :validation-schema="validationSchema" :initial-values="initialValues" @submit="handleSubmit">
			<div class="grid grid-cols-2 gap-4">
				<div class="fieldset w-full">
					<VeeField
						v-model="duration"
						:name="`${name}-duration`"
						type="number"
						:min="minDuration"
						:max="maxDuration"
						class="input"
						:class="{ 'input-error': errors[`${name}-duration`] || error }"
					/>
					<label class="label">
						<span v-if="errors[`${name}-duration`]" class="text-error">
							{{ errors[`${name}-duration`] }}
						</span>
						<span v-else-if="error" class="text-error">
							{{ error }}
						</span>
					</label>
				</div>

				<Select v-model="unit" label="Unit" :name="`${name}-unit`" :options="unitOptions" :required="true" />
			</div>
		</VeeForm>
	</div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Time } from '@sapphire/time-utilities';

interface DurationUnit {
	label: string;
	value: keyof typeof unitMap;
}

interface Props {
	value: number;
	min?: number;
	max?: number;
	name?: string;
}

const unitMap = {
	seconds: Time.Second,
	minutes: Time.Minute,
	hours: Time.Hour,
	days: Time.Day
} as const;

const props = withDefaults(defineProps<Props>(), {
	name: () => `duration-${Math.random().toString(36).slice(2)}`,
	min: 0,
	max: undefined
});

const emit = defineEmits<{
	'update:value': [value: number];
	change: [value: number];
}>();

const duration = ref(0);
const unit = ref<keyof typeof unitMap>('seconds');
const error = ref('');

const initialValues = computed(() => ({
	[`${props.name}-duration`]: duration.value,
	[`${props.name}-unit`]: unit.value
}));

const minDuration = computed(() => (props.min ? Math.floor(props.min / unitMap[unit.value]) : 0));

const maxDuration = computed(() => (props.max ? Math.floor(props.max / unitMap[unit.value]) : Infinity));

const validationSchema = computed(() =>
	toTypedSchema(
		z.object({
			[`${props.name}-duration`]: z
				.number()
				.min(minDuration.value, `Minimum value is ${minDuration.value}`)
				.max(maxDuration.value, `Maximum value is ${maxDuration.value}`),
			[`${props.name}-unit`]: z.enum(['seconds', 'minutes', 'hours', 'days'])
		})
	)
);

const unitOptions = computed<DurationUnit[]>(() =>
	Object.keys(unitMap).map((key) => ({
		label: key.charAt(0).toUpperCase() + key.slice(1),
		value: key as keyof typeof unitMap
	}))
);

const determineUnit = (ms: number): [number, keyof typeof unitMap] => {
	const units = Object.entries(unitMap);
	for (let i = 0; i < units.length; i++) {
		const [currentUnit, currentValue] = units[i] as [string, (typeof unitMap)[keyof typeof unitMap]];
		const nextValue = units[i + 1]?.[1];

		if (!nextValue || ms < nextValue) {
			return [Math.floor(ms / currentValue), currentUnit as keyof typeof unitMap];
		}
	}
	return [0, 'seconds'];
};

const validateValue = (ms: number): boolean => {
	const schema = z
		.number()
		.min(props.min || 0)
		.max(props.max || Infinity);

	const result = schema.safeParse(ms);
	if (!result.success) {
		error.value = result.error.errors[0]?.message ?? 'Invalid value';
		return false;
	}
	error.value = '';
	return true;
};

const updateValue = (newDuration: number, newUnit: keyof typeof unitMap) => {
	const ms = newDuration * unitMap[newUnit];
	if (validateValue(ms)) {
		duration.value = newDuration;
		unit.value = newUnit;
		emit('update:value', ms);
		emit('change', ms);
	}
};

watch([duration, unit], ([newDuration, newUnit]) => {
	updateValue(newDuration, newUnit);
});

onMounted(() => {
	const [initialDuration, initialUnit] = determineUnit(props.value);
	duration.value = initialDuration;
	unit.value = initialUnit;
});

const handleSubmit = (values: Record<string, number | keyof typeof unitMap>) => {
	const newDuration = values[`${props.name}-duration`] as number;
	const newUnit = values[`${props.name}-unit`] as keyof typeof unitMap;
	updateValue(newDuration, newUnit);
};
</script>

<style>
@reference "../../assets/css/main.css";

.input-error {
	@apply border-error;
}

.text-error {
	@apply text-error;
}
</style>
