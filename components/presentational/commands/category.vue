<template>
	<div v-if="filteredCategory.length" class="collapse collapse-arrow my-1 rounded-lg bg-base-200">
		<input type="checkbox" checked />
		<div class="collapse-title text-xl font-bold">
			{{ categoryName }}
		</div>
		<div class="collapse-content">
			<div class="flex flex-wrap">
				<PresentationalCommandsPageCommand v-for="(command, idx) in filteredCategory" :key="idx" :command="command" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FlattenedCommand } from '~/types/ApiData';

interface Props {
	categoryName: string;
	searchValue: string;
	commands: FlattenedCommand[];
}

const props = defineProps<Props>();

const filterCommands = (command: FlattenedCommand) => command.name.toLowerCase().includes(props.searchValue.toLowerCase());

const filteredCategory = computed(() => props.commands.filter((command) => command.category === props.categoryName).filter(filterCommands));
</script>

<style scoped>
/* Aggiungi stili personalizzati se necessario */
</style>
