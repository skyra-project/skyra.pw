<template>
	<section class="text-center mt-28">
		<h2 class="title pb-4">
			Imagine a<br />
			moderation app
		</h2>
		<p class="max-w-[30rem]">
			A very customizable multilanguage application to help you moderate your server, with a complete logging suite and more,
			<span class="underline underline-offset-2 font-bold">100% for free</span>!
		</p>
	</section>

	<section class="join mt-16">
		<nuxt-link class="btn btn-wide join-item" :to="Invites.Skyra"><Icon name="ph:plus-circle-fill" class="w-5 h-5" /> Add App</nuxt-link>
		<nuxt-link class="btn btn-wide join-item" to="#explore"><Icon name="ph:magnifying-glass-fill" class="w-5 h-5" /> Explore</nuxt-link>
	</section>

	<h2 id="explore" class="text-5xl font-bold mt-72">Explore</h2>
	<section class="grid grid-cols-2 gap-20 mt-32">
		<div class="flex items-center gap-4">
			<div class="w-full">
				<discord-messages class="w-full">
					<discord-message v-if="featureIndex === AutomodFeature.Spam" name="baddie">Guys look at me!</discord-message>
					<discord-message v-if="featureIndex === AutomodFeature.Spam" name="baddie">Guys look at me!</discord-message>
					<discord-message
						:name="featureIndex === AutomodFeature.Reactions ? 'stella' : 'baddie'"
						:class="{ 'text-error': featureIndex !== AutomodFeature.Reactions }"
					>
						<template v-if="featureIndex === AutomodFeature.Attachments">
							Have you seen this????
							<div class="grid grid-cols-2 gap-2 w-96">
								<div class="bg-base-100 w-full h-32 rounded-lg drop-shadow-lg flex items-center justify-center">
									<Icon name="ph:image-duotone" class="animate-pulse w-24 h-24 text-base-content/20" />
								</div>
								<div class="bg-base-100 w-full h-32 rounded-lg drop-shadow-lg flex items-center justify-center">
									<Icon name="ph:image-duotone" class="animate-pulse w-24 h-24 text-base-content/20" />
								</div>
								<div class="bg-base-100 w-full h-32 rounded-lg drop-shadow-lg flex items-center justify-center">
									<Icon name="ph:image-duotone" class="animate-pulse w-24 h-24 text-base-content/20" />
								</div>
								<div class="bg-base-100 w-full h-32 rounded-lg drop-shadow-lg flex items-center justify-center">
									<Icon name="ph:image-duotone" class="animate-pulse w-24 h-24 text-base-content/20" />
								</div>
							</div>
						</template>
						<template v-else-if="featureIndex === AutomodFeature.Capitals">
							I CAN TALK IN ALL UPPER CASES, <strong>AND SKYRA WILL NOT STOP ME!</strong>
						</template>
						<template v-else-if="featureIndex === AutomodFeature.Invites">
							Everyone join my server!
							<nuxt-link to="https://discord.gg/6gakFR2" class="text-info">https://discord.gg/6gakFR2</nuxt-link>
							<div class="bg-base-200 px-4 pb-4 pt-2 mt-2 rounded-md drop-shadow-lg">
								<span class="uppercase text-xs font-extrabold">You've been invited to join a server</span>
								<div class="flex mt-2">
									<div class="w-12 h-12 rounded-xl bg-base-content/20">
										<icons-skyra class="p-1" />
									</div>
									<div class="flex-grow ml-4">
										<div class="font-bold">Skyra Lounge</div>
										<div class="flex items-center">
											<span class="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
											144 Online

											<span class="w-2 h-2 bg-base-content/80 rounded-full inline-block mr-1 ml-4"></span>
											1,027 Members
										</div>
									</div>
									<div>
										<nuxt-link to="https://discord.gg/6gakFR2" class="btn btn-error">Join</nuxt-link>
									</div>
								</div>
							</div>
						</template>
						<template v-else-if="featureIndex === AutomodFeature.Links">
							Everyone check out those links!
							<ul class="list-disc ml-5">
								<li><span class="text-info">https://definitely-not-pishing.com</span></li>
								<li><span class="text-info">https://redundant-spam-links.net</span></li>
								<li><span class="text-info">https://too-many-links.com</span></li>
								<li><span class="text-info">https://trojan-horse.xyz</span></li>
								<li><span class="text-info">https://not-a-virus.com</span></li>
							</ul>
						</template>
						<template v-else-if="featureIndex === AutomodFeature.Mentions">
							Everyone notice me! <discord-mention>everyone</discord-mention> <discord-mention>members</discord-mention>{{ ' '
							}}<discord-mention>moderators</discord-mention>
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
					<discord-message name="skyra">Dear <discord-mention>Baddie</discord-mention>, {{ texts[featureIndex].alert }}</discord-message>
				</discord-messages>
			</div>

			<div class="flex flex-col gap-1">
				<div v-for="(text, index) of texts" class="tooltip tooltip-left" :data-tip="text.tooltip">
					<input v-model="featureIndex" @click="pause" type="radio" name="automod-feature" class="radio-feature" :value="index" />
				</div>
			</div>
		</div>

		<div class="prose max-w-none">
			<h3 class="text-3xl font-bold flex items-center gap-2 mb-4">
				<Icon name="ph:shield-fill" class="w-8 h-8" aria-hidden="true" />
				Skyra can act on <span class="underline underline-offset-4">{{ texts[featureIndex].title }}</span>
			</h3>

			<p>Enjoy the power of moderation with Skyra, a fully customizable moderation bot for your server.</p>

			<p>You can define what Skyra should do on every infraction:</p>
			<ul>
				<li>
					<Icon name="ph:arrow-u-up-left" class="w-5 h-5 my-0 mr-1" />
					<strong>Alert the user:</strong> send a message notifying the user of their infraction.
				</li>
				<li>
					<Icon name="ph:flag-fill" class="w-5 h-5 my-0 mr-1 text-warning" />
					<strong>Post moderation log:</strong> send a message to the moderation log channel for moderators to see.
				</li>
				<li>
					<Icon name="ph:trash-simple-fill" class="w-5 h-5 my-0 mr-1 text-error" />
					<strong>Delete the message:</strong> delete the message that triggered the infraction, keeping your channels clean.
				</li>
			</ul>

			<p>And even what Skyra should do after repeated infractions!</p>
			<ul>
				<li>
					<Icon name="ph:shield-check-duotone" class="w-5 h-5 my-0 mr-1 text-purple-500" />
					<strong>Define the punishment action:</strong> from a simple warning to a full ban, and everything in between, with a customizable
					<strong>punishment duration</strong> ranging from seconds to even years, or permanent.
				</li>
				<li>
					<Icon name="ph:hourglass-duotone" class="w-5 h-5 my-0 mr-1" />
					<strong>Define the threshold:</strong> how many infractions are needed within a period of time before the punishment is applied.
				</li>
			</ul>
		</div>
	</section>

	<section class="grid grid-cols-2 gap-20 mt-32">
		<div class="prose max-w-none">
			<h3 class="text-3xl font-bold flex items-center gap-2 mb-4">
				<Icon name="ph:shield-fill" class="w-8 h-8" aria-hidden="true" />
				A complete suite for <span class="underline underline-offset-4">moderation logs</span>
			</h3>

			<p>
				Easily searchable moderation logs, with a complete history of every action taken by Skyra in your server, and with the ability to
				filter them later by user, action, and more!
			</p>

			<p>
				<Icon name="ph:binoculars-duotone" class="w-5 h-5 my-0 mr-1 text-purple-500" />
				Skyra can also listen for external moderation actions. You prefer banning by hand than by bot? Good news, Skyra can be configured to
				listen and log external bans, retrieving the reason from audit logs!
			</p>
		</div>

		<div class="flex items-center gap-4">
			<div class="flex flex-col gap-1">
				<div v-for="(action, index) of moderationActions" :key="action.name" class="tooltip tooltip-right" :data-tip="action.name">
					<input v-model="moderationIndex" @click="pause" type="radio" name="moderation-log" class="radio-feature" :value="index" />
				</div>
			</div>

			<div class="w-full flex flex-col items-center">
				<discord-messages class="w-full">
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
						class="btn btn-wide join-item"
						:class="{ 'btn-info': moderationTemporary }"
						:disabled="moderationAction.temporary === null"
						@click="(moderationTemporary = !moderationTemporary), (moderationUndo = false)"
					>
						<Icon name="ph:hourglass-duotone" class="w-5 h-5 my-0 mr-1" />
						Temporary
					</button>
					<button
						class="btn btn-wide join-item"
						:class="{ 'btn-success': moderationUndo }"
						:disabled="moderationAction.undo === null"
						@click="(moderationUndo = !moderationUndo), (moderationTemporary = false)"
					>
						<Icon name="ph:arrow-counter-clockwise-duotone" class="w-5 h-5 my-0 mr-1" />
						Undo
					</button>
				</div>
			</div>
		</div>
	</section>

	<section class="prose max-w-none text-center">
		<h2 class="text-5xl font-bold mt-32">Other Apps</h2>
		<p>You want a feature that Skyra doesn't have? We got you covered!</p>
	</section>

	<div class="grid grid-cols-2 gap-4 mt-8 w-full">
		<div v-for="app of otherApps" class="flex flex-row bg-base-200 shadow-xl rounded-xl">
			<nuxt-img :src="app.avatar" width="256" height="256" :alt="`${app.name}'s avatar`" loading="lazy" class="flex rounded-l-xl" />
			<div class="card-body">
				<h2 class="card-title">
					{{ app.name }}
					<div v-for="purpose of app.purposes" class="badge badge-neutral">{{ purpose }}</div>
				</h2>
				<p>{{ app.description }}</p>
				<div class="card-actions justify-end join gap-0">
					<nuxt-link class="btn btn-neutral join-item" :to="app.explore">
						<Icon name="ph:magnifying-glass-fill" class="w-5 h-5" /> Explore
					</nuxt-link>
					<nuxt-link class="btn btn-neutral join-item" :to="app.invite">
						<Icon name="ph:plus-circle-fill" class="w-5 h-5" /> Add App
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
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

