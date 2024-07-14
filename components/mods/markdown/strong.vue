<template>
	<span :class="['font-bold', 'items-center', 'content-center', 'justify-start', { flex: isFlexDisplay, inline: !isFlexDisplay }]">
		<slot></slot>
	</span>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

// Se hai bisogno di tipizzare le props, puoi farlo così:
interface Props {
	// Aggiungi qui altre props se necessario
}

const props = defineProps<Props>();

// Ottieni il contenuto dello slot
const slots = useSlots();

// Calcola se il display dovrebbe essere flex o inline
const isFlexDisplay = computed(() => {
	const defaultSlot = slots.default?.();
	return defaultSlot && defaultSlot.length === 3;
});
</script>

<style scoped>
/* Puoi aggiungere stili aggiuntivi qui se necessario */
</style>
