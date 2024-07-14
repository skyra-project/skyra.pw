<template>
	<div>
		<GuildCard v-for="guild in filteredGuilds" :key="guild.id" :guild="guild" />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import GuildCard from './guild-card.vue';
import type { TransformedLoginData } from '~/config/types/ApiData';

interface FilteredGuildCardsProps {
	pack?: TransformedLoginData;
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
