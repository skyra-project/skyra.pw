<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGuildSettings } from '~/composables/settings/useGuildSettings';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';
import RefreshCommandsButton from '~/layouts/refresh_commands_buttons.vue';
import Section from '~/layouts/settings/section.vue';
import Loading from '~/components/presentational/loading.vue';
import type { FlattenedCommand } from '~/config/types/ApiData';
import type { DisableCommands } from '~/config/types/ConfigurableData';

const props = defineProps<{
	commands: FlattenedCommand[];
}>();

const emit = defineEmits<{
	(e: 'update:commands', commands: FlattenedCommand[]): void;
}>();

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const loading = ref(true);
const localCommands = ref<Record<string, DisableCommands.Command>>({});
const expandedCategory = ref<string | null>(null);

const parseCommandsToLocalCommands = () => {
	loading.value = true;
	const commandsForState: Record<string, DisableCommands.Command> = {};
	for (const command of props.commands) {
		if (command.guarded) continue;
		commandsForState[command.name] = {
			name: command.name,
			description: command.description,
			isEnabled: !guildSettings.value.disabledCommands.includes(command.name),
			category: command.category
		};
	}
	localCommands.value = commandsForState;
	loading.value = false;
};

onMounted(parseCommandsToLocalCommands);

const categories = computed(() => [...new Set(Object.values(localCommands.value).map((command) => command.category))]);

const toggleCommand = (commandName: string) => {
	localCommands.value[commandName].isEnabled = !localCommands.value[commandName].isEnabled;
};

const toggleCategory = (category: string, enable: boolean) => {
	Object.values(localCommands.value).forEach((command) => {
		if (command.category === category) {
			command.isEnabled = enable;
		}
	});
};

const saveChanges = () => {
	setGuildSettingsChanges({
		disabledCommands: Object.values(localCommands.value)
			.filter((cmd) => !cmd.isEnabled)
			.map((cmd) => cmd.name)
	});
};

const parseCommandDescription = (description: string) => description.replace(/<:(\w{2,32}):[0-9]{18}>/gi, '$1');
</script>

<template>
	<div>
		<Loading :loading="loading" />
		<RefreshCommandsButton @fresh="(newCommands) => emit('update:commands', newCommands)" :setCommands="setGuildSettingsChanges" />

		<Section title="Commands">
			<p class="mb-4 text-sm">On this page you can disable commands on your server</p>

			<div v-for="category in categories" :key="category" class="mb-4">
				<div class="collapse collapse-arrow bg-base-200">
					<input type="checkbox" @change="expandedCategory = expandedCategory === category ? null : category" />
					<div class="collapse-title text-xl font-medium">
						{{ category }}
					</div>
					<div class="collapse-content">
						<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							<div
								v-for="command in Object.values(localCommands).filter((cmd) => cmd.category === category)"
								:key="command.name"
								class="form-control"
							>
								<label class="label cursor-pointer">
									<span class="label-text">{{ command.name }}</span>
									<input
										type="checkbox"
										class="toggle toggle-primary"
										:checked="command.isEnabled"
										@change="toggleCommand(command.name)"
									/>
								</label>
								<span class="text-xs">{{ parseCommandDescription(command.description) }}</span>
							</div>
						</div>
						<div class="mt-4 flex justify-end space-x-2">
							<button class="btn btn-success btn-sm" @click="toggleCategory(category, true)">Enable all</button>
							<button class="btn btn-warning btn-sm" @click="toggleCategory(category, false)">Disable all</button>
							<button class="btn btn-error btn-sm" @click="parseCommandsToLocalCommands">Reset</button>
							<button class="btn btn-primary btn-sm" @click="saveChanges">Save</button>
						</div>
					</div>
				</div>
			</div>
		</Section>
	</div>
</template>
