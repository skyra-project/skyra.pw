<template>
	<footer class="footer p-10 mt-24 bg-base-200 text-base-content">
		<aside>
			<IconsSkyra class="w-12 h-12" />
			<p>Skyra Project<br />Providing reliable open-source software since 2017</p>
			<p>© 2024 All rights reserved.</p>
		</aside>
		<nav>
			<h6 class="footer-title">Links</h6>
			<nuxt-link class="link link-hover" to="https://join.skyra.pw">
				<Icon name="ph:discord-logo-duotone" class="w-5 h-5 text-indigo-500" />
				Support Server
			</nuxt-link>
			<nuxt-link class="link link-hover" to="https://github.com/skyra-project">
				<Icon name="ph:github-logo-duotone" class="w-5 h-5 text-indigo-500" />
				GitHub</nuxt-link
			>
			<nuxt-link class="link link-hover" to="https://blog.skyra.pw">
				<Icon name="ph:newspaper-clipping-duotone" class="w-5 h-5 text-primary" />
				Blog
			</nuxt-link>
			<nuxt-link class="link link-hover" to="https://hastebin.skyra.pw">
				<Icon name="ph:code-block-duotone" class="w-5 h-5 text-green-600" />
				Hastebin
			</nuxt-link>
		</nav>
		<nav>
			<h6 class="footer-title">Donate</h6>
			<nuxt-link class="link link-hover" to="https://donate.skyra.pw/patreon">
				<Icon name="ph:patreon-logo-duotone" class="w-5 h-5 text-rose-600" />
				Patreon
			</nuxt-link>
			<nuxt-link class="link link-hover" to="https://donate.skyra.pw/paypal">
				<Icon name="ph:paypal-logo-duotone" class="w-5 h-5 text-sky-600" />
				PayPal
			</nuxt-link>
			<nuxt-link class="link link-hover" to="https://donate.skyra.pw/kofi">
				<Icon name="ph:coffee-duotone" class="w-5 h-5 text-pink-500" />
				Ko-fi
			</nuxt-link>
		</nav>
		<nav>
			<h6 class="footer-title">Legal</h6>
			<nuxt-link class="link link-hover" to="/terms">
				<Icon name="ph:scales-fill" class="w-5 h-5 text-warning" />
				Terms of Use
			</nuxt-link>
			<nuxt-link class="link link-hover" to="/privacy">
				<Icon name="ph:scales-fill" class="w-5 h-5 text-warning" />
				Privacy Policy
			</nuxt-link>
		</nav>
	</footer>
</template>
