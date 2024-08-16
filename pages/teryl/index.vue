<template>
	<Head>
		<Title>Teryl</Title>
		<Meta name="description" content="Teryl's landing page" />
	</Head>

	<section class="mt-28 flex flex-col items-center text-center">
		<h2 class="title pb-4">Imagine a<br />tools and misc app</h2>
		<p class="max-w-[30rem]">
			A very customizable multilanguage application to cover many features and tools for your server,
			<span class="font-bold underline underline-offset-2">100% for free</span>!
		</p>
	</section>

	<section class="join mt-16">
		<nuxt-link class="btn join-item md:btn-wide" :to="Invites.Teryl"><Icon name="ph:plus-circle-fill" class="h-5 w-5" /> Add App</nuxt-link>
		<nuxt-link class="btn join-item md:btn-wide" to="#explore"><Icon name="ph:magnifying-glass-fill" class="h-5 w-5" /> Explore</nuxt-link>
	</section>

	<h2 id="explore" class="mt-72 text-5xl font-bold">Explore</h2>
	<section class="mt-32 grid w-full gap-4 md:gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="flex flex-col-reverse items-center gap-4 max-lg:order-last lg:flex-row">
			<discord-messages class="w-full">
				<discord-message v-show="reminderPublic" name="teryl" :command="{ user: 'stella', name: 'reminders create' }">
					Created a new reminder with ID <discord-inline-code>OkNf6vBakqY7BQksgub-Y</discord-inline-code>, I will send you a message on
					<discord-time format="long" />. Click on the button to (un)subscribe to the reminder.
					<discord-embed color="#6b79c9" :footer="{ text: 'OkNf6vBakqY7BQksgub' }" :timestamp="Date.now()">
						My little group reminder!
					</discord-embed>
					<discord-button @click="reminderPublicSubscribed = !reminderPublicSubscribed">
						Subscribe ({{ reminderPublicSubscribed ? 1 : 0 }}/24)
					</discord-button>
				</discord-message>
				<discord-message v-show="!reminderPublic" name="teryl" :command="{ user: 'stella', name: 'reminders create' }" :ephemeral="true">
					Created a new reminder with ID <discord-inline-code>OkNf6vBakqY7BQksgub-Y</discord-inline-code>, I will send you a message on
					<discord-time format="long" />.
				</discord-message>
			</discord-messages>

			<div>
				<button
					class="btn tooltip"
					@click="reminderPublic = !reminderPublic"
					:aria-label="reminderPublic ? 'Group Reminder' : 'Personal Reminder'"
					:data-tip="reminderPublic ? 'Group Reminder' : 'Personal Reminder'"
				>
					<icon v-if="reminderPublic" name="ph:users-three-duotone" class="h-6 w-6" aria-hidden="true" />
					<icon v-else name="ph:user-duotone" class="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
		</div>

		<div class="prose">
			<h3 class="mb-4 text-3xl font-bold">
				<Icon name="ph:bell-fill" class="h-8 w-8" aria-hidden="true" />
				Teryl can handle <span class="underline underline-offset-4">reminders</span>
			</h3>

			<p>With 5 seconds of precision, Teryl can send reminders accurately on time.</p>

			<p>You can define the reminder's scope:</p>
			<ul>
				<li>
					<Icon name="ph:user-duotone" class="my-0 mr-1 h-5 w-5" />
					<strong>Personal reminder:</strong> the default, sends the reminder to your direct messages.
				</li>
				<li>
					<Icon name="ph:users-three-duotone" class="my-0 mr-1 h-5 w-5 text-purple-500" />
					<strong>Group reminder:</strong> sends the reminder to the channel, and up to 24 users can join, then sends the reminder
					mentioning the subscribed users.
				</li>
			</ul>

			<p>And even whether or not a reminder should be silent!</p>
			<ul>
				<li>
					<Icon name="ph:bell-duotone" class="my-0 mr-1 h-5 w-5 text-warning" />
					<strong>Notify:</strong> the reminder will create a push notification if you're not on Discord.
				</li>
				<li>
					<Icon name="ph:bell-z-duotone" class="my-0 mr-1 h-5 w-5" />
					<strong>Silent:</strong> the reminder will not notify you until you're on Discord.
				</li>
			</ul>
		</div>
	</section>

	<section class="mt-32 grid w-full gap-4 md:gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="prose">
			<h3 class="mb-4 text-3xl font-bold">
				<Icon name="ph:tag-fill" class="h-8 w-8" aria-hidden="true" />
				Teryl can do <span class="underline underline-offset-4">tags</span>
			</h3>

			<p>Chunks of text you can store in the bot for referencing later.</p>

			<p>You can define the tag's style:</p>
			<ul>
				<li>
					<Icon name="ph:text-align-left-duotone" class="my-0 mr-1 h-5 w-5 text-branding-teryl" />
					<strong>Text:</strong> the default, displays the content as-is like a normal message.
				</li>
				<li>
					<Icon name="ph:chat-text-duotone" class="my-0 mr-1 h-5 w-5 text-branding-teryl" />
					<strong>Card:</strong> displays the content inside a card.
				</li>
			</ul>

			<p>And you can change how the tag is sent!</p>
			<ul>
				<li>
					<template v-if="tagMode === 'hide'">
						<icon name="ph:eye-slash-duotone" class="my-0 mr-1 h-5 w-5 text-base-content/60" />
						<strong>Hide:</strong> hide the message, perfect for checking a tag before showing it.
					</template>
					<template v-else>
						<icon name="ph:eye-duotone" class="my-0 mr-1 h-5 w-5 text-warning" />
						<strong>Show:</strong> display the tag on Discord.
					</template>
				</li>
				<li>
					<template v-if="tagMode === 'user'">
						<icon name="ph:user-duotone" class="my-0 mr-1 h-5 w-5 text-purple-500" />
						<strong>Suggest:</strong> suggest the tag to a user, this will ping only the specified user.
					</template>
					<template v-else>
						<icon name="ph:user-circle-dashed-duotone" class="my-0 mr-1 h-5 w-5 text-base-content/60" />
						<strong>No user:</strong> the default, it will show the tag content as-is.
					</template>
				</li>
			</ul>
		</div>

		<div class="flex flex-col-reverse items-center gap-4 max-lg:order-last lg:flex-row-reverse">
			<discord-messages class="w-full">
				<discord-message :ephemeral="tagMode === 'hide'" name="teryl" :command="{ user: 'stella', name: 'tag' }">
					<span v-show="tagMode === 'user'" class="font-bold">
						Tag suggestion for <discord-mention kind="mention">user</discord-mention>:
						<br />
					</span>

					<discord-embed v-if="tagEmbed" color="#6b79c9">
						Teryl is a misc and utilities Discord bot.
					</discord-embed>
					<template v-else>
						Teryl is a misc and utilities Discord bot.
					</template>
				</discord-message>
			</discord-messages>

			<div class="flex flex-col gap-2">
				<button
					class="btn tooltip tooltip-right"
					@click="tagEmbed = !tagEmbed"
					:aria-label="tagEmbed ? 'Card' : 'Text'"
					:data-tip="tagEmbed ? 'Card' : 'Text'"
				>
					<icon v-if="tagEmbed" name="ph:chat-text-duotone" class="h-6 w-6 text-branding-teryl" aria-hidden="true" />
					<icon v-else name="ph:text-align-left-duotone" class="h-6 w-6 text-branding-teryl" aria-hidden="true" />
				</button>

				<button
					class="btn tooltip tooltip-right"
					@click="tagMode = tagMode === 'hide' ? 'visible' : 'hide'"
					:aria-label="tagMode === 'hide' ? 'Hidden' : 'Visible'"
					:data-tip="tagMode === 'hide' ? 'Hidden' : 'Visible'"
				>
					<icon v-if="tagMode === 'hide'" name="ph:eye-slash-duotone" class="h-6 w-6 text-base-content/60" aria-hidden="true" />
					<icon v-else name="ph:eye-duotone" class="h-6 w-6 text-warning" aria-hidden="true" />
				</button>

				<button
					class="btn tooltip tooltip-right"
					@click="tagMode = tagMode === 'user' ? 'visible' : 'user'"
					:aria-label="tagMode === 'user' ? 'Suggesting' : 'Not Suggesting'"
					:data-tip="tagMode === 'user' ? 'Suggesting' : 'Not Suggesting'"
				>
					<icon v-if="tagMode === 'user'" name="ph:user-duotone" class="h-6 w-6 text-purple-500" aria-hidden="true" />
					<icon v-else name="ph:user-circle-dashed-duotone" class="h-6 w-6 text-base-content/60" aria-hidden="true" />
				</button>
			</div>
		</div>
	</section>

	<section class="invite-card mt-32 flex flex-col items-center">
		<h3 class="mb-4 text-3xl font-bold">Liking what you see?</h3>

		<div class="join">
			<nuxt-link :to="Invites.Teryl" class="btn btn-ghost join-item">Invite Teryl</nuxt-link>
			<nuxt-link to="https://join.skyra.pw" class="btn btn-ghost join-item">Support Server</nuxt-link>
		</div>
	</section>

	<other-apps :apps="[OtherApps.Skyra, OtherApps.Iriss, OtherApps.Nekokai, OtherApps.Artiel]" />
