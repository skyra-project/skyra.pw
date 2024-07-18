<template>
	<LazyAvatar :src="iconURL" :alt="guild?.name" :class="{ 'h-10 w-10': size }">
		<template v-if="!iconURL">{{ acronym }}</template>
	</LazyAvatar>
</template>

<script setup lang="ts">
import LazyAvatar from '~/components/material/lazy-avatar.vue';
import type { TransformedLoginData } from '~/config/types/ApiData';
import type { ValuesType } from 'utility-types';

interface GuildIconProps {
	guild?: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	size?: number;
}

const props = defineProps<GuildIconProps>();

const iconURL = computed(() => {
	return props.guild ? displayIconURL(props.guild) : '';
});

const acronym = computed(() => {
	return props.guild ? getAcronym(props.guild.name) : '';
});
</script>

<style scoped>
.h-10 {
	height: 2.5rem;
}
.w-10 {
	width: 2.5rem;
}
</style>
