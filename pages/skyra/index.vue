<template>
	<Head>
		<Title>Skyra</Title>
		<Meta name="description" content="Skyra's landing page" />
	</Head>

	<section class="mt-28 flex flex-col items-center text-center">
		<h2 class="title pb-4">Imagine a<br />moderation app</h2>
		<p class="max-w-[30rem]">
			A very customizable multilanguage application to help you moderate your server, with a complete logging suite and more,
			<span class="font-bold underline underline-offset-2">100% for free</span>!
		</p>
	</section>

	<section class="join mt-16">
		<nuxt-link class="btn join-item sm:btn-wide" :to="Invites.Skyra"><Icon name="ph:plus-circle-fill" class="h-5 w-5" /> Add App</nuxt-link>
		<nuxt-link class="btn join-item sm:btn-wide" to="#explore"><Icon name="ph:magnifying-glass-fill" class="h-5 w-5" /> Explore</nuxt-link>
	</section>

	<h2 id="explore" class="mt-72 text-5xl font-bold">Explore</h2>
	<section class="mt-32 grid gap-4 md:gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="flex flex-col-reverse items-center gap-4 max-lg:order-last lg:flex-row">
			<discord-messages class="w-full">
				<discord-message v-if="featureIndex === AutomodFeature.Spam" name="baddie">Guys look at me!</discord-message>
				<discord-message v-if="featureIndex === AutomodFeature.Spam" name="baddie">Guys look at me!</discord-message>
				<discord-message
					:name="featureIndex === AutomodFeature.Reactions ? 'stella' : 'baddie'"
					:class="{ 'text-error': featureIndex !== AutomodFeature.Reactions }"
				>
					<template v-if="featureIndex === AutomodFeature.Attachments">
						Have you seen this????
						<div class="grid max-w-96 grid-cols-2 gap-2">
							<div class="flex aspect-video w-full items-center justify-center rounded-lg bg-base-100 drop-shadow-lg">
								<Icon name="ph:image-duotone" class="h-24 w-24 animate-pulse text-base-content/20" />
							</div>
							<div class="flex aspect-video w-full items-center justify-center rounded-lg bg-base-100 drop-shadow-lg">
								<Icon name="ph:image-duotone" class="h-24 w-24 animate-pulse text-base-content/20" />
							</div>
							<div class="flex aspect-video w-full items-center justify-center rounded-lg bg-base-100 drop-shadow-lg">
								<Icon name="ph:image-duotone" class="h-24 w-24 animate-pulse text-base-content/20" />
							</div>
							<div class="flex aspect-video w-full items-center justify-center rounded-lg bg-base-100 drop-shadow-lg">
								<Icon name="ph:image-duotone" class="h-24 w-24 animate-pulse text-base-content/20" />
							</div>
						</div>
					</template>
					<template v-else-if="featureIndex === AutomodFeature.Capitals">
						I CAN TALK IN ALL UPPER CASES, <strong>AND SKYRA WILL NOT STOP ME!</strong>
					</template>
					<template v-else-if="featureIndex === AutomodFeature.Invites">
						Everyone join my server!
						<nuxt-link to="https://discord.gg/6gakFR2" class="text-info">https://discord.gg/6gakFR2</nuxt-link>
						<discord-invite link="https://discord.gg/6gakFR2" />
					</template>
					<template v-else-if="featureIndex === AutomodFeature.Links">
						Everyone check out those links!
						<ul class="ml-5 list-disc">
							<li><span class="text-info">https://definitely-not-pishing.com</span></li>
							<li><span class="text-info">https://redundant-spam-links.net</span></li>
							<li><span class="text-info">https://too-many-links.com</span></li>
							<li><span class="text-info">https://trojan-horse.xyz</span></li>
							<li><span class="text-info">https://not-a-virus.com</span></li>
						</ul>
					</template>
					<template v-else-if="featureIndex === AutomodFeature.Mentions">
						Everyone notice me! <discord-mention kind="mention">everyone</discord-mention>
						<discord-mention kind="mention">members</discord-mention>{{ ' ' }}<discord-mention kind="mention">moderators</discord-mention>
					</template>
					<template v-else-if="featureIndex === AutomodFeature.Newlines">
						Hehehehe
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						So many lines!
					</template>
					<template v-else-if="featureIndex === AutomodFeature.Reactions">
						Hey folks! I have great news to share!
						<discord-reactions>
							<discord-reaction :count="7" self><Icon name="ph:cheers-fill" class="text-success"></Icon></discord-reaction>
							<discord-reaction :count="1" class="text-error"><Icon name="ph:knife-fill"></Icon></discord-reaction>
						</discord-reactions>
					</template>
					<template v-else-if="featureIndex === AutomodFeature.Spam">Guys look at me!</template>
					<template v-else-if="featureIndex === AutomodFeature.Words">
						I would like to say that you're a <strong>disgusting</strong> person.
					</template>
				</discord-message>
				<discord-message name="skyra">
					Dear <discord-mention kind="mention">Baddie</discord-mention>, {{ texts[featureIndex].alert }}
				</discord-message>
			</discord-messages>

			<div class="flex flex-row items-center gap-1 lg:flex-col">
				<Icon name="ph:caret-down-bold" class="radio-feature-arrow rotate-90 lg:rotate-180" role="button" @click="advanceFeatureIndex(-1)" />
				<div v-for="(text, index) of texts" class="radio-feature-container" :data-tip="text.tooltip">
					<input v-model="featureIndex" type="radio" name="automod-feature" class="radio-feature" :value="index" />
				</div>
				<Icon name="ph:caret-down-bold" class="radio-feature-arrow -rotate-90 lg:rotate-0" role="button" @click="advanceFeatureIndex(1)" />
			</div>
		</div>

		<div class="prose">
			<h3 class="mb-4 text-3xl font-bold">
				<Icon name="ph:shield-fill" class="h-8 w-8" aria-hidden="true" />
				Skyra can act on <span class="underline underline-offset-4">{{ texts[featureIndex].title }}</span>
			</h3>

			<p>Enjoy the power of moderation with Skyra, a fully customizable moderation bot for your server.</p>

			<p>You can define what Skyra should do on every infraction:</p>
			<ul>
				<li>
					<Icon name="ph:arrow-u-up-left" class="my-0 mr-1 h-5 w-5" />
					<strong>Alert the user:</strong> send a message notifying the user of their infraction.
				</li>
				<li>
					<Icon name="ph:flag-fill" class="my-0 mr-1 h-5 w-5 text-warning" />
					<strong>Post moderation log:</strong> send a message to the moderation log channel for moderators to see.
				</li>
				<li>
					<Icon name="ph:trash-simple-fill" class="my-0 mr-1 h-5 w-5 text-error" />
					<strong>Delete the message:</strong> delete the message that triggered the infraction, keeping your channels clean.
				</li>
			</ul>

			<p>And even what Skyra should do after repeated infractions!</p>
			<ul>
				<li>
					<Icon name="ph:shield-check-duotone" class="my-0 mr-1 h-5 w-5 text-purple-500" />
					<strong>Define the punishment action:</strong> from a simple warning to a full ban, and everything in between, with a customizable
					<strong>punishment duration</strong> ranging from seconds to even years, or permanent.
				</li>
				<li>
					<Icon name="ph:hourglass-duotone" class="my-0 mr-1 h-5 w-5" />
					<strong>Define the threshold:</strong> how many infractions are needed within a period of time before the punishment is applied.
				</li>
			</ul>
		</div>
	</section>

	<section class="mt-32 grid gap-4 md:gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="prose">
			<h3 class="mb-4 text-3xl font-bold">
				<Icon name="ph:shield-fill" class="h-8 w-8" aria-hidden="true" />
				A complete suite for <span class="underline underline-offset-4">moderation logs</span>
			</h3>

			<p>
				Easily searchable moderation logs, with a complete history of every action taken by Skyra in your server, and with the ability to
				filter them later by user, action, and more!
			</p>

			<p>
				<Icon name="ph:binoculars-duotone" class="my-0 mr-1 h-5 w-5 text-purple-500" />
				Skyra can also listen for external moderation actions. You prefer banning by hand than by bot? Good news, Skyra can be configured to
				listen and log external bans, retrieving the reason from audit logs!
			</p>
		</div>

		<div class="flex flex-col items-center gap-4 lg:flex-row">
			<div class="flex flex-row items-center gap-1 lg:flex-col">
				<Icon
					name="ph:caret-down-bold"
					class="radio-feature-arrow rotate-90 lg:rotate-180"
					role="button"
					@click="advanceModerationIndex(-1)"
				/>
				<div v-for="(action, index) of moderationActions" :key="action.name" class="radio-feature-container" :data-tip="action.name">
					<input v-model="moderationIndex" type="radio" name="moderation-log" class="radio-feature" :value="index" />
				</div>
				<Icon name="ph:caret-down-bold" class="radio-feature-arrow -rotate-90 lg:rotate-0" role="button" @click="advanceModerationIndex(1)" />
			</div>

			<div class="flex flex-col items-center">
				<discord-messages>
					<discord-message name="skyra">
						<discord-embed
							:color="moderationActionRender.color"
							:author="{ icon: '/img/avatars/skyra.png', name: 'Skyra#7023 (266624760782258186)' }"
							:footer="{ icon: '/img/avatars/skyra.png', text: 'Case 3' }"
							:timestamp="Date.now()"
						>
							<span><strong>❯ Type:</strong> {{ moderationActionRender.name }}</span
							><br />
							<span><strong>❯ User:</strong> @baddie (541738403230777351)</span><br />
							<span><strong>❯ Reason:</strong> spam</span>
						</discord-embed>
					</discord-message>
				</discord-messages>

				<div class="join mt-4">
					<button
						class="btn join-item md:btn-wide"
						:class="{ 'btn-info': moderationTemporary }"
						:disabled="moderationAction.temporary === null"
						@click="(moderationTemporary = !moderationTemporary), (moderationUndo = false)"
					>
						<Icon name="ph:hourglass-duotone" class="my-0 mr-1 h-5 w-5" />
						Temporary
					</button>
					<button
						class="btn join-item md:btn-wide"
						:class="{ 'btn-success': moderationUndo }"
						:disabled="moderationAction.undo === null"
						@click="(moderationUndo = !moderationUndo), (moderationTemporary = false)"
					>
						<Icon name="ph:arrow-counter-clockwise-duotone" class="my-0 mr-1 h-5 w-5" />
						Undo
					</button>
				</div>
			</div>
		</div>
	</section>

	<section class="prose">
		<h3 class="mt-32 text-center text-3xl font-bold">And a more!</h3>
		<p>Skyra not only comes with a very complete moderation suite, but also:</p>
		<ul>
			<li>
				<Icon name="ph:chat-text-duotone" class="my-0 mr-1 h-5 w-5 text-warning" />
				<strong>A large logging suite:</strong> Skyra can log almost everything that happens in your server: moderation actions, message
				updates and deletions, channel updates and deletions, role updates and deletions, server updates, members changing voice channels, and
				more.
			</li>
			<li>
				<Icon name="ph:twitch-logo-duotone" class="my-0 mr-1 h-5 w-5 text-purple-500" />
				<strong>Twitch notifications:</strong> Skyra can automatically moderate your server, so you can focus on what matters most.
			</li>
			<li>
				<Icon name="ph:money-wavy-duotone" class="my-0 mr-1 h-5 w-5 text-error" />
				<strong>No paywalls:</strong> all of Skyra's features are <strong>available for free</strong> and all logs are sent to your server as
				soon as they happen, without any delay. Skyra Project <strong>will never paywall core features</strong>, and also
				<strong>strongly believes in Open-Source Software</strong>, making all the apps' source code freely available to everyone, and will
				always stay that way.
			</li>
		</ul>
	</section>

	<section class="invite-card mt-32 flex flex-col items-center">
		<h3 class="mb-4 text-3xl font-bold">Liking what you see?</h3>

		<div class="join">
			<nuxt-link :to="Invites.Skyra" class="btn btn-ghost join-item">Invite Skyra</nuxt-link>
			<nuxt-link to="https://join.skyra.pw" class="btn btn-ghost join-item">Support Server</nuxt-link>
		</div>
	</section>

	<other-apps :apps="[OtherApps.Iriss, OtherApps.Teryl, OtherApps.Nekokai, OtherApps.Artiel]" />
