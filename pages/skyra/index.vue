<template>
	<div class="bg-gradient-to-br from-blue-500 pb-20">
		<Head>
			<Title>Skyra</Title>
			<Meta name="description" content="Skyra is a customizable multi-lingual powerful moderation with auto-moderation." />
		</Head>

		<div class="hero backdrop-blur-xl bg-opacity-10 mb-10 drop-shadow-lg shadow-inner text-slate-100">
			<div class="hero-content text-center">
				<div class="max-w-md py-12">
					<h1 class="mb-5 text-5xl font-bold">Skyra</h1>
					<p class="mb-5">
						A <span class="font-semibold">performant</span>, <span class="font-semibold">reliable</span>, and
						<span class="font-semibold">multi-language</span> moderation bot that complements Discord's built-in moderation tools.
					</p>
					<div class="btn-group justify-center">
						<nuxt-link to="https://invite.skyra.pw/skyra" class="btn">Invite Me</nuxt-link>
						<nuxt-link to="https://join.skyra.pw" class="btn">Support Server</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	invite: 'https://invite.skyra.pw/skyra',
	dashboard: true
});
</script>
