<template>
	<div class="fixed right-3 bottom-36 z-50 sm:bottom-20">
		<SpotlightButton
			aria-label="scroll to top button"
			class="text-muted flex size-10 items-center justify-center p-1 transition-all duration-200"
			rounded
			:class="{ 'opacity-100': isScrolling, 'opacity-0': !isScrolling }"
			@click="scrollToTop"
		>
			<nuxt-icon name="heroicons-arrow-up" class="z-20 size-6" />
		</SpotlightButton>
	</div>
</template>

<script setup lang="ts">
const isScrolling = ref(false);

onMounted(() => {
	window.addEventListener('scroll', () => {
		isScrolling.value = window.scrollY > 0;
	});
});

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}
</script>