</template>

<script setup lang="ts">
definePageMeta({ alias: ['/'] });

enum AutomodFeature {
	Attachments,
	Capitals,
	Invites,
	Links,
	Mentions,
	Newlines,
	Reactions,
	Spam,
	Words
}

const texts = [
	{ tooltip: 'Attachments', title: 'attachments', alert: "file attachments aren't allowed in this channel." },
	{ tooltip: 'Capitals', title: 'capital letters', alert: 'please reduce your use of capital letters.' },
	{ tooltip: 'Invites', title: 'invites', alert: "invite links aren't allowed in this channel." },
	{ tooltip: 'Links', title: 'bad links', alert: "you sent links that aren't allowed here." },
	{ tooltip: 'Mentions', title: 'excessive mentions', alert: 'you mentioned too many people.' },
	{ tooltip: 'Lines', title: 'excessive lines', alert: 'your message contains too many lines.' },
	{ tooltip: 'Reactions', title: 'bad reactions', alert: 'you cannot react with that emoji.' },
	{ tooltip: 'Spam', title: 'spam', alert: 'please refrain from reposting the same message multiple times.' },
	{ tooltip: 'Words', title: 'bad words', alert: 'you said something that is not allowed in this server.' }
];

const featureIndex = ref(0);

const moderationActions = Object.values(ModerationActions);
const moderationIndex = ref(0);
const moderationAction = computed(() => moderationActions[moderationIndex.value]);

