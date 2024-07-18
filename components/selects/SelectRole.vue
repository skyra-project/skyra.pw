<template>
	<SelectOne :name="roleName" :values="roleValues" v-bind="props" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SelectOne from './SelectOne.vue';
import type { TransformedLoginData } from '~/config/types/ApiData';
import type { ValuesType } from 'utility-types';

interface SelectRoleProps {
	label: string;
	value: string | null;
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	filterEveryone: boolean;
}

const props = defineProps<SelectRoleProps>();

const roleName = computed(() => {
	const role = props.guild.roles.find((r) => r.id === props.value);
	return role ? role.name : '';
});

const roleValues = computed(() => {
	return props.guild.roles
		.filter((r) => (props.filterEveryone ? r.id !== props.guild.id : r.name))
		.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
		.map((r) => ({ name: r.name, value: r.id }));
});
</script>
