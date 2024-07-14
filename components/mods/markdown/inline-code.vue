<template>
	<span v-if="inline" class="inline-code -my-1 break-words bg-neutral p-1 font-mono text-sm text-neutral-content">
		<slot></slot>
	</span>
	<slot v-else></slot>
</template>

<script lang="ts" setup>
defineProps<{
	inline?: boolean;
}>();
</script>

<style scoped>
.inline-code {
	border: none;
	font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
		'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace;
	text-indent: 0;
	white-space: pre-wrap;
}
</style>
