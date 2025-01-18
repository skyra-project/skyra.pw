<template>
	<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
		<CommandsChip v-if="command.permissionLevel > 0" :text="permissionText" icon="arrow-expand-down" />

		<CommandsChip v-if="isGuildOnly" :text="guildOnlyText" icon="discord" />

		<CommandsChip v-if="command.guarded" text="This command cannot be disabled" icon="lock" />
	</div>
</template>

<script setup lang="ts">
import type { FlattenedCommand } from '~/utils/types/ApiData';

interface CommandProps {
	command: FlattenedCommand;
}

const props = defineProps<CommandProps>();
const { isMobile } = useDevice();

const PERMISSION_TITLES = {
	desktop: {
		4: 'This can only be ran by staff members.',
		5: 'This can only be ran by moderators and administrators.',
		6: 'This can only be ran by administrators.'
	},
	mobile: {
		4: 'Staff members only',
		5: 'Moderators & administrators only',
		6: 'Administrators only'
	}
} as const;

const GUILD_PRECONDITIONS = ['Administrator', 'DJ', 'GuildOnly', 'Moderator', 'NewsOnly', 'NSFW', 'TextOnly'] as const;

const permissionText = computed(() => {
	const titles = isMobile ? PERMISSION_TITLES.mobile : PERMISSION_TITLES.desktop;
	return titles[props.command.permissionLevel as keyof typeof titles] ?? '';
});

const guildOnlyText = computed(() => (isMobile ? 'Usable in servers only.' : 'This can only be used in servers.'));

const isGuildOnly = computed(() =>
	props.command.preconditions.entries
		.flatMap((entry) => entry.entries)
		.filter(Boolean)
		.map((entry) => entry.name)
		.some((name) => GUILD_PRECONDITIONS.includes(name as (typeof GUILD_PRECONDITIONS)[number]))
);
</script>

<style scoped>
.chip {
	@apply flex items-center justify-between rounded-lg bg-primary p-2 px-4 text-white;
}

.chip.secondary {
	@apply bg-secondary;
}
</style>
