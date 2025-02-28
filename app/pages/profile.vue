<template>
	<div v-if="session" class="container mx-auto max-w-7xl px-4">
		<!-- Profile Header -->

		<div else class="border-base-300 border-b py-8">
			<!-- Avatar and Name Section -->
			<div class="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
				<div class="avatar">
					<div class="ring-primary ring-offset-base-100 h-24 w-24 overflow-hidden rounded-full ring ring-offset-2">
						<img
							v-if="isDefault"
							:src="defaultAvatar"
							alt="Default Avatar"
							class="h-full w-full object-cover"
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
								class="h-full w-full object-cover"
								decoding="async"
								crossorigin="anonymous"
							/>
						</picture>
					</div>
				</div>
				<div class="text-center sm:text-left">
					<h1 class="text-4xl font-bold">
						{{ session.name }}
					</h1>
				</div>
			</div>
		</div>
		<div v-if="packError" class="alert alert-error py-8">
			<div class="flex-1">
				<p>{{ packError }}</p>
			</div>
		</div>
		<!-- Guilds Section -->
		<div v-if="!packError" class="py-8">
			<h2 class="mb-6 text-2xl font-semibold">Your Servers</h2>

			<div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<div v-for="i in 3" :key="i" class="skeleton bg-base-300 h-48 rounded-lg"></div>
			</div>

			<div v-else class="card card-bordered">
				<div class="card-body items-center text-center">
					<p class="text-base-content/60">No servers found</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TransformedLoginData } from '~~/shared/types';

const { session } = useAuth();

definePageMeta({ alias: ['/profile'] });

const isLoading = useState(() => false);
const packError = ref<string | null>(null);
const isAnimated = ref(false);
const isDefault = ref(false);

const guilds = useState<TransformedLoginData['transformedGuilds'] | null>(() => null);

// Fetch session on mount
onMounted(async () => {
	try {
		guilds.value = (await useClientTrpc().users.me.query()).transformedGuilds;

		isLoading.value = true;
	} catch (error) {
		console.error('Failed to fetch session:', error);
		packError.value = error instanceof Error ? error.message : 'Unknown error';
	} finally {
		isLoading.value = false;
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

definePageMeta({ auth: true });
</script>
