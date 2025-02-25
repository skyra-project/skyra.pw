<template>
	<VeeForm :validation-schema="validationSchema" @submit="onSubmit">
		<div class="mb-4">
			<div class="fieldset w-full">
				<label class="label">
					{{ label }}
				</label>

				<div class="flex">
					<VeeField v-slot="{ field, errors }" v-model="state[name]" :name="name">
						<div class="join w-full">
							<input v-bind="field" class="input join-item w-full" :class="{ 'input-error': errors.length }" />
							<button type="button" class="btn join-item" @click="togglePicker">
								<i class="fas fa-eye-dropper"></i>
							</button>
						</div>

						<label class="label">
							<span v-if="errors" class="text-error">
								{{ errors }}
							</span>
						</label>
					</VeeField>
				</div>
			</div>
		</div>

		<Teleport to="body">
			<div v-if="showPicker" class="modal modal-open">
				<div class="modal-box">
					<!-- Color Preview -->
					<div class="mb-4 h-24 rounded-lg" :style="{ backgroundColor: currentColor }">
						<div class="p-4 text-center text-white">
							<h3 class="text-2xl">{{ colorType }}</h3>
							<p class="mt-2 opacity-80">
								<span v-if="colorType === 'hsl'"> {{ Math.round(h) }}, {{ Math.round(s) }}%, {{ Math.round(l) }}% </span>
								<span v-else-if="colorType === 'hex'">
									{{ hexColor }}
								</span>
								<span v-else-if="colorType === 'rgb'"> {{ Math.round(r) }}, {{ Math.round(g) }}, {{ Math.round(b) }} </span>
							</p>
						</div>
					</div>

					<!-- Sliders -->
					<div class="flex flex-col gap-4 p-4">
						<div class="slider-container">
							<div class="h-4 rounded-full" :style="gradientH">
								<input v-model="h" type="range" min="0" max="360" class="slider" />
							</div>
						</div>

						<div class="slider-container">
							<div class="h-4 rounded-full" :style="gradientS">
								<input v-model="s" type="range" min="0" max="100" class="slider" />
							</div>
						</div>

						<div class="slider-container">
							<div class="h-4 rounded-full" :style="gradientL">
								<input v-model="l" type="range" min="0" max="100" class="slider" />
							</div>
						</div>
					</div>

					<!-- Color Type Switcher -->
					<div class="mt-4 flex gap-2">
						<button
							v-for="type in ['hsl', 'rgb', 'hex']"
							:key="type"
							:class="['btn btn-sm', colorType === type ? 'btn-primary' : 'btn-ghost']"
							@click="colorType = type"
						>
							{{ type.toUpperCase() }}
						</button>
					</div>

					<!-- Color Input Fields -->
					<div class="mt-4">
						<div v-if="colorType === 'hsl'" class="grid grid-cols-3 gap-2">
							<input v-model="h" type="number" min="0" max="360" class="color-input" placeholder="H" />
							<input v-model="s" type="number" min="0" max="100" class="color-input" placeholder="S" />
							<input v-model="l" type="number" min="0" max="100" class="color-input" placeholder="L" />
						</div>

						<div v-else-if="colorType === 'rgb'" class="grid grid-cols-3 gap-2">
							<input v-model="r" type="number" min="0" max="255" class="color-input" placeholder="R" />
							<input v-model="g" type="number" min="0" max="255" class="color-input" placeholder="G" />
							<input v-model="b" type="number" min="0" max="255" class="color-input" placeholder="B" />
						</div>

						<div v-else class="flex">
							<input v-model="hexColor" type="text" class="color-input w-full" placeholder="Hex Color" />
						</div>
					</div>

					<div class="modal-action">
						<button type="button" class="btn" @click="togglePicker">Cancel</button>
						<button type="button" class="btn btn-primary" @click="confirmColor">Confirm</button>
					</div>
				</div>
				<div class="modal-backdrop" @click="togglePicker"></div>
			</div>
		</Teleport>
	</VeeForm>
