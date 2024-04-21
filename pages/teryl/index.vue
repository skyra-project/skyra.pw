<template>
	<Head>
		<Title>Teryl</Title>
		<Meta name="description" content="Teryl's landing page" />
	</Head>

	<section class="text-center mt-28 flex flex-col items-center">
		<h2 class="title pb-4">Imagine a<br />tools and misc app</h2>
		<p class="max-w-[30rem]">
			A very customizable multilanguage application to cover many features and tools for your server,
			<span class="underline underline-offset-2 font-bold">100% for free</span>!
		</p>
	</section>

	<section class="join mt-16">
		<nuxt-link class="btn md:btn-wide join-item" :to="Invites.Teryl"><Icon name="ph:plus-circle-fill" class="w-5 h-5" /> Add App</nuxt-link>
		<nuxt-link class="btn md:btn-wide join-item" to="#explore"><Icon name="ph:magnifying-glass-fill" class="w-5 h-5" /> Explore</nuxt-link>
	</section>
</template>

<style scoped>
.title {
	@apply text-4xl leading-[3.05rem] md:text-5xl md:leading-[3.8rem] font-bold;
	line-height: 3.8rem;
	background: linear-gradient(to bottom in oklch, whitesmoke 40%, oklch(from oklch(var(--branding-teryl)) calc(l + 0.1) c h) 100%);
	background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