const { pause } = useIntervalFn(() => {
	featureIndex.value = (featureIndex.value + 1) % texts.length;
	moderationIndex.value = (moderationIndex.value + 1) % moderationActions.length;
}, 15000);

const otherApps = [
	{
		name: 'Iriss',
		explore: '/iriss',
		avatar: '/img/avatars/iriss.png',
		invite: Invites.Iriss,
		purposes: ['Suggestions', 'Feedback'],
		description: "An app to help you manage the suggestions and feedback from your server's members."
	},
	{
		name: 'Teryl',
		explore: '/teryl',
		avatar: '/img/avatars/teryl.png',
		invite: Invites.Teryl,
		purposes: ['Utilities', 'Miscellaneous'],
		description: 'An app to supercharge your server with many utility commands.'
	},
	{
		name: 'Nekokai',
		explore: '/nekokai',
		avatar: '/img/avatars/nekokai.png',
		invite: Invites.Nekokai,
		purposes: ['Anime', 'Manga'],
		description: 'Do you like anime or manga? Nekokai is the perfect bot for you!'
	},
	{
		name: 'Artiel',
		explore: '/artiel',
		avatar: '/img/avatars/artiel.png',
		invite: Invites.Artiel,
		purposes: ['Games', 'Fun'],
		description: "Sometimes servers feel boring and you're out of ideas to make it more fun, Artiel is here to help you with that!"
	}
];
</script>

<style scoped>
.title {
	@apply text-5xl font-bold;
	line-height: 3.8rem;
	background: linear-gradient(to bottom in oklch, whitesmoke 40%, color-mix(in oklch, currentColor, oklch(var(--branding-skyra) / 1) 80%) 100%);
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.radio-feature {
	@apply appearance-none w-4 h-4 bg-base-content/20 rounded-full cursor-pointer;
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
</style>
