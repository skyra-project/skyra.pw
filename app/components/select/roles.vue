<template>
	<select-many-base
		:label="label"
		:options="roleOptions"
		:value="modelValue"
		:error="error"
		:helper-text="description"
		:name="name"
		:tooltip-title="tooltipTitle"
		:required="true"
		:searchable="true"
		@update:value="handleChange"
		@change="handleChange"
	/>
</template>

<script setup lang="ts">
import type { ValuesType } from 'utility-types';
import { CDN } from '@discordjs/rest';

interface Props {
	label: string;
	modelValue: string[];
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	filterEveryone?: boolean;
	tooltipTitle?: string;
	error?: boolean;
	description?: string;
	name?: string;
}

const props = withDefaults(defineProps<Props>(), {
	filterEveryone: false,
	tooltipTitle: undefined,
	error: false,
	name: () => `roles-${Math.random().toString(36).slice(2)}`,
	description: undefined
});

const emit = defineEmits<{
	(e: 'update:modelValue' | 'change', value: string[]): void;
}>();

const roleOptions = computed(() =>
	props.guild.roles
		.filter((r) => (props.filterEveryone ? r.id !== props.guild.id : r.name))
		.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
		.map((r) => ({
			label: r.name,
			value: r.id,
			iconUrl: r.icon ? new CDN().roleIcon(r.id, r.icon) : null
		}))
);

const handleChange = (value: string[]) => {
	emit('update:modelValue', value);
	emit('change', value);
};
</script>
>

<style>
@reference "../../assets/css/main.css";
</style>
