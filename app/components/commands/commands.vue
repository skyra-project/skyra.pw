<template>
	<div>
		<commands-palette
			ref="paletteRef"
			:commands="filteredCommandsBySearch"
			:selected-command="selectedCommand"
			:groups="commandGroups"
			@navigate="navigateCommands"
			@search="handleSearch"
			@close="closeModal"
		/>

		<div v-if="isLoading">
			<!-- Loading state with Nuxt UI Skeletons -->
			<div class="container mx-auto flex flex-col gap-6 p-4 p-6">
				<div v-for="i in 3" :key="i">
					<USkeleton class="mb-4 h-8 w-48" />
					<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<UCard v-for="j in 3" :key="j" class="bg-base-200">
							<template #header>
								<USkeleton class="h-6 w-32" />
							</template>
							<USkeleton class="h-4 w-full" />
							<template #footer>
								<div class="flex gap-2">
									<USkeleton class="h-8 w-24" />
									<USkeleton class="h-8 w-24" />
								</div>
							</template>
						</UCard>
					</div>
				</div>
			</div>
		</div>

		<div v-else-if="commands.length === 0" class="hero min-h-[200px]">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h2 class="text-lg font-bold">No commands found.</h2>
					<p class="py-2 text-sm opacity-75">Please try again later.</p>
					<LayoutsRefreshCommands :commands="commands" :is-loading="isLoading" :on-refresh="refresh" />
				</div>
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
						:commands="filteredCommandsBySearch"
						:search-value="searchValue"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';

const { commands, isLoading, fetchCommands } = useCommands();

const searchValue = ref('');
const selectedCommand = ref<FlattenedCommand | null>(null);
const selectedIndex = ref(-1);
const paletteRef = ref<{ modal: HTMLDialogElement } | null>(null);

// Computed properties
const categories = computed<string[]>(() => [...new Set(commands.value.map((cmd) => cmd.category))]);

const commandGroups = computed(() => {
	return categories.value.map((category) => ({
		id: category,
		name: category
	}));
});

const filteredCommandsBySearch = computed(() => {
	if (!searchValue.value) return commands.value;
	const searchTerm = searchValue.value.toLowerCase();
	return commands.value.filter((cmd) => cmd.name.toLowerCase().includes(searchTerm) || cmd.description.toLowerCase().includes(searchTerm));
});

const refresh = async () => await fetchCommands();
// Command palette methods
const openModal = () => {
	paletteRef.value?.modal?.showModal();
};

const closeModal = () => {
	paletteRef.value?.modal?.close();
	searchValue.value = '';
	selectedCommand.value = null;
	selectedIndex.value = -1;
};

const handleSearch = (value: string) => {
	searchValue.value = value;
	const filtered = filteredCommandsBySearch.value;

	if (filtered.length > 0) {
		selectedIndex.value = 0;
		if (filtered[0]) selectedCommand.value = filtered[0];
	}
};

const navigateCommands = (direction: 'next' | 'prev') => {
	const filtered = filteredCommandsBySearch.value;
	if (filtered.length === 0) return;

	if (direction === 'next') {
		selectedIndex.value = (selectedIndex.value + 1) % filtered.length;
	} else {
		selectedIndex.value = selectedIndex.value <= 0 ? filtered.length - 1 : selectedIndex.value - 1;
	}
	const command = filtered[selectedIndex.value];
	if (command) selectedCommand.value = command;
};

// Lifecycle hooks
onMounted(() => {
	fetchCommands();
	onKeyStroke(['Meta+k', 'Control+k'], (e) => {
		e.preventDefault();
		openModal();
	});
});
</script>

<style scoped>
.modal {
	@apply backdrop-blur-xs;
}

.modal-box {
	@apply max-h-[80vh];
}
</style>
