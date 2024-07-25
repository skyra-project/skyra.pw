<template>
	<button class="discord-message-button-primary">
		<slot></slot>
	</button>
</template>

<style scoped>
.discord-message-button-primary {
	@apply btn mt-1;
	color: white;
	background-color: hsl(235 85.6% 64.7% / 1);
	background-color: oklch(57.7% 0.209 273.88);
}

.discord-message-button-primary:hover {
	background-color: hsl(235 51.4% 52.4% / 1);
	background-color: oklch(49.62% 0.176 274.09);
}
</style>
