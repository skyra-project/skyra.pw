<template>
	<div class="container mx-auto flex h-screen flex-col items-center justify-center sm:h-[calc(100vh-328px)]">
		<div v-if="isLoading" class="flex flex-wrap items-center justify-center gap-4">
			<USkeleton v-for="i in 3" :key="i" class="h-48 w-64" />
		</div>
		<div v-else class="flex flex-wrap items-center justify-center">
			<div v-if="loggedIn">
				<GuildCards />
			</div>
			<UAlert v-else title="Not Logged In" color="warning" variant="solid">
				<p class="text-center text-lg md:text-xl">Please login with Discord to view this page</p>
			</UAlert>
		</div>
	</div>
</template>

<script setup lang="ts">
const { loggedIn, session } = useAuth();
const isLoading = ref(true);

onMounted(() => {
	// Simulate loading state
	setTimeout(() => {
		isLoading.value = false;
	}, 500);
});
</script>
