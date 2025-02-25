<template>
	<Transition name="fade">
		<div v-if="isOpen" class="fixed inset-0 z-50" role="dialog" aria-modal="true" :aria-labelledby="`${name}-title`">
			<div class="fixed inset-0 bg-black/50" @click="handleClose"></div>

			<div ref="scrollLockRef" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
				<div class="bg-base-100 w-full max-w-md rounded-lg shadow-xl">
					<!-- Header -->
					<div class="flex items-center justify-between border-b p-4">
						<h3 :id="`${name}-title`" class="text-xl font-medium">
							<div class="flex items-center gap-2">
								<nuxt-icon name="fa6-solid:palette" class="h-5 w-5" />
								Choose Color
							</div>
						</h3>
						<button type="button" class="btn btn-ghost btn-sm btn-circle" aria-label="Close dialog" @click="handleClose">
							<nuxt-icon name="fa6-solid:xmark" class="h-5 w-5" />
						</button>
					</div>

					<div class="p-4">
						<VeeForm :validation-schema="validationSchema" @submit="handleConfirm">
							<VeeField v-slot="{ field, errors }" :name="name">
								<div class="flex flex-col gap-4 p-4">
									<!-- Color Preview -->
									<div class="relative h-24 rounded-lg" :style="{ backgroundColor: selectedColor }">
										<div class="absolute right-2 bottom-2">
											<nuxt-icon name="fa6-solid:eye-dropper" class="h-5 w-5 text-white opacity-75" />
										</div>
									</div>

									<!-- Color Picker -->
									<div class="relative">
										<FormKit
											type="color"
											v-bind="field"
											:value="selectedColor"
											:classes="{
												outer: 'relative',
												input: ['input  w-full', { 'input-error': errors }],
												message: 'text-error text-sm mt-1',
												help: ''
											}"
											:validation="undefined"
											:alpha="false"
											@input="handleChange"
										/>
										<div class="absolute top-1/2 right-2 -translate-y-1/2">
											<nuxt-icon name="fa6-solid:circle-half-stroke" class="text-base-content h-5 w-5 opacity-50" />
										</div>
									</div>

									<div v-if="errors" class="text-error flex items-center gap-2 text-sm">
										<nuxt-icon name="fa6-solid:circle-exclamation" class="h-4 w-4" />
										{{ errors }}
									</div>
								</div>
							</VeeField>

							<!-- Actions -->
							<div class="modal-action mt-6">
								<button type="button" class="btn btn-ghost gap-2" @click="handleClose">
									<nuxt-icon name="fa6-solid:xmark" class="h-4 w-4" />
									Cancel
								</button>
								<button type="submit" class="btn btn-primary gap-2">
									<nuxt-icon name="fa6-solid:check" class="h-4 w-4" />
									Confirm
								</button>
							</div>
						</VeeForm>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useScroll } from '@vueuse/core';

interface ColorPickerDialogProps {
	isOpen: boolean;
	value?: string;
	name?: string;
	required?: boolean;
	onChange?: (value: string) => void;
	onClose?: () => void;
}

const props = withDefaults(defineProps<ColorPickerDialogProps>(), {
	value: '#000000',
	name: () => `color-${Math.random().toString(36).slice(2)}`,
	required: true
});

const emit = defineEmits<{
	(e: 'update:value' | 'change', value: string): void;
	(e: 'close'): void;
}>();

const scrollLockRef = ref<HTMLElement | null>(null);
const { y } = useScroll(scrollLockRef);
const selectedColor = ref(props.value);

const validationSchema = computed(() =>
	toTypedSchema(
		z.object({
			[props.name]: props.required
				? z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color')
				: z
						.string()
						.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color')
						.optional()
		})
	)
);

watch(y, () => {
	if (scrollLockRef.value) {
		scrollLockRef.value.scrollTop = 0;
	}
});

const handleClose = () => {
	emit('close');
	props.onClose?.();
};

const handleChange = (value: string) => {
	selectedColor.value = value;
	emit('update:value', value);
	emit('change', value);
	props.onChange?.(value);
};

const handleConfirm = () => {
	emit('update:value', selectedColor.value);
	emit('change', selectedColor.value);
	props.onChange?.(selectedColor.value);
	handleClose();
};

// Reset color when dialog opens
watch(
	() => props.isOpen,
	(newValue) => {
		if (newValue) {
			selectedColor.value = props.value;
		}
	}
);

// Watch for external value changes
watch(
	() => props.value,
	(newValue) => {
		selectedColor.value = newValue;
	}
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
