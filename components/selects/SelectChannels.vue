<template>
	<SelectMany
		:label="label"
		:name="value.length.toString()"
		:values="channelOptions"
		:tooltipTitle="tooltipTitle"
		:value="value"
		@change="onChange"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SelectMany from './SelectMany.vue';
import type { TransformedLoginData } from '~/config/types/ApiData';
import type { ValuesType } from 'utility-types';

interface SelectChannelsProps {
	label: string;
	value: string[];
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	onChange: (value: string[]) => void;
	tooltipTitle?: string;
}

const props = defineProps<SelectChannelsProps>();

const channelOptions = computed(() => {
	return props.guild.channels
		.filter((c) => c.type === 'GUILD_TEXT' || c.type === 'GUILD_NEWS')
		.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
		.map((c) => ({ name: c.name, value: c.id }));
});
</script>
