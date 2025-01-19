<template>
	<div class="discord-reaction" :class="{ self }">
		<span class="mx-0.5 flex items-center"><slot /></span>
		<span class="font-bold">{{ count }}</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ count: number; self?: boolean }>();
</script>

<style scoped>
.discord-reaction {
	@apply flex w-fit cursor-pointer items-center gap-1 rounded-md border px-1;
	border-color: transparent;
	background-color: hsl(220 6.5% 18% / 1);
}

.discord-reaction:hover {
	border-color: hsl(0 0 100% / 0.2);
	background-color: hsl(223 6.7% 20.6% / 1);
}

.discord-reaction.self {
	@apply border;
	border-color: hsl(235 85.6% 64.7% / 1);
	background-color: hsl(235 85.6% 64.7% / 0.15);
}

.discord-reaction.self:hover {
	border-color: hsl(235 85.6% 64.7% / 1);
	background-color: hsl(235 85.6% 64.7% / 0.15);
}
</style>
