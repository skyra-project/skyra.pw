<template>
	<div v-if="!isLoading" class="header-container mb-2 flex items-center">
		<component :is="icon" class="mr-2" />
		<div class="border-gray-300 divider mx-2 h-full border-l" />
		<h3 class="header-text text-lg font-semibold">{{ header }}</h3>
	</div>
	<div v-else class="flex items-center gap-2">
		<div class="h-6 w-6 animate-pulse rounded-full bg-base-300" />
		<div class="h-6 w-48 animate-pulse rounded-lg bg-base-300" />
	</div>
</template>

<script lang="ts" setup>
interface ExtendedHelpSectionHeaderProps {
	icon: string;
	header: string;
}

const props = defineProps<ExtendedHelpSectionHeaderProps>();
const isLoading = ref(false);
</script>
