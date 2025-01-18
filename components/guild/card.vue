<template>
	<NuxtLink
		:to="guild.wolfstarIsIn ? `/guilds/${guild.id}` : guildAddURL(guild.id)"
		class="bg-gray-700 hover:bg-gray-600 flex flex-col items-center rounded-lg p-4 transition-colors duration-200"
	>
		<div class="mb-2 h-16 w-16">
			<PresentationalGuildIcon :guild="guild" size="16" />
		</div>
		<!-- <h3 class="text-sm font-medium text-center text-white">{{ guild.name }}</h3> -->
		<p v-if="!guild.wolfstarIsIn" class="text-gray-400 mt-1 text-center text-xs">Click to invite</p>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { ValuesType } from 'utility-types';
import type { TransformedLoginData } from '~/utils/types/ApiData';

interface GuildCardProps {
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
}

const props = defineProps<GuildCardProps>();
</script>
