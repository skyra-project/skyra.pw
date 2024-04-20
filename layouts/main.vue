<template>
	<div class="layout">
		<app-navbar></app-navbar>
		<div class="mt-4 flex-auto justify-between sm:mt-8 w-full">
			<main class="mx-4 sm:mx-auto sm:w-5/6 lg:max-w-5xl xl:max-w-7xl flex flex-col items-center">
				<slot></slot>
			</main>
		</div>
		<app-footer></app-footer>
	</div>
</template>

<style lang="css">
.layout {
	@apply flex h-screen flex-col items-center;
	background-image: linear-gradient(to top in oklch, oklch(var(--b1) / 1) 0%, transparent 70%),
		radial-gradient(ellipse at 50% 0% in oklch, oklch(var(--p) / 0.2), transparent 80%);
}
</style>
