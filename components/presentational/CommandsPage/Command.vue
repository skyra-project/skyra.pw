<template>
	<div :class="gridItemClass">
		<div class="bg-secondary-light collapse collapse-arrow">
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">
				<div class="flex flex-row content-start items-center justify-start">
					<div class="w-full md:w-1/3">
						<span class="text-lg font-bold" v-html="formattedCommandName"></span>
					</div>
					<div class="w-full md:w-2/3">
						<span class="text-sm text-secondary">{{ command.description }}</span>
					</div>
				</div>
			</div>
			<div class="collapse-content">
				<div class="flex flex-col">
					<template v-if="command.extendedHelp.usages">
						<PresentationalCommandsPageExtendedHelpSectionHeader icon="mdi-pencil" header="Command Usage" />
						<div v-for="(usage, index) in command.extendedHelp.usages" :key="index">
							<PresentationalCommandsPageExtendedHelpBody :body="`\`WolfStar, ${command.name} ${usage}\``" />
						</div>
					</template>

					<template v-if="command.extendedHelp.extendedHelp">
						<PresentationalCommandsPageExtendedHelpSectionHeader icon="mdi-help-rhombus" header="Extended Help" />
						<PresentationalCommandsPageExtendedHelpBody :body="resolvedExtendedHelp!" />
					</template>

					<template v-if="command.extendedHelp.explainedUsage">
						<PresentationalCommandsPageExtendedHelpSectionHeader icon="mdi-code-tags" header="Explained Usage" />
						<PresentationalCommandsPageExtendedHelpBody :body="explainedUsage!" />
					</template>

					<template v-if="command.extendedHelp.possibleFormats">
						<PresentationalCommandsPageExtendedHelpSectionHeader icon="mdi-brush" header="Possible Formats" />
						<PresentationalCommandsPageExtendedHelpBody :body="possibleFormats!" />
					</template>

					<template v-if="command.extendedHelp.examples">
						<PresentationalCommandsPageExtendedHelpSectionHeader icon="mdi-lightbulb-outline" header="Examples" />
						<PresentationalCommandsPageExtendedHelpBody :body="examples!" />
					</template>

					<template v-if="command.extendedHelp.reminder">
						<PresentationalCommandsPageExtendedHelpSectionHeader icon="mdi-bell-alert" header="Reminder" />
						<PresentationalCommandsPageExtendedHelpBody :body="command.extendedHelp.reminder" />
					</template>
				</div>
			</div>
			<div class="p-4">
				<PresentationalCommandsPageChips :command="command" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { FlattenedCommand } from '~/config/types/ApiData';

interface CommandProps {
	command: FlattenedCommand;
}

const props = defineProps<CommandProps>();

const gridItemClass = computed(() => ({
	'flex-1': true,
	'my-2': true,
	'min-w-full': true,
	'max-w-none': true,
	'transition-width': true,
	'duration-200': true,
	'ease-in-out': true
}));

const resolveMultilineString = (str: string | string[], multiline = false): string => {
	if (Array.isArray(str)) {
		return resolveMultilineString(str.join(multiline ? '\n' : ' '), multiline);
	}
	return str
		.split('\n')
		.map((line) => line.trim())
		.join(multiline ? '\n\n' : ' ');
};

const formattedCommandName = computed(() => {
	return `s!${props.command.name}`.replace(/(.{10})/g, '$1<wbr>');
}).value;

const resolvedExtendedHelp = computed(() => {
	if (!props.command.extendedHelp.extendedHelp) return;
	return resolveMultilineString(props.command.extendedHelp.extendedHelp, true);
}).value;

const explainedUsage = computed(() => {
	if (!props.command.extendedHelp.explainedUsage) return;
	return props.command.extendedHelp.explainedUsage.map(([arg, desc]) => `- **${arg}**: ${resolveMultilineString(desc)}`).join('\n');
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