</template>

<script setup lang="ts">
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ref, computed, watch, reactive } from 'vue';
import tinycolor from 'tinycolor2';

interface Props {
	modelValue?: string;
	name: string;
	label: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const state = reactive({
	[props.name]: props.modelValue || ''
});

const validationSchema = computed(() =>
	toTypedSchema(
		z.object({
			[props.name]: z.string().regex(
				/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$|^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/,

				'Enter a valid color (hex, rgb or hsl)'
			)
		})
	)
);

// Form submission handler
const onSubmit = () => {
	emit('update:modelValue', state[props.name]);
};

// Stato
const showPicker = ref(false);
const colorType = ref('hsl');
const h = ref(0);
const s = ref(100);
const l = ref(50);
const r = ref(255);
const g = ref(0);
const b = ref(0);
const hexColor = ref('#ff0000');

// Computed
const currentColor = computed(() => {
	switch (colorType.value) {
		case 'hsl':
			return `hsl(${h.value}, ${s.value}%, ${l.value}%)`;
		case 'rgb':
			return `rgb(${Math.round(r.value)}, ${Math.round(g.value)}, ${Math.round(b.value)})`;
		default:
			return hexColor.value;
	}
});

const gradientH = computed(() => ({
	backgroundImage: `linear-gradient(to right,
    hsl(0, ${s.value}%, ${l.value}%),
    hsl(60, ${s.value}%, ${l.value}%),
    hsl(120, ${s.value}%, ${l.value}%),
    hsl(180, ${s.value}%, ${l.value}%),
    hsl(240, ${s.value}%, ${l.value}%),
    hsl(300, ${s.value}%, ${l.value}%),
    hsl(360, ${s.value}%, ${l.value}%))`
}));

const gradientS = computed(() => ({
	backgroundImage: `linear-gradient(to right,
    hsl(${h.value}, 0%, ${l.value}%),
    hsl(${h.value}, 100%, ${l.value}%))`
}));

const gradientL = computed(() => ({
	backgroundImage: `linear-gradient(to right,
    hsl(${h.value}, ${s.value}%, 0%),
    hsl(${h.value}, ${s.value}%, 50%),
    hsl(${h.value}, ${s.value}%, 100%))`
}));

// Methods
const togglePicker = () => {
	showPicker.value = !showPicker.value;
};

const confirmColor = () => {
	state[props.name] = currentColor.value;
	onSubmit();
	togglePicker();
};

// Watch per sincronizzare i formati colore
watch([h, s, l], () => {
	const color = tinycolor(`hsl(${h.value}, ${s.value}%, ${l.value}%)`);
	const rgb = color.toRgb();
	r.value = rgb.r;
	g.value = rgb.g;
	b.value = rgb.b;
	hexColor.value = color.toHexString();
});

watch([r, g, b], () => {
	const color = tinycolor(`rgb(${r.value}, ${g.value}, ${b.value})`);
	const hsl = color.toHsl();
	h.value = hsl.h;
	s.value = hsl.s * 100;
	l.value = hsl.l * 100;
	hexColor.value = color.toHexString();
});

watch(hexColor, () => {
	const color = tinycolor(hexColor.value);
	if (color.isValid()) {
		const hsl = color.toHsl();
		h.value = hsl.h;
		s.value = hsl.s * 100;
		l.value = hsl.l * 100;
		const rgb = color.toRgb();
		r.value = rgb.r;
		g.value = rgb.g;
		b.value = rgb.b;
	}
});
</script>

<style scoped>
@reference "../assets/css/main.css";

.slider {
	@apply h-4 w-full cursor-pointer appearance-none bg-transparent;
}

.slider::-webkit-slider-thumb {
	@apply h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white;
}

.modal-backdrop {
	@apply bg-black/50;
}

.color-input {
	@apply border-gray-300 rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500;
}
</style>
