<template>
	<dialog ref="modal" class="modal">
		<div class="modal-box w-11/12 max-w-2xl">
			<VeeForm :validation-schema="validationSchema" @submit="handleSearch">
				<div class="fieldset">
					<VeeField v-slot="{ field, errorMessage }" name="search">
						<input
							v-bind="field"
							ref="searchInput"
							type="text"
							placeholder="Search commands..."
							class="input w-full"
							:class="{ 'input-error': errorMessage }"
							@keydown.down.prevent="$emit('navigate', 'next')"
							@keydown.up.prevent="$emit('navigate', 'prev')"
							@keydown.enter.prevent="$emit('execute')"
						/>
						<span v-if="errorMessage" class="text-error mt-1 text-xs">
							{{ errorMessage }}
						</span>
					</VeeField>
				</div>

				<div class="mt-4 max-h-[60vh] overflow-y-auto">
					<div v-for="group in groups" :key="group.id" class="mb-4">
						<div class="mb-2 text-sm font-semibold opacity-70">
							{{ group.name }}
						</div>
						<div class="space-y-2">
							<button
								v-for="command in getCommandsByGroup(group.id)"
								:key="command.name"
								class="hover:bg-base-200 w-full rounded-lg p-2 text-left"
								:class="{ 'bg-base-300': selectedCommand?.name === command.name }"
								type="button"
								@click="$emit('select', command)"
							>
								<div class="font-medium">{{ command.name }}</div>
								<div class="text-xs opacity-70">{{ command.description }}</div>
							</button>
						</div>
					</div>
				</div>
			</VeeForm>

			<div class="modal-action">
				<button class="btn" @click="handleClose">Close</button>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop" @submit.prevent="handleClose">
			<button>close</button>
		</form>
	</dialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

// Define search schema with Zod and proper typing
const searchSchema = z.object({
	search: z
		.string()
		.max(50, 'Search term too long')
		.transform((val) => val?.trim() || '')
});

// Convert Zod schema to vee-validate compatible schema with proper typing
const validationSchema = toTypedSchema(searchSchema);

interface Group {
	id: string;
	name: string;
}

interface Props {
	commands: FlattenedCommand[];
	selectedCommand: FlattenedCommand | null;
	groups: Group[];
}

const props = defineProps<Props>();
const modal = ref<HTMLDialogElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
	(e: 'navigate', direction: 'next' | 'prev'): void;
	(e: 'execute' | 'close'): void;
	(e: 'select', command: FlattenedCommand): void;
	(e: 'search', value: string): void;
}>();

// Setup form with proper types and initial values

const getCommandsByGroup = (groupId: string): FlattenedCommand[] => {
	return props.commands.filter((cmd) => cmd.category === groupId);
};

// Wrap form submission with proper typing

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSearch = (values: any) => {
	emit('search', values.search);
};

const handleClose = () => {
	emit('close');
	modal.value?.close();
};

onMounted(() => {
	nextTick(() => {
		searchInput.value?.focus();
	});
});

defineExpose({
	modal
});
</script>
