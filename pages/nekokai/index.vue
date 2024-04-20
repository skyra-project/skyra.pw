<template>
	<section class="text-center mt-28 flex flex-col items-center">
		<h2 class="title pb-4">Imagine an<br />anime and manga app</h2>
		<p class="max-w-[30rem]">
			A very customizable multilanguage application to cover your members' anime and manga needs, with a few entertainment features and more,
			<span class="underline underline-offset-2 font-bold">100% for free</span>!
		</p>
	</section>

	<section class="join mt-16">
		<nuxt-link class="btn btn-wide join-item" :to="Invites.Nekokai"><Icon name="ph:plus-circle-fill" class="w-5 h-5" /> Add App</nuxt-link>
		<nuxt-link class="btn btn-wide join-item" to="#explore"><Icon name="ph:magnifying-glass-fill" class="w-5 h-5" /> Explore</nuxt-link>
	</section>
</template>

<style scoped>
.title {
	@apply text-5xl font-bold;
	line-height: 3.8rem;
	background: linear-gradient(to bottom in oklch, whitesmoke 40%, color-mix(in oklch, currentColor, oklch(var(--branding-nekokai) / 1) 80%) 100%);
	background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
