<template>
	<div>
		<button @click="openDialog" class="btn btn-primary" :tooltip="tooltipTitle">
			{{ label }}: {{ name }}
			<img v-if="imageInName" :src="imageInName" alt="Emoji" class="ml-2 inline-flex h-8 w-8" />
		</button>

		<transition name="fade">
			<div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
				<div class="w-full max-w-xs rounded-lg bg-white shadow-lg">
					<div class="flex items-center justify-between border-b p-4">
						<h3 class="text-xl">{{ label }}</h3>
						<button @click="closeDialog" class="btn btn-circle btn-ghost btn-sm">✕</button>
					</div>
					<div v-if="values.length > 10" class="p-4">
						<input
							v-model="search"
							@input="search = ($event.target as HTMLInputElement).value"
							type="text"
							placeholder="Search"
							class="input input-bordered mb-4 w-full"
						/>
					</div>
					<div class="h-64 overflow-y-auto p-4">
						<ul>
							<li
								v-for="item in filteredValues"
								:key="item.value"
								@click="selectItem(item.value)"
								class="hover:bg-gray-100 cursor-pointer p-2"
							>
								<span>{{ item.name }}</span>
								<img v-if="item.iconUrl" :src="item.iconUrl" alt="icon" class="ml-2 h-8 w-8" />
							</li>
						</ul>
					</div>
					<div class="flex justify-end border-t p-4">
						<button @click="resetSelection" class="btn btn-error btn-sm">Remove setting</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { sleep } from '~/utils/util';
import { Time } from '~/utils/wolfstarUtils';

interface SelectOneProps {
	label: string;
	values: { name: string; value: string; iconUrl?: string }[];
	name: string;
	imageInName?: string;
	tooltipTitle?: string;
	ButtonProps?: Record<string, any>;
	onChange?: (value: string | string) => void;
	onReset?: () => void;
}

const props = defineProps<SelectOneProps>();

const open = ref(false);
const search = ref('');

const openDialog = () => {
	open.value = true;
};

const closeDialog = async () => {
	open.value = false;
	await sleep(Time.Second);
	search.value = '';
};

const selectItem = (value: string) => {
	if (props.onChange) {
		props.onChange(value);
	}
	closeDialog();
};

const resetSelection = () => {
	if (props.onReset) {
		props.onReset();
	}
	closeDialog();
};

const filteredValues = computed(() => {
	if (!search.value) return props.values;
	return props.values.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()));
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
