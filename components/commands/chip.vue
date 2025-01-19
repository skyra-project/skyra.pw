<template>
	<div v-if="!loading" class="chip" :class="{ secondary: isSecondary }">
		<span>{{ text }}</span>
		<NuxtIcon :name="`mdi-${icon}`" class="ml-2" />
	</div>
	<div v-else class="chip skeleton">
		<span class="w-20">&nbsp;</span>
		<div class="ml-2 h-4 w-4" />
	</div>
</template>

<script setup lang="ts">
interface ChipProps {
	text: string;
	icon: string;
	isSecondary?: boolean;
	loading?: boolean;
}

withDefaults(defineProps<ChipProps>(), {
	isSecondary: false,
	loading: false
});
</script>

<style scoped>
.chip {
	@apply flex items-center justify-between rounded-lg bg-primary p-2 px-4 text-white;
}

.chip.secondary {
	@apply bg-secondary;
}

.chip.skeleton {
	@apply animate-pulse bg-base-300 text-transparent;
}
</style>
