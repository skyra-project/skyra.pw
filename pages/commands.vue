<template>
	<div>
		<div v-if="isLoading" class="flex items-center justify-center p-4">
			<div class="loading loading-spinner loading-lg text-primary"></div>
		</div>
		<RefreshCommandsButton @click="refresh" />
		<div class="container mx-auto">
			<UiSearchBar
				v-model="searchValue"
				@cancel-search="searchValue = ''"
				@request-search="searchValue = $event ?? ''"
				placeholder="Search a command..."
				:style="{ width: `${commandsBoxWidth}px` }"
			/>
			<div ref="commandsBoxRef" class="flex flex-col">
				<category
					v-for="(categoryName, index) in categories"
					:key="index"
					:category-name="categoryName"
					:commands="filteredCommands"
					:search-value="searchValue"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useElementSize } from '@vueuse/core';
import type { FlattenedCommand } from '~/types/ApiData';
import { useClientTrpc } from '~/composables/public';

const client = useClientTrpc();
const searchValue = ref('');
const commandsBoxRef = ref<HTMLElement | null>(null);
const { width: commandsBoxWidth } = useElementSize(commandsBoxRef);

// tRPC queries usando il client
const commands = ref<FlattenedCommand[]>([]);
const searchResults = ref<FlattenedCommand[]>([]);
const isLoading = ref(false);

// Fetch iniziale dei comandi
const fetchCommands = async () => {
	isLoading.value = true;
	try {
		commands.value = await client.commands.getAll.query();
	} catch (error) {
		console.error('Failed to fetch commands:', error);
		commands.value = [];
	}
	isLoading.value = false;
};

// Watch per la ricerca
watch(searchValue, async (newValue) => {
	if (newValue.length > 0) {
		try {
			searchResults.value = await client.commands.search.query({
				query: newValue,
				category: undefined
			});
		} catch (error) {
			console.error('Search failed:', error);
			searchResults.value = [];
		}
	} else {
		searchResults.value = [];
	}
});

const filteredCommands = computed<FlattenedCommand[]>(() => {
	return searchValue.value ? searchResults.value : commands.value;
});

const categories = computed<string[]>(() => [...new Set(filteredCommands.value.map((cmd: FlattenedCommand) => cmd.category))]);

const refresh = async () => {
	await client.commands.refresh.mutate();
	await fetchCommands();
};

// Fetch iniziale al mount
onMounted(() => {
	fetchCommands();
});
</script>
