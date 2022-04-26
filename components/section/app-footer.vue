<template>
	<footer class="footer p-10 bg-base-200 text-base-content">
		<div>
			<icons-skyra class="h-14 fill-current" />
			<p>Skyra Project.<br />Building reliable bots since 2016</p>
		</div>
		<div>
			<span class="footer-title">Company</span>
			<nuxt-link class="link link-hover" to="https://join.skyra.pw">Support server</nuxt-link>
			<nuxt-link class="link link-hover" to="donate">Donation links</nuxt-link>
			<nuxt-link class="link link-hover" to="https://github.com/skyra-project">GitHub</nuxt-link>
		</div>
		<div>
			<span class="footer-title">Legal</span>
			<nuxt-link class="link link-hover" to="terms">Terms of use</nuxt-link>
			<nuxt-link class="link link-hover" to="privacy">Privacy policy</nuxt-link>
			<!-- <a class="link link-hover">Cookie policy</a> -->
		</div>
		<div>
			<div class="btn-group text-center">
				<button v-if="theme === 'dark'" @click="theme = 'light'" class="btn"><icons-sun class="mr-1" /> Light</button>
				<button v-else @click="theme = 'dark'" class="btn"><icons-moon class="mr-1" /> Dark</button>
				<button @click="theme = 'auto'" class="btn">Auto</button>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
const theme = useColorMode({ attribute: 'data-theme' });
</script>
