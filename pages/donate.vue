<template>
	<div class="content-fit py-10">
		<Head>
			<Title>Skyra | Donation Links</Title>
			<Meta name="description" content="See how you can donate to Skyra Project's development" />
		</Head>

		<article class="prose">
			<h1>Donation links</h1>

			<p>You can find the links to support the development of Skyra Project, below:</p>
		</article>

		<div class="grid xl:grid-cols-3 gap-4 py-8">
			<div class="card bg-base-200 shadow-xl">
				<figure class="px-10 pt-10"><icons-patreon class="h-20 fill-base-content" /></figure>
				<div class="card-body">
					<h2 class="card-title">Patreon</h2>
					<p>Supports <span class="font-bold">monthly payments only</span>.</p>
					<div class="card-actions justify-end">
						<nuxt-link class="btn btn-primary" to="https://donate.skyra.pw/patreon">Go to</nuxt-link>
					</div>
				</div>
			</div>

			<div class="card bg-base-200 shadow-xl">
				<figure class="px-10 pt-10"><icons-ko-fi class="h-20 fill-base-content" /></figure>
				<div class="card-body">
					<h2 class="card-title">Ko-Fi</h2>
					<p>Supports both <span class="font-bold">single-time</span> and <span class="font-bold">monthly</span> payments.</p>
					<div class="card-actions justify-end">
						<nuxt-link class="btn btn-primary" to="https://donate.skyra.pw/kofi">Go to</nuxt-link>
					</div>
				</div>
			</div>

			<div class="card bg-base-200 shadow-xl">
				<figure class="px-10 pt-10"><icons-paypal class="h-20 fill-base-content" /></figure>
				<div class="card-body">
					<h2 class="card-title">Paypal</h2>
					<p>Supports both <span class="font-bold">single-time</span> and <span class="font-bold">monthly</span> payments.</p>
					<div class="card-actions justify-end">
						<nuxt-link class="btn btn-primary" to="https://donate.skyra.pw/paypal">Go to</nuxt-link>
					</div>
				</div>
			</div>
		</div>

		<article class="prose">
			<h2 class="uppercase">Privacy Policy</h2>
			<p>You can find our Privacy Policy <nuxt-link to="privacy">here</nuxt-link>.</p>
		</article>
	</div>
</template>