const moderationTemporary = ref(false);
const moderationUndo = ref(false);

const moderationActionRender = computed(() => {
	const action = moderationAction.value;
	if (moderationTemporary.value && action.temporary !== null) {
		return { color: action.temporary, name: `Temporary ${action.name}` };
	}

	if (moderationUndo.value && action.undo !== null) {
		return { color: action.undo, name: `Remove ${action.name}` };
	}

	return { color: action.color, name: action.name };
});

function advanceFeatureIndex(value: -1 | 1) {
	featureIndex.value = (featureIndex.value + value + texts.length) % texts.length;
}

function advanceModerationIndex(value: -1 | 1) {
	moderationIndex.value = (moderationIndex.value + value + moderationActions.length) % moderationActions.length;
}
</script>

<style scoped>
.title {
	@apply text-4xl font-bold leading-[3.05rem] md:text-5xl md:leading-[3.8rem];
	background: linear-gradient(to bottom in oklch, whitesmoke 40%, oklch(from oklch(var(--branding-skyra)) calc(l + 0.1) c h) 100%);
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.radio-feature-container {
	@apply tooltip tooltip-top lg:tooltip-right;
	display: inherit;
}

.radio-feature {
	@apply h-4 w-4 cursor-pointer appearance-none rounded-full bg-base-content/20;
}

.radio-feature-arrow {
	@apply h-4 w-4;
}

@media not (hover: hover) {
	.radio-feature {
		@apply h-6 w-6;
	}

	.radio-feature-arrow {
		@apply h-6 w-6;
	}
}

.radio-feature:not(:checked):hover {
	@apply bg-base-content/40;
}

.radio-feature:checked {
	@apply bg-base-content/80;
}

.radio-feature:checked:hover {
	@apply bg-base-content;
}

.radio-feature {
	transition: linear background-color 0.25s;
}

.invite-card {
	@apply relative p-12 text-white;
}

.invite-card::before {
	@apply absolute left-0 top-0 -z-10 h-full w-full -rotate-2 rounded-xl drop-shadow-lg;
	background: linear-gradient(to bottom right in oklch, theme('colors.cyan.600') 0%, theme('colors.violet.600') 70%);
	background: linear-gradient(
		to bottom right in oklch,
		oklch(from oklch(var(--branding-skyra)) calc(l + 0.1) c calc(h - 30)) 0%,
		oklch(from oklch(var(--branding-skyra)) calc(l - 0.1) c calc(h + 30)) 70%
	);
	content: '';
}
</style>
