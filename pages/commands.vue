<template>
	<div>
		<PresentationalLoading :loading="loading" />
		<RefreshCommandsButton :setCommands="setCommands" @fresh="handleFreshCommands" />
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
					:commands="commands"
					:search-value="searchValue"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useElementSize, useDebounceFn, useStorage } from '@vueuse/core';
import type { FlattenedCommand } from '~/config/types/ApiData';
import RefreshCommandsButton from '~/components/refresh-commands-buttons.vue';
import UiSearchBar from '~/components/material/UiSearchBar.vue';
import category from '~/components/presentational/CommandsPage/category.vue';

const searchValue = ref('');
const commands = ref<FlattenedCommand[]>([]);
const loading = ref(false);

const commandsBoxRef = ref<HTMLElement | null>(null);
const { width: commandsBoxWidth } = useElementSize(commandsBoxRef);

const commandsStorage = useStorage<ExpirableLocalStorageStructure<FlattenedCommand[]>>(LocalStorageKeys.Commands, {
	expire: 0,
	data: []
});

const fetchCommands = async () => {
	loading.value = true;
	if (commandsStorage.value.expire > Date.now() || import.meta.env.DEV) {
		commands.value = commandsStorage.value.data;
	} else {
		try {
			const commandsData = await $fetch<FlattenedCommand[]>(getApiOrigin() + '/commands');
			commands.value = commandsData;
			commandsStorage.value = {
				expire: Date.now() + Time.Day * 6,
				data: commandsData
			};
		} catch (error) {
			console.error('Failed to fetch commands:', error);
		}
	}
	loading.value = false;
};

onMounted(fetchCommands);

const categories = computed(() => [...new Set(commands.value.map((command) => command.category))]);

const handleSearch = useDebounceFn((value: string) => {
	searchValue.value = value;
}, 200);

const setCommands = (newCommands: FlattenedCommand[]) => {
	commands.value = newCommands;
	commandsStorage.value = {
		expire: Date.now() + Time.Day * 6,
		data: newCommands
	};
};

const handleFreshCommands = (newCommands: FlattenedCommand[]) => {
	setCommands(newCommands);
};
</script>
