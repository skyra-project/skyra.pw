<template>
	<div class="discord-messages">
		<slot></slot>
	</div>
</template>

<style scoped>
@reference "../../assets/css/main.css";
.discord-messages {
	@apply flex flex-col rounded-xl bg-base-300 drop-shadow-md;
	background-color: var(--colors-base-300);
	background-color: oklch(from var(--colors-base-200) calc(l - 0.03) c h);
}
</style>
