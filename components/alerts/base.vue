<template>
	<div :class="alertClasses" role="alert">
		<slot />
	</div>
</template>

<script lang="ts" setup>
interface AlertProps {
	severity?: 'error' | 'warning' | 'info' | 'success';
	elevation?: number;
	variant?: 'filled' | 'outlined' | 'standard';
}

const props = defineProps<AlertProps>();

const alertClasses = computed(() => {
	const baseClasses = 'shadow-lg alert';
	const severityClasses = {
		error: 'alert-error',
		warning: 'alert-warning',
		info: 'alert-info',
		success: 'alert-success'
	};
	const variantClasses = {
		filled: '',
		outlined: 'alert-outline',
		standard: ''
	};

	return [baseClasses, severityClasses[props.severity || 'info'], variantClasses[props.variant || 'filled']].join(' ');
});
</script>

<style scoped>
/* Additional custom styles can be added here */
</style>
