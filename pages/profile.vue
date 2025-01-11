<template>
	<div v-if="session" class="bg-gray-900 min-h-screen text-white">
		<!-- Profile Header -->
		<div class="bg-gray-800 border-gray-600/50 border-b p-6">
			<div class="container mx-auto flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<div class="avatar">
						<div class="h-20 w-20 overflow-hidden rounded-full">
							<source
								v-if="isAnimated"
								media="(prefers-reduced-motion: no-preference), (prefers-reduced-data: no-preference)"
								type="image/gif"
								:srcset="makeSrcset('gif')"
							/>
							<source type="image/webp" :srcset="makeSrcset('webp')" />
							<source type="image/png" :srcset="makeSrcset('png')" />
							<img
								:src="displayAvatarURL(session, { format: 'png', size: 128 })"
								:alt="session?.global_name ?? session?.username"
								class="h-full w-full object-cover"
								decoding="async"
								crossorigin="anonymous"
							/>
						</div>
					</div>
					<div>
						<h1 class="flex items-center text-3xl font-bold">
							{{ session?.global_name ?? session?.username }}
						</h1>
						<p class="text-lg text-red-400">@{{ session?.username }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Servers Section -->
		<div class="container mx-auto p-6">
			<div v-if="isLoadingPack">
				<PresentationalLoading :loading="true" />
			</div>
			<div v-else-if="packError">
				<p class="text-red-500">Failed to load servers: {{ packError }}</p>
			</div>
			<!-
	  <PresentationalGuildCards v-else :pack="pack" />
			-->
		</div>
	</div>
	...existing code...
</template>

<script setup lang="ts">
import { useClientTrpc } from '~/composables/public';
import type { APIUser } from 'discord-api-types/v10';

const client = useClientTrpc();
const router = useRouter();

const session = ref<APIUser | null>(null);
const pack = ref([]);
const isLoadingPack = ref(false);
const packError = ref<string | null>(null);
const isAnimated = ref(false);
const isDefault = ref(true);

// Fetch session on mount
onMounted(async () => {
	try {
		const response = await client.auth.session.query();
		if (!response) {
			router.push('/');
			return;
		}
		session.value = response;

		// Fetch pack data after successful session
		isLoadingPack.value = true;
		pack.value = []; //await client.guilds.getPack.query()
	} catch (error) {
		console.error('Failed to fetch session:', error);
		packError.value = error instanceof Error ? error.message : 'Unknown error';
		router.push('/');
	} finally {
		isLoadingPack.value = false;
	}
});

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

function makeSrcset(format: 'webp' | 'png' | 'gif') {
	if (!session.value) return '';
	return `${displayAvatarURL(session.value, { format, size: 64 })} 1x, ${displayAvatarURL(session.value, { format, size: 128 })} 2x, ${displayAvatarURL(session.value, { format, size: 256 })} 3x, ${displayAvatarURL(session.value, { format, size: 512 })} 4x`;
}
</script>
