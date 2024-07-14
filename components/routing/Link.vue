<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface LinkProps {
	href: string | { pathname: string };
	forceSameTab?: boolean;
	text?: string;
	activeClassName?: string;
	className?: string;
	as?: string;
	noLinkStyle?: boolean;
	prefetch?: boolean;
	replace?: boolean;
	scroll?: boolean;
	shallow?: boolean;
}

const props = withDefaults(defineProps<LinkProps>(), {
	activeClassName: 'active',
	forceSameTab: false
});

const router = useRouter();

const isActive = computed(() => {
	const pathname = typeof props.href === 'string' ? props.href : props.href.pathname;
	return router.currentRoute.value.path === pathname;
});

const className = computed(() => {
	return ['link', props.className, { [props.activeClassName]: isActive.value && props.activeClassName }];
});

const isInternalLink = computed(() => {
	const pathname = typeof props.href === 'string' ? props.href : props.href.pathname;
	return props.forceSameTab || pathname?.startsWith('/');
});

const linkProps = computed(() => {
	if (isInternalLink.value) {
		return {
			to: props.href,
			replace: props.replace,
			prefetch: props.prefetch,
			activeClass: props.activeClassName
		};
	} else {
		return {
			href: typeof props.href === 'string' ? props.href : props.href.pathname,
			target: '_blank',
			rel: 'noopener noreferrer'
		};
	}
});
</script>

<template>
	<component :is="isInternalLink ? 'NuxtLink' : 'a'" :class="className" v-bind="linkProps">
		<slot>{{ text }}</slot>
	</component>
</template>

<style scoped>
.link {
	cursor: pointer;
	color: --pri; /* theme.primary.main */
}
.link:hover {
	color: #1565c0; /* theme.primary.dark */
}
.link:visited {
	color: #155fa0; /* theme.primary.main with dark augment */
}
</style>
