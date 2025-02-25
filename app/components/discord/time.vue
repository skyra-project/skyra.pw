<template>
	<span class="discord-message-time">{{ formatter.format(date) }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ date?: number; format: keyof typeof TimeFormatters }>(), { date: () => Date.now() });
const formatter = computed(() => TimeFormatters[props.format]);

const TimeFormatters = {
	long: new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' })
};
</script>

<style scoped>
@reference "../../assets/css/main.css";
.discord-message-time {
	@apply rounded-md bg-base-content/10 px-0.5;
}
</style>
