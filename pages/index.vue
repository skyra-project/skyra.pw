<template>
	<div>
		<Head>
			<Title>Skyra Project</Title>
			<Meta name="description" content="Skyra" />
		</Head>

		<div class="text-center mb-4">
			<nuxt-link to="https://join.skyra.pw" class="btn"> Support Server </nuxt-link>
		</div>

		<div class="grid sm:grid-cols-3 gap-4">
			<div v-for="bot of bots" class="card bg-primary">
				<div class="card-body">
					<h2 class="card-title">{{ bot.name }}</h2>
					<p>{{ bot.description }}</p>
					<div class="card-actions justify-end">
						<nuxt-link v-if="bot.invite" class="btn" :to="bot.invite">Invite</nuxt-link>
						<nuxt-link v-if="bot.page" class="btn" :to="bot.page">Explore</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const bots = [
	{ name: 'Acrysel', description: 'A bot for YouTube and Twitch notifications', page: null, invite: '' },
	{ name: 'Artiel', description: 'A bot for increasing user engagement', page: null, invite: '' },
	{
		name: 'Dragonite',
		description: 'A Pokémon information bot',
		page: null,
		invite: 'https://discord.com/api/oauth2/authorize?client_id=931264626614763530&scope=bot+applications.commands&permissions=84992'
	},
	{ name: 'Iris', description: 'A bot for managing suggestions in your server', page: null, invite: '' },
	{ name: 'Nayre', description: 'A RPG bot for playing with other members in your server', page: null, invite: '' },
	{ name: 'Nekokai', description: 'A bot for your anime and manga needs', page: null, invite: '' },
	{ name: 'Skyra', description: 'A powerful moderation bot with auto moderation', page: '/skyra', invite: 'https://invite.skyra.pw' },
	{ name: 'Teryl', description: 'A bot with a lot of utilities for your server', page: null, invite: '' }
];

definePageMeta({
	layout: 'landing'
});
</script>
