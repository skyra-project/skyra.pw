<template>
	<section class="prose text-center">
		<h2 class="mt-32 text-5xl font-bold">Other Apps</h2>
		<p>You want a feature that Skyra doesn't have? We got you covered!</p>
	</section>

	<div class="mt-8 grid w-full gap-4 xl:grid-cols-2">
		<div v-for="app of apps" class="other-apps-layout rounded-xl bg-base-200 shadow-xl">
			<nuxt-img :src="app.avatar" width="256" height="256" :alt="`${app.name}'s avatar`" loading="lazy" class="other-apps-avatar" />
			<h2 class="other-apps-title">
				{{ app.name }}
				<div v-for="purpose of app.purposes" class="badge badge-neutral">{{ purpose }}</div>
			</h2>
			<div class="other-apps-description">
				<p class="flex-grow">{{ app.description }}</p>
				<div class="join mt-4 flex justify-end">
					<nuxt-link class="btn join-item btn-neutral" :to="app.explore">
						<Icon name="ph:magnifying-glass-fill" class="h-5 w-5" /> Explore
					</nuxt-link>
					<nuxt-link class="btn join-item btn-neutral" :to="app.invite">
						<Icon name="ph:plus-circle-fill" class="h-5 w-5" /> Add App
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ apps: readonly OtherApp[] }>();
</script>

<style scoped>
.other-apps-layout {
	@apply grid gap-4 p-4;
	grid-template-rows: 230px min-content 1fr;
	grid-template-columns: 1fr;
	grid-template-areas:
		'a'
		'b'
		'c';
}

.other-apps-avatar {
	@apply h-full w-full object-cover object-[0_20%] max-md:rounded-xl md:rounded-l-xl;
	grid-area: a;
}

.other-apps-title {
	@apply text-3xl font-semibold md:mr-4 md:mt-4 md:text-xl;
	grid-area: b;
}

.other-apps-description {
	@apply flex flex-col md:mb-4 md:mr-4;
	grid-area: c;
}

@screen md {
	.other-apps-layout {
		@apply p-0;
		grid-template-rows: min-content 1fr;
		grid-template-columns: 256px 1fr;
		grid-template-areas:
			'a b'
			'a c';
	}
}
</style>
