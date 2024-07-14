<script setup lang="ts">
import { ref, computed } from 'vue';
import { useScroll, useStorage } from '@vueuse/core';
import { useAsyncData } from '#app';
import type { FlattenedCommand } from '~/config/types/ApiData';
import type { GuildSettings } from '~/config/types/GuildSettings'; // Assicurati che questo percorso sia corretto
import { Time } from '~/utils/wolfstarUtils';
import type { ExpirableLocalStorageStructure } from '~/utils/constants';
import { LocalStorageKeys } from '~/utils/constants'; // Assicurati di importare LocalStorageKeys

// Aggiorniamo la definizione dei props per accettare entrambi i tipi di funzione
const props = defineProps<{
	setCommands: ((commands: FlattenedCommand[]) => void) | ((changes: Partial<GuildSettings>) => void);
}>();

const emit = defineEmits<{
	(e: 'fresh', commands: FlattenedCommand[]): void;
}>();

const disabled = ref(false);
const { y } = useScroll(window);
const trigger = computed(() => y.value > 100);

const storageKey = LocalStorageKeys.Commands;
const commandsStorage = useStorage<ExpirableLocalStorageStructure<FlattenedCommand[]>>(storageKey, {
	expire: 0,
	data: []
});

const isExpired = computed(() => {
	return Date.now() > commandsStorage.value.expire;
});

const handleClick = async () => {
	try {
		disabled.value = true;
		const { data: commandsData } = await useAsyncData('commands', () => $fetch<FlattenedCommand[]>('/api/commands'));
		if (commandsData.value) {
			// Usiamo l'emit per inviare i nuovi comandi al componente genitore
			emit('fresh', commandsData.value);

			// Aggiorniamo lo storage locale
			commandsStorage.value = {
				expire: Date.now() + Time.Day * 6,
				data: commandsData.value
			};
		}
		disabled.value = false;
	} catch (err: any) {
		if (err.status >= 400) {
			disabled.value = true;
		}
	}
};

// Carica i comandi dal local storage se non sono scaduti
if (!isExpired.value) {
	emit('fresh', commandsStorage.value.data);
}

const tooltipText = `
  Click to force refresh commands
  Note: If this button is not clickable (greyed out) then you've ran into a rate limit.
  You can try refreshing again at a later time. We do release on a weekly schedule so
  you only need to refresh once every 6 or 7 days.
`;
</script>

<template>
	<div class="fixed bottom-2 right-2 z-50" :class="{ 'right-8': trigger }">
		<button
			@click="handleClick"
			class="btn btn-circle btn-primary"
			:class="{ 'btn-disabled': disabled }"
			:disabled="disabled"
			:data-tip="tooltipText"
		>
			<i class="i-mdi-cached"></i>
		</button>
	</div>
</template>

<style scoped>
.btn-circle {
	@apply h-14 w-14;
}
</style>
