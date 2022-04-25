<template>
	<div class="min-h-full">
		<section-navbar-content />
		<main class="lg:px-[calc(100%/12)] xl:px-[calc(100%/10)] 2xl:px-[calc(100%/6)]">
			<slot></slot>
		</main>
		<section-footer-content />
	</div>
</template>
