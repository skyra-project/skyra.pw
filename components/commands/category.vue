<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FlattenedCommand } from '~/utils/types/ApiData';
import { useClientTrpc } from '~/composables/public';

const client = useClientTrpc();

// Props
interface Props {
	categoryName: string;
	searchValue: string;
}

const props = defineProps<Props>();

// State
const isLoading = ref(false);
const commands = ref<FlattenedCommand[]>([]);

// tRPC query
const fetchCategoryCommands = async () => {
	isLoading.value = true;
	try {
		commands.value = await client.commands.search.query({
			category: props.categoryName,
			query: props.searchValue
		});
	} catch (error) {
		console.error('Error fetching commands:', error);
		commands.value = [];
	} finally {
		isLoading.value = false;
	}
};

// Computed
const filteredCategory = computed(() => commands.value);

// Watch per aggiornamenti ricerca
watch(
	() => props.searchValue,
	() => fetchCategoryCommands()
);

// Caricamento iniziale
onMounted(() => {
	fetchCategoryCommands();
});
</script>

<template>
	<div v-if="!isLoading && filteredCategory.length" class="collapse collapse-arrow my-1 rounded-lg bg-base-200">
		<input type="checkbox" checked />
		<div class="collapse-title text-xl font-bold">
			{{ categoryName }}
		</div>
		<div class="collapse-content">
			<div class="flex flex-wrap">
				<CommandsCommand v-for="(command, idx) in filteredCategory" :key="idx" :command="command" />
			</div>
		</div>
	</div>
	<div v-else-if="isLoading" class="loading">Loading...</div>
</template>
