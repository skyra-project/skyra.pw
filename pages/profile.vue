<template>
	<div class="bg-gray-900 min-h-screen text-white">
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

		<!-- Navigation Bar -->
		<!-- 	  <nav class="bg-gray-800 border-b border-gray-600/50">
		<div class="container mx-auto flex justify-start p-2 space-x-4">
		  <a href="#" class="px-4 py-2 text-yellow-400 hover:bg-gray-700 rounded transition duration-150">📁 Servers</a>
		  <a href="#" class="px-4 py-2 hover:bg-gray-700 rounded transition duration-150">👑 Premium</a>
		  <a href="#" class="px-4 py-2 hover:bg-gray-700 rounded transition duration-150">⚙️ Settings</a>
		</div>
	  </nav> -->

		<!-- Servers PresentationalLayoutsSettingsSection -->
		<div class="container mx-auto p-6">
			<h2 class="mb-4 text-4xl font-bold">Servers</h2>
			<p class="text-gray-400 mb-6">Servers you're in ({{ pack.guilds?.length ?? 0 }} servers)</p>

			<!-- Server Grid -->
			<!-- <PresentationalGuildCards :pack=pack /> -->
		</div>
	</div>
</template>

<script setup lang="ts">
const { session } = useAuth();

const { pack } = useDiscordPack();

const isDropdownOpen = ref(false);
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

function toggleDropdown() {
	isDropdownOpen.value = !isDropdownOpen.value;
}

function handleLogout() {
	authLogout();
	isDropdownOpen.value = false;
}
</script>
