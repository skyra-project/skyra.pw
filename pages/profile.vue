<template>
	<div v-if="session" class="bg-gray-900 min-h-screen text-white">
		<!-- Profile Header -->
		<div class="bg-gray-800 border-gray-600/50 border-b p-6">
			<div class="container mx-auto flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<div class="avatar">
						<div class="h-20 w-20 overflow-hidden rounded-full">
							<img
								v-if="isDefault"
								:src="defaultAvatar"
								alt="Default Avatar"
								class="h-8 w-8 rounded-full"
								decoding="async"
								crossorigin="anonymous"
							/>
							<picture v-else>
								<source
									v-if="isAnimated"
									media="(prefers-reduced-motion: no-preference), (prefers-reduced-data: no-preference)"
									type="image/gif"
									:srcset="makeSrcset('gif')"
								/>
								<source type="image/webp" :srcset="makeSrcset('webp')" />
								<source type="image/png" :srcset="makeSrcset('png')" />
								<img
									:src="createUrl('png', 128)"
									alt="Avatar"
									class="h-8 w-8 rounded-full"
									decoding="async"
									crossorigin="anonymous"
								/>
							</picture>
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
const isAnimated = ref(false);
const isDefault = ref(false);

// Fetch session on mount
onMounted(async () => {
	try {
		// Fetch pack data after successful session
		isLoadingPack.value = true;
	} catch (error) {
		console.error('Failed to fetch session:', error);
		packError.value = error instanceof Error ? error.message : 'Unknown error';
		router.push('/');
	} finally {
		isLoadingPack.value = false;
	}
});

const defaultAvatar = computed(() =>
	session.value?.id
		? `https://cdn.discordapp.com/embed/avatars/${BigInt(session.value.id) % BigInt(5)}.png`
		: 'https://cdn.discordapp.com/embed/avatars/0.png'
);

watch(
	session,
	(user) => {
		if (user?.avatar) {
			isDefault.value = false;
			isAnimated.value = user.avatar.startsWith('a_');
		} else {
			isDefault.value = true;
			isAnimated.value = false;
		}
	},
	{ immediate: true }
);

function createUrl(format: 'webp' | 'png' | 'gif', size: number) {
	return `https://cdn.discordapp.com/avatars/${session.value!.id}/${session.value!.avatar}.${format}?size=${size}`;
}

function makeSrcset(format: 'webp' | 'png' | 'gif') {
	return `${createUrl(format, 64)} 1x, ${createUrl(format, 128)} 2x, ${createUrl(format, 256)} 3x, ${createUrl(format, 512)} 4x`;
}
</script>
