<template>
	<div class="flex flex-col h-screen justify-between">
		<section-app-navbar v-if="$route.meta.nav !== false" />
		<main :class="$route.meta.fit ? 'lg:px-[calc(100%/12)] xl:px-[calc(100%/10)] 2xl:px-[calc(100%/6)] mb-auto' : 'mb-auto'">
			<slot></slot>
		</main>
		<section-app-footer />
	</div>
</template>
