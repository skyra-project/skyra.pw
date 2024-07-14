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
						<ExtendedHelpSectionHeader icon="mdi-pencil" header="Command Usage" />
						<div v-for="(usage, index) in command.extendedHelp.usages" :key="index">
							<ExtendedHelpBody :body="`\`WolfStar, ${command.name} ${usage}\``" />
						</div>
					</template>

					<template v-if="command.extendedHelp.extendedHelp">
						<ExtendedHelpSectionHeader icon="mdi-help-rhombus" header="Extended Help" />
						<ExtendedHelpBody :body="resolvedExtendedHelp" />
					</template>

					<template v-if="command.extendedHelp.explainedUsage">
						<ExtendedHelpSectionHeader icon="mdi-code-tags" header="Explained Usage" />
						<ExtendedHelpBody :body="explainedUsage" />
					</template>

					<template v-if="command.extendedHelp.possibleFormats">
						<ExtendedHelpSectionHeader icon="mdi-brush" header="Possible Formats" />
						<ExtendedHelpBody :body="possibleFormats" />
					</template>

					<template v-if="command.extendedHelp.examples">
						<ExtendedHelpSectionHeader icon="mdi-lightbulb-outline" header="Examples" />
						<ExtendedHelpBody :body="examples" />
					</template>

					<template v-if="command.extendedHelp.reminder">
						<ExtendedHelpSectionHeader icon="mdi-bell-alert" header="Reminder" />
						<ExtendedHelpBody :body="command.extendedHelp.reminder" />
					</template>
				</div>
			</div>
			<div class="p-4">
				<Chips :command="command" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import ExtendedHelpBody from './extended-help-body.vue';
import ExtendedHelpSectionHeader from './extended-help-section-header.vue';
import Chips from './Chips.vue';
import type { FlattenedCommand } from '~/config/types/ApiData';

interface CommandProps {
	command: FlattenedCommand;
}

const command = defineProps<CommandProps>().command;

const gridItemClass = computed(() => ({
	'flex-1': true,
	'my-2': true,
	'min-w-full': true,
	'max-w-none': true,
	'transition-width': true,
	'duration-200': true,
	'ease-in-out': true
}));

const resolveMultilineString = (str: string | string[] | undefined, multiline = false): string => {
	if (str === undefined) return '';
	if (Array.isArray(str)) {
		return resolveMultilineString(str.join(multiline ? '\n' : ' '), multiline);
	}
	return str
		.split('\n')
		.map((line) => line.trim())
		.join(multiline ? '\n\n' : ' ');
};

const formattedCommandName = computed(() => {
	return `s!${command.name}`.replace(/(.{10})/g, '$1<wbr>');
});

const resolvedExtendedHelp = computed(() => {
	return resolveMultilineString(command.extendedHelp.extendedHelp, true);
});

const explainedUsage = computed(() => {
	return (command.extendedHelp.explainedUsage ?? []).map(([arg, desc]) => `- **${arg}**: ${resolveMultilineString(desc)}`).join('\n');
});

const possibleFormats = computed(() => {
	return (command.extendedHelp.possibleFormats ?? []).map(([type, example]) => `- **${type}**: ${example}`).join('\n');
});

const examples = computed(() => {
	return (command.extendedHelp.examples ?? []).map((example) => `- WolfStar, ${command.name}${example ? ` *${example}*` : ''}`).join('\n');
});
</script>
