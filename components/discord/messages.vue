<template>
	<div class="discord-messages">
		<slot></slot>
	</div>
</template>

<style scoped>
.discord-messages {
	@apply flex flex-col rounded-xl bg-base-300 drop-shadow-md;
	background-color: theme('colors.base-300');
	background-color: oklch(from theme('colors.base-200') calc(l - 0.03) c h);
}
</style>
