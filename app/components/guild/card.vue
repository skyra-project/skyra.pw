<template>
	<NuxtLink
		:to="guild.wolfstarIsIn ? `/guilds/${guild.id}` : guildAddURL(guild.id)"
		class="flex flex-col items-center rounded-lg bg-gray-700 p-4 transition-colors duration-200 hover:bg-gray-600"
	>
		<div class="mb-2 h-16 w-16">
			<PresentationalGuildIcon :guild="guild" size="16" />
		</div>
		<!-- <h3 class="text-sm font-medium text-center text-white">{{ guild.name }}</h3> -->
		<p v-if="!guild.wolfstarIsIn" class="mt-1 text-center text-xs text-gray-400">Click to invite</p>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { ValuesType } from 'utility-types';
import type { TransformedLoginData } from '@/server/utils/types';

interface GuildCardProps {
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
}

defineProps<GuildCardProps>();
</script>
