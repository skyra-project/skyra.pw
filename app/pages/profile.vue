<template>
	<div v-if="session" class="min-h-screen bg-gray-900 text-white">
		<!-- Profile Header -->
		<div class="border-b border-gray-600/50 bg-gray-800 p-6">
			<div class="container mx-auto flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<div class="avatar">
						<div class="h-20 w-20">
							<UAvatar :src="avatarUrl" :alt="`${session.name}'s avatar`" size="xl" />
						</div>
						<div>
							<h1 class="flex items-center text-3xl font-bold">
								{{ session.name }}
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { session } = useAuth();
const router = useRouter();

const isLoadingPack = ref(false);
const packError = ref<string | null>(null);

const avatarUrl = computed(() => {
	if (!session.value?.avatar) {
		return `https://cdn.discordapp.com/embed/avatars/${BigInt(session.value?.id || 0) % BigInt(5)}.png`;
	}
	const format = session.value.avatar.startsWith('a_') ? 'gif' : 'png';
	return `https://cdn.discordapp.com/avatars/${session.value.id}/${session.value.avatar}.${format}?size=256`;
});

// Fetch session on mount
onMounted(async () => {
	try {
		isLoadingPack.value = true;
	} catch (error) {
		consola.error('Failed to fetch session:', error);
		packError.value = error instanceof Error ? error.message : 'Unknown error';
		router.push('/');
	} finally {
		isLoadingPack.value = false;
	}
});

definePageMeta({ auth: true });
</script>
