<template>
	<Transition name="fade">
		<button
			v-if="showButton"
			class="'btn btn-circle btn-primary"
			:class="isMobile ? 'btn-md fixed' : 'btn-sm'"
			aria-label="Scroll back to top"
			@click="scrollToTop"
		>
			<NuxtIcon name="mdi:arrow-up" :class="{ 'h-4 w-4': !isMobile, 'h-6 w-6': isMobile }" />
		</button>
	</Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const device = useDevice();
const isMobile = computed(() => device.isMobile);

const buttonClass = computed(() => ({
	'btn btn-circle btn-primary': true,
	'btn-sm': !isMobile.value,
	'btn-md fixed': isMobile.value
}));

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
