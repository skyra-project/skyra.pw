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
	<section class="mt-32 grid gap-4 md:gap-12 lg:grid-cols-2 lg:gap-20">
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
