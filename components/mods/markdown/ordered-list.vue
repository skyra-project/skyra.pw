<template>
	<ol class="md:pr-75 list-inside list-decimal pr-0">
		<slot></slot>
	</ol>
</template>

<script lang="ts" setup>
// Non sono necessarie props o logica aggiuntiva per questo componente
</script>

<style scoped>
@media (min-width: 768px) {
	.md\:pr-75 {
		padding-right: 4.6875rem; /* 75px */
	}
}
</style>
