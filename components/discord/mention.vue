<template>
	<span class="tag">@<slot></slot></span>
</template>

<style scoped>
.tag {
	@apply rounded-md px-0.5;
	cursor: pointer;
	background-color: hsl(235 85.6% 64.7% / 0.3);
	color: hsl(235 86.2% 88.6% / 1);
}

.tag:hover {
	background-color: hsl(235 85.6% 64.7% / 1);
	color: hsl(0 0 100% / 1);
}
</style>
