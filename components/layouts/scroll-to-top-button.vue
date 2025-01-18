<template>
	<Transition name="fade">
		<button v-if="showButton" class="btn btn-circle btn-primary btn-sm" @click="scrollToTop" aria-label="Scroll back to top">
			<Icon name="mdi:arrow-up" />
		</button>
	</Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
	showButton.value = window.scrollY > 100;
};

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
};

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>
