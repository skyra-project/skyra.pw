<template>
	<se :label="label" :name="channelName" :values="channelOptions" :tooltipTitle="tooltipTitle" @change="onChange" />
</template>

<script setup lang="ts">
import type { TransformedLoginData } from '~/types/ApiData';
import type { ValuesType } from 'utility-types';
import { ChannelType } from 'discord-api-types/v10';

interface SelectChannelProps {
	label: string;
	value: string | null;
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	onChange: (value: string) => void;
	tooltipTitle?: string;
}

const props = defineProps<SelectChannelProps>();

const channelName = computed(() => {
	const channel = props.guild.channels.find((c) => c.id === props.value);
	return channel ? channel.name : '';
});

const channelOptions = computed(() => {
	return props.guild.channels
		.filter((c) => c.type === ChannelType.GuildText || c.type === ChannelType.GuildAnnouncement)
		.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
		.map((c) => ({ name: c.name, value: c.id }));
});
</script>
