<template>
	<div class="flex flex-col space-y-4" v-bind="props">
		<div v-for="(child, index) in childElements" :key="index" class="grid-item">
			<slot :name="`child-${index}`" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface SimpleGridProps {
	gridItemProps?: Record<string, any>;
}

const props = defineProps<SimpleGridProps>();

const childElements = computed(() => {
	return Object.keys(props).filter((key) => key.startsWith('child-'));
});
</script>

<style scoped>
.grid-item {
	@apply space-y-4;
}
</style>
