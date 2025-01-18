<script setup lang="ts">
const { loggedIn, session } = useAuth();
</script>

<template>
	<div class="container mx-auto flex h-screen flex-col items-center justify-center sm:h-[calc(100vh-328px)]">
		<div class="flex flex-wrap items-center justify-center">
			<div v-if="loggedIn">
				<GuildCards />
			</div>
			<p v-else class="text-center text-2xl md:text-4xl">
				Sorry, you are not logged in and can therefore not view this page. Please click the "Login" button at the top right to login with
				Discord
			</p>
		</div>
	</div>
</template>
