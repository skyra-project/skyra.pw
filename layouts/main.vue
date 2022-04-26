<template>
	<div class="flex flex-col h-screen justify-between">
		<section-app-navbar v-if="$route.meta.nav !== false" />
		<main class="flex-auto grid">
			<slot></slot>
		</main>
		<section-app-footer />
	</div>
</template>
