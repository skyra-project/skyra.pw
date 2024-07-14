<template>
	<div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
		<slot></slot>
		<transition name="fade">
			<div v-if="visible" :class="tooltipClasses">
				<slot name="title">{{ title }}</slot>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
	title: { type: String, required: true },
	placement: { type: String, default: 'top' },
	enterDelay: { type: Number, default: 300 }
});

const visible = ref(false);
let timeout;

const showTooltip = () => {
	timeout = setTimeout(() => {
		visible.value = true;
	}, props.enterDelay);
};

const hideTooltip = () => {
	clearTimeout(timeout);
	visible.value = false;
};

const tooltipClasses = computed(() => {
	let positionClasses = '';
	switch (props.placement) {
		case 'top':
			positionClasses = 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
			break;
		case 'bottom':
			positionClasses = 'top-full left-1/2 transform -translate-x-1/2 mt-2';
			break;
		case 'left':
			positionClasses = 'right-full top-1/2 transform -translate-y-1/2 mr-2';
			break;
		case 'right':
			positionClasses = 'left-full top-1/2 transform -translate-y-1/2 ml-2';
			break;
		default:
			positionClasses = 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
	}
	return `absolute bg-neutral text-neutral-content p-2 rounded-md shadow-lg ${positionClasses}`;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
