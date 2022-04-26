<template>
	<div class="sm:bg-gradient-to-br from-blue-500 pb-20">
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

		<article class="content-fit">
			<div class="sm:card sm:bg-base-200 sm:shadow-xl">
				<div class="px-6 sm:card-body prose max-w-full">
					<h2>Features</h2>
					<p>hhehe</p>

					<h2>Usage</h2>
					<p>Skyra currently only supports message-based commands, which needs to be written with any of the following prefixes:</p>
					<ul>
						<li>
							<span class="font-bold">Mention</span> (<kbd class="kbd">@Skyra#7023</kbd>). For example:
							<span class="italic">@Skyra#7023 help</span>
						</li>
						<li>
							<span class="font-bold">Name</span><sup>1</sup> (<kbd class="kbd">Skyra,</kbd>). For example:
							<span class="italic">Skyra, help</span>
						</li>
						<li>
							<span class="font-bold">Prefix</span><sup>2</sup> (<kbd class="kbd">s!</kbd>). For example:
							<span class="italic">s!help</span>
						</li>
					</ul>

					<p>
						<sup>1</sup>The name prefix can be disabled with the command <kbd class="kbd">conf set disable-natural-prefix on</kbd>.
						<br />
						<sup>2</sup>The prefix can be replaced in a server basis with the command
						<kbd class="kbd">conf set prefix [prefix]</kbd>, where <kbd class="kbd">[prefix]</kbd> is the desired prefix. If you
						forget the prefix, you can mention me and she will remind you what the configured prefix is. The default (also used in direct
						messages) is <kbd class="kbd">s!</kbd>.
					</p>

					<p>
						The list of commands <abbr title="The commands you have the permissions to run.">you can run</abbr> can be retrieved running
						<kbd class="kbd">@Skyra#7023 help</kbd>.
					</p>
				</div>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	invite: 'https://invite.skyra.pw/skyra',
	dashboard: true
});
</script>
