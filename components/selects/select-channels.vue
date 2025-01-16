<template>
	<SelectsSelectMany
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
import type { TransformedLoginData } from '~/types/ApiData';
import type { ValuesType } from 'utility-types';
import { ChannelType } from 'discord-api-types/v10';

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
		.filter((c) => c.type === ChannelType.GuildText || c.type === ChannelType.GuildAnnouncement)
		.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
		.map((c) => ({ name: c.name, value: c.id }));
});
</script>
