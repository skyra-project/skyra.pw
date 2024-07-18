<template>
	<RoutingLink :href="guild.wolfstarIsIn ? `/guilds/${guild.id}` : guildAddURL(guild.id)" class="link">
		<div
			class="card m-2 cursor-pointer bg-secondary"
			:style="{
				minWidth: '230px',
				maxWidth: isMobile ? '90vw' : '230px',
				width: isMobile ? '90vw' : 'inherit',
				minHeight: '80px',
				maxHeight: '80px'
			}"
		>
			<div class="card-header flex items-center">
				<PresentationalGuildIcon :guild="guild" />
				<div class="ml-2">
					<h3 class="card-title">{{ guild.name }}</h3>
					<p v-if="!guild.wolfstarIsIn" class="card-subtitle">Click to invite WolfStar</p>
				</div>
			</div>
		</div>
	</RoutingLink>
</template>

<script setup lang="ts">
import type { ValuesType } from 'utility-types';
import type { TransformedLoginData } from '~/config/types/ApiData';

interface GuildCardProps {
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
}

const props = defineProps<GuildCardProps>();

const isMobile = computed(() => window.innerWidth <= 768);
</script>

<style scoped>
.card {
	background-color: var(--secondary-main);
}
.card-header {
	display: flex;
	align-items: center;
}
.card-title {
	font-weight: 600;
	font-size: 1.25rem;
}
.card-subtitle {
	color: var(--text-secondary);
	font-size: 0.875rem;
}
</style>
