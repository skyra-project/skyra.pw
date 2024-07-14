<template>
	<!-- Unordered list component -->
	<ul class="unordered-list">
		<slot></slot>
	</ul>
</template>

<style scoped>
.unordered-list {
	/* Set the left padding to 16px */
	padding-left: 16px; /* Equivalent to theme.spacing(2) */
	/* Set the list style type to disc */
	list-style-type: disc;
}

.unordered-list :deep(li) {
	/* Display list items as list items */
	display: list-item;
	/* Set the left padding to 4px */
	padding-left: 4px; /* Equivalent to theme.spacing(0.5) */
}

.unordered-list :deep(li::marker) {
	/* Set the font size to 12px */
	font-size: 12px; /* Equivalent to theme.spacing(1.5) */
	/* Set the line height to 75px */
	line-height: 75px; /* Equivalent to theme.spacing(9.375) */
}
</style>
