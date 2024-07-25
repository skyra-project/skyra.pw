<template>
	<div v-if="loggedIn" class="bg-gray-900 min-h-screen text-white">
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
								:src="displayAvatarURL(session as any, { format: 'png', size: 128 })"
								:alt="session?.name"
								class="h-full w-full object-cover"
								decoding="async"
								crossorigin="anonymous"
							/>
						</div>
					</div>
					<div>
						<h1 class="flex items-center text-3xl font-bold">
							{{ session?.name }}
						</h1>
						<p class="text-lg text-red-400">@{{ session?.username }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Servers Section -->
		<div class="container mx-auto p-6">
			<PresentationalGuildCards :pack="pack" />
		</div>
	</div>
	<div v-else class="bg-gray-900 min-h-screen">
		<p class="text-center text-2xl md:text-4xl">
			Sorry, you are not logged in and can therefore not view this page. Please click the "Login" button at the top right to login with Discord
		</p>
	</div>
</template>

<script setup lang="ts">
if (!useAuth().loggedIn.value) {
	navigateTo('/');
}

const { session, loggedIn } = useAuth();
const { pack } = useDiscordPackStore();

const isDefault = ref(true);
const isAnimated = ref(false);

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
	return `${displayAvatarURL(session.value as any, { format, size: 64 })} 1x, ${displayAvatarURL(session.value as any, { format, size: 128 })} 2x, ${displayAvatarURL(session.value as any, { format, size: 256 })} 3x, ${displayAvatarURL(session.value as any, { format, size: 512 })} 4x`;
}
</script>
