<template>
	<div>
		<button @click="openDialog" class="btn btn-primary" v-tooltip="tooltipTitle">
			{{ label }}: {{ displayValue }}
			<img v-if="imageInName" :src="imageInName" alt="Emoji" class="ml-2 inline-flex h-8 w-8" />
		</button>
		<transition name="fade">
			<div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
				<div class="w-full max-w-xs rounded-lg bg-white shadow-lg">
					<div class="flex items-center justify-between border-b p-4">
						<h3 class="text-xl">{{ label }}</h3>
						<button @click="closeDialog" class="btn btn-circle btn-ghost btn-sm">✕</button>
					</div>
					<div class="p-4">
						<input v-if="values.length > 10" v-model="search" type="text" placeholder="Search" class="input input-bordered mb-4 w-full" />
						<div class="h-64 overflow-y-auto">
							<ul>
								<li v-for="item in filteredValues" :key="item.value" @click="toggleCheck(item.value)" class="cursor-pointer">
									<div class="flex items-center justify-between p-2">
										<input type="checkbox" v-model="checkedValues" :value="item.value" class="checkbox-primary checkbox" />
										<span>{{ item.name }}</span>
										<img v-if="item.iconUrl" :src="item.iconUrl" alt="icon" class="ml-2 h-8 w-8" />
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="flex justify-end border-t p-4">
						<button @click="clearSelection" class="btn btn-error btn-sm">Clear selected</button>
						<button @click="submitSelection" class="btn btn-success btn-sm ml-2">Submit</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';

interface Value {
	name: string;
	value: string;
	iconUrl?: string;
}

interface SelectManyProps {
	label: string;
	value: string[];
	onChange: (value: string[]) => void;
	values: Value[];
	name?: string;
	imageInName?: string;
	tooltipTitle?: string;
	ButtonProps?: Record<string, any>;
}

const props = defineProps<SelectManyProps>();

const open = ref(false);
const search = ref('');
const checkedValues = ref<string[]>([...props.value]);

const openDialog = () => {
	open.value = true;
};

const closeDialog = () => {
	open.value = false;
	search.value = '';
};

const toggleCheck = (value: string) => {
	if (checkedValues.value.includes(value)) {
		checkedValues.value = checkedValues.value.filter((v) => v !== value);
	} else {
		checkedValues.value.push(value);
	}
};

const clearSelection = () => {
	checkedValues.value = [];
};

const submitSelection = () => {
	props.onChange(checkedValues.value);
	closeDialog();
};

const filteredValues = computed(() => {
	if (!search.value) return props.values;
	return props.values.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()));
});

const displayValue = computed(() => checkedValues.value.length);

watch(
	() => props.value,
	(newValue) => {
		checkedValues.value = [...newValue];
	}
);
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
