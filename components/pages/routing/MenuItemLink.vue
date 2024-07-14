<script setup lang="ts">
import { defineProps, defineComponent } from 'vue';
import Link from './Link.vue'; // Assicurati che il percorso sia corretto

interface MenuItemLinkProps {
	icon: object;
	text: string;
	href: string;
	forceSameTab?: boolean;
}

const props = withDefaults(defineProps<MenuItemLinkProps>(), {
	forceSameTab: false
});

// Utilizziamo defineComponent per il componente icona per assicurarci che sia trattato come un componente Vue
const IconComponent = defineComponent({
	render: () => props.icon
});
</script>

<template>
	<Link :href="href" :force-same-tab="forceSameTab" class="menu-link">
		<div class="menu-item">
			<div class="list-item-icon">
				<IconComponent />
			</div>
			<div class="menu-item-text">{{ text }}</div>
		</div>
	</Link>
</template>

<style scoped>
.menu-link {
	color: inherit;
	text-decoration: none;
}

.menu-link:hover,
.menu-link:visited {
	color: inherit;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 8px 16px;
}

.list-item-icon {
	margin-right: 16px;
}

.menu-item-text {
	font-size: inherit;
}
</style>
