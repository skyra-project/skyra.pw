<template>
	<div class="discord-reaction" :class="{self}">
		<span class="mx-0.5 flex items-center"><slot></slot></span>
		<span class="font-bold">{{ count }}</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ count: number; self?: boolean }>();
</script>

<style scoped>
.discord-reaction {
	@apply flex items-center border gap-1 w-fit px-1 rounded-md cursor-pointer;
	background-color: hsl(220 6.5% 18% / 1);
	border-color: transparent;
}

.discord-reaction:hover {
	background-color: hsl( 223 6.7% 20.6% / 1);
	border-color: hsl(0 0 100% / 0.2);
}

.discord-reaction.self {
	@apply border;
	background-color: hsl(235 85.6% 64.7% / 0.15);
	border-color: hsl(235 85.6% 64.7% / 1);
}

.discord-reaction.self:hover {
	background-color: hsl(235 85.6% 64.7% / 0.15);
	border-color: hsl(235 85.6% 64.7% / 1);
}
</style>
