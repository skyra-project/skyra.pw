<template>
	<Head>
		<Title>Iriss</Title>
		<Meta name="description" content="Iriss's landing page" />
	</Head>

	<section class="mt-28 flex flex-col items-center text-center">
		<h2 class="title pb-4">Imagine a<br />feedback management app</h2>
		<p class="max-w-[30rem]">
			A very customizable multilanguage application to help you manage feedback from your server's users,
			<span class="font-bold underline underline-offset-2">100% for free</span>!
		</p>
	</section>

	<section class="join mt-16">
		<nuxt-link class="btn join-item md:btn-wide" :to="Invites.Iriss"><Icon name="ph:plus-circle-fill" class="h-5 w-5" /> Add App</nuxt-link>
		<nuxt-link class="btn join-item md:btn-wide" to="#explore"><Icon name="ph:magnifying-glass-fill" class="h-5 w-5" /> Explore</nuxt-link>
	</section>
</template>

<style scoped>
.title {
	@apply text-4xl font-bold leading-[3.05rem] md:text-5xl md:leading-[3.8rem];
	line-height: 3.8rem;
	background: linear-gradient(to bottom in oklch, whitesmoke 40%, oklch(from oklch(var(--branding-iriss)) calc(l + 0.1) c h) 100%);
	background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
