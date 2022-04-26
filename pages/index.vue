<template>
	<div class="bg-gradient-to-br from-indigo-500 pb-20">
		<Head>
			<Title>Skyra Project</Title>
			<Meta
				name="description"
				content="A collection of performant, reliable, and multi-language bots that take your Discord server's experience to the next level."
			/>
		</Head>

		<div class="hero backdrop-blur-xl bg-opacity-10 mb-10 drop-shadow-lg shadow-inner text-slate-100">
			<div class="hero-content text-center">
				<div class="max-w-md py-12">
					<h1 class="mb-5 text-5xl font-bold">Skyra Project</h1>
					<p class="mb-5">
						A collection of <span class="font-semibold">performant</span>, <span class="font-semibold">reliable</span>, and
						<span class="font-semibold">multi-language</span> bots that take your Discord server's experience to the next level.
					</p>
					<nuxt-link to="https://join.skyra.pw" class="btn"> Support Server </nuxt-link>
				</div>
			</div>
		</div>

		<div class="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row content-fit justify-center gap-y-4">
			<div v-for="bot of bots" class="sm:basis-1/2 xl:basis-1/3">
				<div class="card bg-base-200 shadow-xl ring-1 ring-base-300 mx-2 h-full">
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
	</div>
</template>

<script setup lang="ts">
const bots = [
	{ name: 'Acrysel', description: 'A bot for YouTube and Twitch notifications', page: null, invite: 'https://invite.skyra.pw/acrysel' },
	{ name: 'Artiel', description: 'A bot for increasing user engagement', page: null, invite: 'https://invite.skyra.pw/artiel' },
	{
		name: 'Dragonite',
		description: 'A Pokémon information bot',
		page: null,
		invite: 'https://invite.skyra.pw/dragonite'
	},
	{ name: 'Iris', description: 'A bot for managing suggestions in your server', page: null, invite: 'https://invite.skyra.pw/iris' },
	{ name: 'Nayre', description: 'A RPG bot for playing with other members in your server', page: null, invite: 'https://invite.skyra.pw/nayre' },
	{ name: 'Nekokai', description: 'A bot for your anime and manga needs', page: null, invite: 'https://invite.skyra.pw/nekokai' },
	{ name: 'Skyra', description: 'A powerful moderation bot with auto moderation', page: '/skyra', invite: 'https://invite.skyra.pw/skyra' },
	{ name: 'Teryl', description: 'A bot with a lot of utilities for your server', page: null, invite: 'https://invite.skyra.pw/teryl' }
];

definePageMeta({
	nav: false
});
</script>
