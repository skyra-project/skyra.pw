<script setup lang="ts">
// Reindirizza se l'utente non è autenticato
if (!useAuth().loggedIn.value) {
	navigateTo('/');
}

// Importazione asincrona dei componenti
const GuildSettings = defineAsyncComponent(() => import('~/components/presentational/guild-settings.vue'));
</script>

<template>
	<div>
		<ClientOnly>
			<GuildSettings />
		</ClientOnly>
	</div>
</template>
