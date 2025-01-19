<template>
	<div class="fixed inset-0 z-50">
		<div class="fixed inset-0 bg-black opacity-50" @click="handleClick" />
		<div ref="scrollLockRef" class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
			<FormKit
				type="color"
				:value="value"
				:classes="{
					outer: 'relative',
					input: 'input input-bordered',
					message: 'text-error',
					help: 'label-text-alt'
				}"
				:validation="undefined"
				:alpha="false"
				@input="(value: unknown) => handleChange(value as string)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

interface ColorPickerDialogProps {
	value?: string;
	onChange?: (value: string) => void;
	onClick?: () => void;
}

const props = defineProps<ColorPickerDialogProps>();

const scrollLockRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
	if (scrollLockRef.value) {
		disableBodyScroll(scrollLockRef.value);
	}
});

onBeforeUnmount(() => {
	clearAllBodyScrollLocks();
});

const handleChange = (value: string) => {
	props.onChange?.(value);
};

const handleClick = () => {
	props.onClick?.();
};
</script>
