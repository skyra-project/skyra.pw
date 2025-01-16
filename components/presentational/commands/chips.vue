<template>
	<div class="chips-container">
		<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
			<div v-if="command.permissionLevel > 0" class="col-span-1">
				<div class="chip secondary">
					<span>
						{{ isMobile ? mobileTitles[command.permissionLevel] : titles[command.permissionLevel] }}
					</span>
					<i class="mdi mdi-arrow-expand-down" />
				</div>
			</div>
			<div v-if="isGuildOnly" class="col-span-1">
				<div class="chip secondary">
					<span>
						{{ isMobile ? 'Usable in servers only.' : 'This can only be used in servers.' }}
					</span>
					<i class="mdi mdi-discord" />
				</div>
			</div>
			<div v-if="command.guarded" class="col-span-1">
				<div class="chip secondary">
					<span>This command cannot be disabled.</span>
					<i class="mdi mdi-lock" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { FlattenedCommand } from '~/types/ApiData';

interface CommandProps {
	command: FlattenedCommand;
}

const GuildOnlyPreconditions = ['Administrator', 'DJ', 'GuildOnly', 'Moderator', 'NewsOnly', 'NSFW', 'TextOnly'];

const props = defineProps<CommandProps>();

const titles: Record<number, string> = {
	4: 'This can only be ran by staff members.',
	5: 'This can only be ran by moderators and administrators.',
	6: 'This can only be ran by administrators.'
};

const mobileTitles: Record<number, string> = {
	4: 'Staff members only',
	5: 'Moderators & administrators only',
	6: 'Administrators only'
};

const isGuildOnly = computed(() => {
	return props.command.preconditions.entries
		.flatMap((preconditionEntry) => preconditionEntry.entries)
		.filter(Boolean)
		.map((entry) => entry.name)
		.some((predicate) => GuildOnlyPreconditions.includes(predicate));
});

const { isMobile } = useDevice();
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
