<template>
	<BaseSelect
		:label="label"
		:options="roleOptions"
		:value="modelValue"
		:error="error"
		:helper-text="description"
		:name="name"
		:tooltip-title="tooltipTitle"
		:required="true"
		@update:value="handleChange"
		@change="handleChange"
	/>
</template>

<script setup lang="ts">
import type { ValuesType } from 'utility-types';

interface Props {
	label: string;
	modelValue: string | null;
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	filterEveryone?: boolean;
	tooltipTitle?: string;
	error?: boolean;
	description?: string;
	name?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	filterEveryone: false,
	tooltipTitle: undefined,
	error: false,
	name: () => `role-${Math.random().toString(36).slice(2)}`,
	description: undefined
});

const emit = defineEmits<{
	(e: 'update:modelValue' | 'change', value: string): void;
}>();

const roleOptions = computed(() =>
	props.guild.roles
		.filter((r) => (props.filterEveryone ? r.id !== props.guild.id : r.name))
		.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
		.map((r) => ({
			label: r.name,
			value: r.id
		}))
);

const handleChange = (value: string) => {
	emit('update:modelValue', value);
	emit('change', value);
};
</script>
>
