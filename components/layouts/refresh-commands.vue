<script setup lang="ts">
import { ref, computed } from 'vue';
import { useScroll } from '@vueuse/core';
import type { FlattenedCommand } from '~/utils/types/ApiData';

// Props
const props = defineProps<{
	commands: FlattenedCommand[];
	isLoading?: boolean;
	onRefresh: () => Promise<void>;
}>();

const emit = defineEmits<{
	(e: 'refresh'): void;
}>();

// State
const disabled = ref(props.isLoading || false);
const { y } = useScroll(window);
const trigger = computed(() => y.value > 100);

// Gestione click
const handleClick = async () => {
	if (disabled.value) return;

	try {
		disabled.value = true;
		await props.onRefresh();
		emit('refresh');
	} catch (err) {
		console.error('Errore refresh:', err);
	} finally {
		disabled.value = false;
	}
};

const tooltipText = `
  Click to force refresh commands
  Note: If this button is not clickable (greyed out) then you've ran into a rate limit.
  You can try refreshing again at a later time.
`;
</script>

<template>
	<div class="fixed bottom-2 right-2 z-50" :class="{ 'right-8': trigger }">
		<button
			@click="handleClick"
			class="btn btn-circle btn-primary"
			:class="{ 'btn-disabled': disabled }"
			:disabled="disabled"
			:data-tip="tooltipText"
		>
			<i class="i-mdi-cached"></i>
		</button>
	</div>
</template>

<style scoped>
.btn-circle {
	@apply h-14 w-14;
}
</style>
