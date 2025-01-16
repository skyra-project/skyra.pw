<template>
	<div class="bg-gray-800 rounded-lg p-6 shadow-lg">
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			<PresentationalGuildCard v-for="guild in filteredGuilds" :key="guild.id" :guild="guild" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TransformedLoginData } from '~/types/ApiData';

interface FilteredGuildCardsProps {
	pack: TransformedLoginData | null;
}

const props = defineProps<FilteredGuildCardsProps>();

const filteredGuilds = computed(() => {
	return (props.pack?.transformedGuilds ?? [])
		.filter((g) => g.manageable)
		.sort((gA, gB) =>
			gA.wolfstarIsIn === gB.wolfstarIsIn ? gA.name.localeCompare(gB.name, 'en', { sensitivity: 'base' }) : gA.wolfstarIsIn ? -1 : 1
		);
});
</script>
