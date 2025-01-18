<template>
	<div class="chip" :class="{ secondary: isSecondary }">
		<span>{{ text }}</span>
		<Icon :name="`mdi-${icon}`" class="ml-2" />
	</div>
</template>

<script setup lang="ts">
interface ChipProps {
	text: string;
	icon: string;
	isSecondary?: boolean;
}

withDefaults(defineProps<ChipProps>(), {
	isSecondary: false
});
</script>

<style scoped>
.chip {
	@apply flex items-center justify-between rounded-lg bg-primary p-2 px-4 text-white;
}

.chip.secondary {
	@apply bg-secondary;
}
</style>