</template>

<script setup lang="ts">
const reminderPublic = ref(false);
const reminderPublicSubscribed = ref(false);

const tagEmbed = ref(false);
const tagMode = ref<'visible' | 'hide' | 'user'>('visible');
</script>

<style scoped>
.title {
	@apply text-4xl font-bold leading-[3.05rem] md:text-5xl md:leading-[3.8rem];
	background: linear-gradient(to bottom in oklch, whitesmoke 40%, oklch(from oklch(var(--branding-teryl)) calc(l + 0.1) c h) 100%);
	background-clip: text;
	line-height: 3.8rem;
	-webkit-text-fill-color: transparent;
}

.invite-card {
	@apply relative p-12 text-white;
}

.invite-card::before {
	@apply absolute left-0 top-0 -z-10 h-full w-full -rotate-2 rounded-xl drop-shadow-lg;
	background: linear-gradient(to bottom right in oklch, theme('colors.violet.500') 0%, theme('colors.indigo.500') 70%);
	background: linear-gradient(
		to bottom right in oklch,
		oklch(from oklch(var(--branding-teryl)) calc(l + 0.1) c calc(h + 20)) 0%,
		oklch(from oklch(var(--branding-teryl)) calc(l - 0.1) c h) 70%
	);
	content: '';
}
</style>
