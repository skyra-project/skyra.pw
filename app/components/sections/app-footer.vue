<template>
	<footer class="footer md:footer-horizontal bg-base-200 text-base-content mt-24 p-10">
		<aside>
			<div class="w-10 rounded-full">
				<icons-wolfstar class="h-12 w-12" />
			</div>
			<p>WolfStar Project<br />Providing reliable open-source software since 2024</p>
			<p>© 2024 All rights reserved.</p>
		</aside>
		<nav>
			<h6 class="footer-title">Links</h6>
			<nuxt-link class="link-hover link" to="https://join.wolfstar.rocks">
				<nuxt-icon name="ph:discord-logo-duotone" class="h-5 w-5 text-indigo-500" />
				Support Server
			</nuxt-link>
			<nuxt-link class="link-hover link" to="https://github.com/wolfstar-project">
				<nuxt-icon name="ph:github-logo-duotone" class="h-5 w-5 text-indigo-500" />
				GitHub</nuxt-link
			>
			<nuxt-link class="link-hover link" to="https://blog.wolfstar.rocks">
				<nuxt-icon name="ph:newspaper-clipping-duotone" class="text-primary h-5 w-5" />
				Blog
			</nuxt-link>
		</nav>
		<nav>
			<h6 class="footer-title">Donate</h6>
			<nuxt-link class="link-hover link" to="https://donate.wolfstar.rocks/patreon">
				<nuxt-icon name="ph:patreon-logo-duotone" class="h-5 w-5 text-rose-600" />
				Patreon
			</nuxt-link>
			<nuxt-link class="link-hover link" to="https://donate.wolfstar.rocks/paypal">
				<nuxt-icon name="ph:paypal-logo-duotone" class="h-5 w-5 text-sky-600" />
				PayPal
			</nuxt-link>
			<nuxt-link class="link-hover link" to="https://donate.wolfstar.rocks/kofi">
				<nuxt-icon name="ph:coffee-duotone" class="h-5 w-5 text-pink-500" />
				Ko-fi
			</nuxt-link>
		</nav>
		<nav>
			<h6 class="footer-title">Legal</h6>
			<nuxt-link class="link-hover link" to="/terms">
				<nuxt-icon name="ph:scales-fill" class="text-warning h-5 w-5" />
				Terms of Use
			</nuxt-link>
			<nuxt-link class="link-hover link" to="/privacy">
				<nuxt-icon name="ph:scales-fill" class="text-warning h-5 w-5" />
				Privacy Policy
			</nuxt-link>
		</nav>
	</footer>
</template>
