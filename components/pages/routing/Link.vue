<template>
	<Link v-if="forceSameTab || href.startsWith('/')" :to="href" :class="computedClass" v-bind="otherProps" @click="handleClick">
		<span v-if="text">{{ text }}</span>
		<template v-else>
			<slot />
		</template>
	</Link>
	<a v-else :href="href" target="_blank" rel="noopener noreferrer" :class="computedClass" v-bind="otherProps" @click="handleClick">
		<span v-if="text">{{ text }}</span>
		<template v-else>
			<slot />
		</template>
	</a>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface LinkProps {
	href: string;
	forceSameTab?: boolean;
	text?: string;
	TextTypographyProps?: Record<string, any>;
	activeClassName?: string;
	className?: string;
	style?: Record<string, any>;
	onClick?: (...args: unknown[]) => void;
	[key: string]: any;
}

const props = defineProps<LinkProps>();

const computedClass = computed(() => {
	let classes = 'daisy-ui-link ' + (props.className || '');
	if (window.location.pathname === props.href && props.activeClassName) {
		classes += ' ' + props.activeClassName;
	}
	return classes.trim();
});

const otherProps = computed(() => {
	const { href, forceSameTab, text, TextTypographyProps, activeClassName, className, style, onClick, ...rest } = props;
	return rest;
});

const handleClick = (event: MouseEvent) => {
	if (props.onClick) {
		props.onClick(event);
	}
};
</script>

<style scoped>
.daisy-ui-link {
	@apply text-blue-500 underline hover:text-blue-700;
}
</style>
