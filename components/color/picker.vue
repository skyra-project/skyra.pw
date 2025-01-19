<template>
	<FormKit
		type="text"
		:name="name"
		:label="label"
		:value="modelValue"
		:classes="{
			outer: 'mb-4',
			label: 'block mb-1 font-bold text-sm',
			inner: 'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
			input: 'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400'
		}"
		:validation="validation"
		@input="handleInput"
	>
		<template #suffix>
			<button type="button" class="text-gray-500 hover:text-gray-700 h-full bg-white px-2 focus:outline-none" @click="togglePicker">
				<NuxtIcon name="fa6-solid:eye-dropper" />
			</button>
		</template>
	</FormKit>

	<Teleport to="body">
		<div v-if="showPicker" class="fixed inset-0 z-10 overflow-y-auto" @click.self="togglePicker">
			<div class="flex min-h-screen items-center justify-center">
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="bg-gray-500 absolute inset-0 opacity-75" />
				</div>

				<div class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-4 shadow-xl transition-all">
					<!-- Color Preview -->
					<div class="mb-4 h-24 rounded-lg" :style="{ backgroundColor: currentColor }">
						<div class="p-4 text-center text-white">
							<h3 class="text-2xl">{{ colorType }}</h3>
							<p class="mt-2 opacity-80">
								<span v-if="colorType === 'hsl'">{{ Math.round(h) }}, {{ Math.round(s) }}%, {{ Math.round(l) }}%</span>
								<span v-else-if="colorType === 'hex'">{{ hexColor }}</span>
								<span v-else-if="colorType === 'rgb'">{{ Math.round(r) }}, {{ Math.round(g) }}, {{ Math.round(b) }}</span>
							</p>
						</div>
					</div>

					<!-- Sliders -->
					<div class="space-y-4">
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
							:class="['rounded px-3 py-1', colorType === type ? 'bg-blue-500 text-white' : 'bg-gray-200']"
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

					<button class="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" @click="confirmColor">Conferma</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import tinycolor from 'tinycolor2';

// Props e emits
const props = defineProps<{
	modelValue?: string;
	name: string;
	label: string;
	validation?: string;
}>();

const emit = defineEmits(['update:modelValue']);

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
	if (colorType.value === 'hsl') {
		return `hsl(${h.value}, ${s.value}%, ${l.value}%)`;
	}
	return hexColor.value;
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
	emit('update:modelValue', currentColor.value);
	togglePicker();
};

const handleInput = (value: string) => {
	emit('update:modelValue', value);
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
.slider {
	@apply h-4 w-full cursor-pointer appearance-none bg-transparent;
}

.slider::-webkit-slider-thumb {
	@apply border-gray-300 h-4 w-4 cursor-pointer appearance-none rounded-full border bg-white;
}

.color-input {
	@apply border-gray-300 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
