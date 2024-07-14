<template>
	<SelectMany :name="roleCount" :values="roleValues" v-bind="props" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { TransformedLoginData } from '~/config/types/ApiData';
import type { ValuesType } from 'utility-types';

interface SelectRolesProps {
	label: string;
	value: string[];
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	filterEveryone: boolean;
	onChange: (value: string[]) => void;
}

const props = defineProps<SelectRolesProps>();

const roleCount = computed(() => props.value.length);

const roleValues = computed(() => {
	return props.guild.roles
		.filter((r) => (props.filterEveryone ? r.id !== props.guild.id : r.name))
		.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
		.map((r) => ({ name: r.name, value: r.id }));
});
</script>
