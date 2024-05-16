<template>
	<div class="flex w-full flex-row gap-2 rounded-xl p-2 align-top hover:bg-base-200 sm:gap-4 sm:p-4">
		<div class="discord-message-avatar-wrapper">
			<nuxt-img v-if="name === 'wolfstar'" src="/img/avatars/wolfstar.png" width="48" height="48" alt="Avatar" />
			<Icon v-else-if="name === 'baddie'" name="ph:smiley-angry-fill" class="discord-message-avatar baddie h-full w-full" />
			<Icon v-else name="ph:shooting-star-fill" class="h-full w-full text-info" />
		</div>
		<div class="flex-grow gap-2 max-sm:text-xs">
			<div class="mb-0.5 flex flex-row items-center">
				<div class="font-bold">{{ profile.name }}</div>
				<span class="app-badge" v-if="profile.app">
					<Icon v-if="profile.verified" name="ph:check-fat-fill" class="mr-0.5 h-2 w-2 sm:h-3 sm:w-3" />
					<span>APP</span>
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
	wolfstar: { name: 'WolfStar', app: true, verified: true },
	baddie: { name: 'Baddie', app: false, verified: false },
	stella: { name: 'Stella', app: false, verified: false }
};
</script>

<style scoped>
.app-badge {
	@apply ml-1 flex flex-row items-center rounded-md px-1 py-0.5 text-white md:py-1;
	background-color: #5865f2;
	font-size: 0.625rem;
	line-height: 0.625rem;
}

@screen md {
	.app-badge {
		font-size: 0.75rem;
		line-height: 0.75rem;
	}
}

.discord-message-avatar-wrapper {
	@apply h-8 w-8 flex-none overflow-hidden rounded-full md:h-12 md:w-12;
}

.discord-message-avatar.baddie {
	filter: drop-shadow(0 0 0.2rem oklch(var(--er) / 0.4));
}

.discord-message-avatar.baddie :deep(path) {
	@apply fill-error;
}
</style>
