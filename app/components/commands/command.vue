<template>
	<div class="my-2 max-w-none min-w-full flex-1 transition-all duration-200">
		<div class="card bg-secondary-light">
			<div class="card-body">
				<div class="card-title">
					<div v-if="!isLoading" class="flex flex-row items-center gap-4">
						<div class="w-full md:w-1/3">
							<span class="text-lg font-bold">s!{{ command.name }}</span>
						</div>
						<div class="w-full md:w-2/3">
							<span class="text-secondary text-sm">{{ command.description }}</span>
						</div>
					</div>
					<div v-else class="flex flex-row gap-4">
						<div class="skeleton h-8 w-32"></div>
						<div class="skeleton h-6 w-64"></div>
					</div>
				</div>

				<div class="collapse-content">
					<div class="flex flex-col">
						<template v-if="!isLoading && command.extendedHelp.usages">
							<CommandsExtendedHelpSectionHeader icon="mdi-pencil" header="Command Usage" />
							<div v-for="(usage, index) in command.extendedHelp.usages" :key="index">
								<CommandsExtendedHelpBody :body="`\`WolfStar, ${command.name} ${usage}\``" />
							</div>
						</template>
						<template v-else-if="isLoading">
							<div class="flex flex-col gap-4 p-4">
								<div v-for="i in 3" :key="i" class="skeleton h-24 w-full"></div>
							</div>
						</template>

						<template v-if="!isLoading && command.extendedHelp.extendedHelp">
							<CommandsExtendedHelpSectionHeader icon="mdi-help-rhombus" header="Extended Help" />
							<CommandsExtendedHelpBody :body="resolvedExtendedHelp!" />
						</template>

						<template v-if="!isLoading && command.extendedHelp.explainedUsage">
							<CommandsExtendedHelSectionHeader icon="mdi-code-tags" header="Explained Usage" />
							<CommandsExtendedHelpBody :body="explainedUsage!" />
						</template>

						<template v-if="!isLoading && command.extendedHelp.possibleFormats">
							<CommandsExtendedHelpSectionHeader icon="mdi-brush" header="Possible Formats" />
							<CommandsExtendedHelpBody :body="possibleFormats!" />
						</template>

						<template v-if="!isLoading && command.extendedHelp.examples">
							<CommandsExtendedHelpSectionHeader icon="mdi-lightbulb-outline" header="Examples" />
							<CommandsExtendedHelpBody :body="examples!" />
						</template>

						<template v-if="!isLoading && command.extendedHelp.reminder">
							<CommandsExtendedHelpSectionHeader icon="mdi-bell-alert" header="Reminder" />
							<CommandsExtendedHelpBody :body="command.extendedHelp.reminder" />
						</template>
					</div>
				</div>
				<div class="card-actions justify-end border-t border-gray-200 pt-4 dark:border-gray-800">
					<CommandsChips :command="command" :loading="isLoading" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface CommandProps {
	command: FlattenedCommand;
	isLoading?: boolean;
}

const props = withDefaults(defineProps<CommandProps>(), {
	isLoading: false
});

const resolveContent = (content: string | string[], multiline = false): string => {
	try {
		return Array.isArray(content) ? content.join(multiline ? '\n\n' : ' ') : content.trim();
	} catch (error) {
		captureException(error);
		return '';
	}
};

const resolvedExtendedHelp = computed(() => {
	if (!props.command.extendedHelp.extendedHelp) return;
	return resolveContent(props.command.extendedHelp.extendedHelp, true);
}).value;

const explainedUsage = computed(() => {
	if (!props.command.extendedHelp.explainedUsage) return;
	return props.command.extendedHelp.explainedUsage.map(([arg, desc]) => `- **${arg}**: ${resolveContent(desc)}`).join('\n');
}).value;

const possibleFormats = computed(() => {
	if (!props.command.extendedHelp.possibleFormats) return;
	return props.command.extendedHelp.possibleFormats.map(([type, example]) => `- **${type}**: ${example}`).join('\n');
}).value;

const examples = computed(() => {
	if (!props.command.extendedHelp.examples) return;
	return props.command.extendedHelp.examples.map((example) => `- WolfStar, ${props.command.name}${example ? ` *${example}*` : ''}`).join('\n');
}).value;
</script>

<style scoped>
.chips-container {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.chip {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.5rem;
	background-color: var(--primary-color);
	padding: 0.5rem 1rem;
	color: white;
}

.chip.secondary {
	background-color: var(--secondary-color);
}
</style>
