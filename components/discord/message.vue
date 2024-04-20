<template>
	<div class="flex flex-row gap-4 align-top hover:bg-base-200 rounded-xl p-4 w-full">
		<div class="avatar">
			<div class="w-12 h-12 rounded-full">
				<nuxt-img v-if="name === 'skyra'" src="/img/avatars/skyra.png" width="48" height="48" alt="Avatar" />
				<Icon v-else-if="name === 'baddie'" name="ph:smiley-angry-fill" class="w-12 h-12 discord-message-avatar baddie" />
				<Icon v-else name="ph:shooting-star-fill" class="w-12 h-12 text-info" />
			</div>
		</div>
		<div class="flex-grow">
			<div class="flex flex-row items-center">
				<div class="font-bold">{{ profile.name }}</div>
				<span class="app-badge" v-if="profile.app">
					<Icon v-if="profile.verified" name="ph:check-fat-fill" class="w-3 h-3 mr-0.5" />
					<span class="text">APP</span>
				</span>
			</div>
			<div><slot></slot></div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: keyof typeof profiles }>();
const profile = computed(() => profiles[props.name]);

const profiles = {
	skyra: { name: 'Skyra', app: true, verified: true },
	baddie: { name: 'Baddie', app: false, verified: false },
	stella: { name: 'Stella', app: false, verified: false }
};
</script>

<style scoped>
.app-badge {
	@apply text-white rounded-md px-1 py-0 ml-1 h-4 flex items-center;
	background-color: #5865f2;
}

.app-badge > .text {
	font-size: 0.75rem;
	line-height: 0.75rem;
}

.discord-message-avatar.baddie {
	filter: drop-shadow(0 0 0.2rem oklch(var(--er) / 0.4));
}

.discord-message-avatar.baddie :deep(path) {
	@apply fill-error;
}
</style>
