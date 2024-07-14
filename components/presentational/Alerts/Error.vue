<template>
	<transition name="grow" mode="out-in">
		<div v-if="isOpen" class="fixed bottom-4 left-1/2 w-11/12 max-w-sm -translate-x-1/2 transform">
			<div class="alert alert-error shadow-lg">
				<div>
					<nuxt-icon name="mdi-alert-circle" class="h-6 w-6" />
					<div>
						<span class="font-bold">{{ errorText }}</span>
						<div>{{ errorSubText }}</div>
					</div>
				</div>
				<div class="flex-none">
					<button class="btn btn-ghost btn-sm" @click="closeAlert">
						<nuxt-icon name="mdi-cancel" class="h-6 w-6" />
					</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface ErrorAlertProps {
	errorText: string;
	errorSubText?: string;
	open?: boolean;
	setOpen?: (value: boolean) => void;
}

const props = defineProps<ErrorAlertProps>();

const isOpen = ref(props.open ?? false);

watch(
	() => props.open,
	(newVal) => {
		isOpen.value = newVal ?? false;
	}
);

const closeAlert = () => {
	isOpen.value = false;
	props.setOpen?.(false);
};
</script>

<style scoped>
.grow-enter-active,
.grow-leave-active {
	transition: opacity 0.5s;
}
.grow-enter,
.grow-leave-to {
	opacity: 0;
}
</style>
