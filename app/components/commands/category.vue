<template>
	<UCard v-if="filteredCategory.length" :ui="{ base: 'my-2' }">
		<template #header>
			<div class="flex items-center justify-between">
				<h3 class="text-xl font-bold">{{ categoryName }}</h3>
				<span class="text-sm text-gray-500"> {{ filteredCategory.length }} commands </span>
			</div>
		</template>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<CommandsCommand v-for="command in filteredCategory" :key="command.name" :command="command" />
		</div>
	</UCard>
</template>

<script setup lang="ts">
// Props
interface Props {
	categoryName: string;
	commands: FlattenedCommand[];
}

const props = defineProps<Props>();

// Computed
const filteredCategory = computed(() => props.commands.filter((cmd) => cmd.category === props.categoryName));
</script>
