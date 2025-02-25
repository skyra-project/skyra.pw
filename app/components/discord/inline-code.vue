<template>
	<span class="discord-message-inline-code"><slot></slot></span>
</template>

<style scoped>
@reference "../../assets/css/main.css";
.discord-message-inline-code {
	@apply rounded-md border bg-base-200 px-1 font-mono;
	border-color: var(--colors-base-300');
	border-color: oklch(from var(--colors-base-300) calc(l - 0.05) c h);
}
</style>
