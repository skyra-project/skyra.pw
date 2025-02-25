<template>
	<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
		<CommandsChip v-if="command.permissionLevel > 0" :text="permissionText" icon="arrow-expand-down" color="primary" :loading="loading" />

		<CommandsChip v-if="isGuildOnly" :text="guildOnlyText" icon="discord" color="secondary" :loading="loading" />

		<CommandsChip v-if="command.guarded" text="Cannot be disabled" icon="lock" color="warning" :loading="loading" />
	</div>
</template>

<script setup lang="ts">
import type { FlattenedCommand } from '@/server/utils/types';

interface Props {
	command: FlattenedCommand;
	loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	loading: false
});

const permissionTitles = {
	4: 'Staff members only',
	5: 'Moderators & administrators only',
	6: 'Administrators only'
} as const;

const guildPreconditions = ['Administrator', 'DJ', 'GuildOnly', 'Moderator', 'NewsOnly', 'NSFW', 'TextOnly'] as const;

const permissionText = computed(() => permissionTitles[props.command.permissionLevel as keyof typeof permissionTitles] ?? '');

const guildOnlyText = computed(() => 'Usable in servers only');

const isGuildOnly = computed(() =>
	props.command.preconditions.entries
		.flatMap((entry) => entry.entries)
		.filter(Boolean)
		.map((entry) => entry.name)
		.some((name) => guildPreconditions.includes(name as (typeof guildPreconditions)[number]))
);
</script>

<style scoped>
@reference "../../assets/css/main.css";
.chip {
	@apply flex items-center justify-between rounded-lg bg-primary p-2 px-4 text-white;
}

.chip.secondary {
	@apply bg-secondary;
}
</style>
