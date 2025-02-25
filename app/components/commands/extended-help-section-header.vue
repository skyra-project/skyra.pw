<template>
	<div v-if="!isLoading" class="header-container mb-2 flex items-center">
		<component :is="icon" class="mr-2" />
		<div class="divider mx-2 h-full border-l border-gray-300"></div>
		<h3 class="header-text text-lg font-semibold">{{ header }}</h3>
	</div>
	<div v-else class="flex items-center gap-2">
		<USkeleton class="h-6 w-6 rounded-full" />
		<USkeleton class="h-6 w-48 rounded-lg" />
	</div>
</template>

<script lang="ts" setup>
interface ExtendedHelpSectionHeaderProps {
	icon: string;
	header: string;
	isLoading?: boolean;
}

withDefaults(defineProps<ExtendedHelpSectionHeaderProps>(), {
	isLoading: false
});
</script>
