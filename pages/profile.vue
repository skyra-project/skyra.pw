<template>
	<div class="bg-gray-900 min-h-screen text-white">
		<!-- Profile Header -->
		<div class="bg-gray-800 flex items-center justify-between p-4">
			<div class="flex items-center">
				<div class="avatar">
					<div class="h-16 w-16 rounded-full">
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
							class="h-16 w-16 rounded-full"
							decoding="async"
							crossorigin="anonymous"
						/>
					</div>
				</div>
				<div class="ml-4">
					<h1 class="text-2xl font-bold">{{ session?.name }}</h1>
					<p class="text-pink-400">@{{ session?.username }}</p>
				</div>
			</div>

			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-circle btn-ghost" @click="toggleDropdown">
					<i class="fas fa-ellipsis-v"></i>
				</label>
				<ul v-if="isDropdownOpen" tabindex="0" class="menu-compact menu dropdown-content mt-3 w-64 rounded-box bg-base-100 p-2 shadow">
					<li>
						<a @click="authLogout()" class="justify-between">
							Logout
							<span class="badge badge-sm">New</span>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Navigation Bar -->
		<nav class="bg-gray-700 flex justify-around p-2">
			<a href="#" class="px-4 py-2 text-yellow-400">📁 Servers</a>
			<a href="#" class="px-4 py-2">👑 Premium</a>
			<a href="#" class="px-4 py-2">⚙️ Settings</a>
		</nav>

		<!-- Servers Section -->
		<div class="p-6">
			<h2 class="mb-4 text-2xl font-bold">Servers</h2>
			<p class="text-gray-400 mb-6">Servers you're in ({{ filteredGuilds.length }} servers)</p>

			<!-- Server Grid -->
			<FilteredGuildCards :pack="userPack" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import FilteredGuildCards from '~/components/FilteredGuildCards.vue';
import type { TransformedLoginData } from '~/config/types/ApiData';
import { displayAvatarURL } from '~/utils/util';
import { useAuth } from '~/composables/useAuth';

const { session, logout } = useAuth();

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

function authLogout() {
	logout();
	isDropdownOpen.value = false;
}
</script>
