<template>
	<div>
		<div v-if="isLoading">
			<!-- Skeleton per le categorie -->
			<div class="container mx-auto space-y-6 p-4">
				<div v-for="i in 3" :key="i">
					<!-- Header categoria -->
					<USkeleton class="mb-4 h-8 w-48" />

					<!-- Grid dei comandi -->
					<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<div v-for="j in 3" :key="j" class="border-gray-200 dark:border-gray-800 space-y-4 rounded-lg border p-4">
							<!-- Titolo comando -->
							<USkeleton class="h-6 w-32" />

							<!-- Descrizione -->
							<USkeleton class="h-4 w-full" />

							<!-- Chips -->
							<div class="flex gap-2">
								<USkeleton class="h-8 w-24" />
								<USkeleton class="h-8 w-24" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="commands.length === 0" class="flex items-center justify-center p-4">
			<div class="text-center">
				<p class="text-lg font-bold">No commands found.</p>
				<p class="text-sm text-base-content">Please try again later.</p>
			</div>
		</div>
		<div v-else>
			<LayoutsRefreshCommands :commands="commands" :is-loading="isLoading" :on-refresh="refresh" />
			<div class="container mx-auto">
				<div ref="commandsBoxRef" class="flex flex-col">
					<CommandsCategory
						v-for="(categoryName, index) in categories"
						:key="index"
						:category-name="categoryName"
						:commands="filteredCommands"
						:search-value="searchValue"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FlattenedCommand } from '~/utils/types/ApiData';
import { useClientTrpc } from '~/composables/public';

const client = useClientTrpc();
const searchValue = ref('');
const commandsBoxRef = ref<HTMLElement | null>(null);

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
};

// Fetch iniziale al mount
onMounted(() => {
	fetchCommands();
});
</script>
