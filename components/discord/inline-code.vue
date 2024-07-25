<template>
	<span class="discord-message-inline-code"><slot></slot></span>
</template>

<style scoped>
.discord-message-inline-code {
	@apply rounded-md border bg-base-200 px-1 font-mono;
	border-color: theme('colors.base-300');
	border-color: oklch(from theme('colors.base-300') calc(l - 0.05) c h);
}
</style>
