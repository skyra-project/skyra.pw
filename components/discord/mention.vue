<template>
	<span class="tag">@<slot></slot></span>
</template>

<style scoped>
.tag {
	@apply rounded-md px-0.5;
	cursor: pointer;
	color: hsl(235 86.2% 88.6% / 1);
	background-color: hsl(235 85.6% 64.7% / 0.3);
}

.tag:hover {
	color: hsl(0 0 100% / 1);
	background-color: hsl(235 85.6% 64.7% / 1);
}
</style>
