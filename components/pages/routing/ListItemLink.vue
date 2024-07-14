<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Link from './Link.vue'; // Assicurati che il percorso sia corretto

interface ListItemLinkProps {
	href: string;
	itemText: string;
	listItemDisabled: boolean;
	listItemDense?: boolean;
	listItemSx?: object;
	icon?: object;
	listItemOnClick: () => void;
}

const props = withDefaults(defineProps<ListItemLinkProps>(), {
	listItemDense: false,
	listItemDisabled: false
});

const router = useRouter();

const isActive = computed(() => props.href === router.currentRoute.value.path);

const listItemStyle = computed(() => ({
	color: 'inherit',
	'&:hover': {
		color: 'inherit'
	},
	'&:visited': {
		color: 'inherit'
	},
	...(isActive.value && {
		backgroundColor: 'rgba(150, 150, 150, 0.3)'
	}),
	...props.listItemSx
}));
</script>

<template>
	<Link :href="href" class="menu-item">
		<div
			class="list-item"
			:class="{
				'list-item--dense': listItemDense,
				'list-item--disabled': listItemDisabled
			}"
			@click="listItemOnClick"
			:style="listItemStyle"
		>
			<div v-if="icon" class="list-item-icon">
				<component :is="icon" />
			</div>
			<div class="list-item-text">{{ itemText }}</div>
		</div>
	</Link>
</template>

<style scoped>
.menu-item {
	color: inherit;
	text-decoration: none;
}

.list-item {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 8px 16px;
}

.list-item--dense {
	padding: 4px 8px;
}

.list-item--disabled {
	opacity: 0.5;
	pointer-events: none;
}

.list-item-icon {
	margin-right: 16px;
}

.list-item-text {
	flex: 1;
}
</style>
