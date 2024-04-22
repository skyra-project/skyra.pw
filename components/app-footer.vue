<template>
	<footer class="footer mt-24 bg-base-200 p-10 text-base-content">
		<aside>
			<IconsSkyra class="h-12 w-12" />
			<p>Skyra Project<br />Providing reliable open-source software since 2017</p>
			<p>© 2024 All rights reserved.</p>
		</aside>
		<nav>
			<h6 class="footer-title">Links</h6>
			<nuxt-link class="link-hover link" to="https://join.skyra.pw">
				<Icon name="ph:discord-logo-duotone" class="h-5 w-5 text-indigo-500" />
				Support Server
			</nuxt-link>
			<nuxt-link class="link-hover link" to="https://github.com/skyra-project">
				<Icon name="ph:github-logo-duotone" class="h-5 w-5 text-indigo-500" />
				GitHub</nuxt-link
			>
			<nuxt-link class="link-hover link" to="https://blog.skyra.pw">
				<Icon name="ph:newspaper-clipping-duotone" class="h-5 w-5 text-primary" />
				Blog
			</nuxt-link>
			<nuxt-link class="link-hover link" to="https://hastebin.skyra.pw">
				<Icon name="ph:code-block-duotone" class="h-5 w-5 text-green-600" />
				Hastebin
			</nuxt-link>
		</nav>
		<nav>
			<h6 class="footer-title">Donate</h6>
			<nuxt-link class="link-hover link" to="https://donate.skyra.pw/patreon">
				<Icon name="ph:patreon-logo-duotone" class="h-5 w-5 text-rose-600" />
				Patreon
			</nuxt-link>
			<nuxt-link class="link-hover link" to="https://donate.skyra.pw/paypal">
				<Icon name="ph:paypal-logo-duotone" class="h-5 w-5 text-sky-600" />
				PayPal
			</nuxt-link>
			<nuxt-link class="link-hover link" to="https://donate.skyra.pw/kofi">
				<Icon name="ph:coffee-duotone" class="h-5 w-5 text-pink-500" />
				Ko-fi
			</nuxt-link>
		</nav>
		<nav>
			<h6 class="footer-title">Legal</h6>
			<nuxt-link class="link-hover link" to="/terms">
				<Icon name="ph:scales-fill" class="h-5 w-5 text-warning" />
				Terms of Use
			</nuxt-link>
			<nuxt-link class="link-hover link" to="/privacy">
				<Icon name="ph:scales-fill" class="h-5 w-5 text-warning" />
				Privacy Policy
			</nuxt-link>
		</nav>
	</footer>
</template>
