<template>
	<span class="tag">
		<span v-if="kind === 'mention'">@</span>
		<icons-app v-else-if="kind === 'app'" class="icon" />
		<slot></slot>
	</span>
</template>

<script setup lang="ts">
defineProps<{ kind: 'mention' | 'app' }>();
</script>

<style scoped>
.tag {
	@apply gap-1 rounded-md px-0.5 font-normal;
	cursor: pointer;
	background-color: hsl(235 85.6% 64.7% / 0.3);
	color: hsl(235 86.2% 88.6% / 1);
}

.tag > .icon {
	@apply mr-0.5 inline-block h-3 w-3 -translate-y-0.5;
}

.tag:hover {
	background-color: hsl(235 85.6% 64.7% / 1);
	color: hsl(0 0 100% / 1);
}
</style>
