<template>
	<span class="tag" :style="tagStyle">@<slot /></span>
</template>

<script setup>
const { theme } = useThemeStore();

const tagStyle = computed(() => {
	if (theme === 'dark') {
		return {
			backgroundColor: 'hsl(235 85.6% 64.7% / 0.3)',
			color: 'hsl(235 86.2% 88.6% / 1)'
		};
	} else {
		return {
			backgroundColor: 'hsl(235 85.6% 64.7% / 0.1)',
			color: 'hsl(235 86.2% 64.7% / 1)'
		};
	}
});
</script>

<style scoped>
.tag {
	@apply cursor-pointer rounded-md px-0.5;
	transition:
		background-color 0.3s,
		color 0.3s;
}

.tag:hover {
	background-color: hsl(235 85.6% 64.7% / 1) !important;
	color: hsl(0 0 100% / 1) !important;
}
</style>
