<template>
	<div class="header-container mb-2 flex items-center">
		<component :is="icon" class="mr-2" />
		<div class="border-gray-300 divider mx-2 h-full border-l"></div>
		<h3 class="header-text text-lg font-semibold">{{ header }}</h3>
	</div>
</template>

<script lang="ts" setup>
interface ExtendedHelpSectionHeaderProps {
	icon: string; // Assuming icon is a string representing the component name
	header: string;
}

const props = defineProps<ExtendedHelpSectionHeaderProps>();
</script>
