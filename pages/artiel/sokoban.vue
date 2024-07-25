<template>
	<h2 class="mb-24 mt-32 text-5xl font-bold">Sokoban</h2>
	<div class="grid w-full grid-cols-1 rounded-xl bg-base-200 drop-shadow-xl lg:grid-cols-2">
		<div class="flex flex-col items-center justify-between gap-8 p-4 max-lg:order-last">
			<div class="sokoban-grid p-4" :style="{ '--height': height }">
				<div v-for="(row, rowIndex) of rows" class="sokoban-grid-row" :style="{ '--width': width }">
					<component
						v-for="(cell, cellIndex) of row"
						:is="components[cell as keyof typeof components].component"
						class="sokoban-cell"
						@click="setCell(rowIndex, cellIndex)"
					/>
				</div>
			</div>
			<div class="prose w-full rounded-xl bg-base-100 p-4 drop-shadow-xl" :class="{ 'outline outline-2 outline-error': errors.length !== 0 }">
				<ul v-if="errors.length" class="font-semibold text-error">
					<li v-for="error of errors">{{ error }}</li>
				</ul>
				<div v-else>
					<h3 class="mt-0"><Icon name="ph:share-fat-duotone" class="text-success" /> Share Code</h3>
					<div class="join flex w-full">
						<code class="join-item flex h-12 w-full min-w-0 flex-grow-0 cursor-pointer select-all items-center rounded-xl">
							<span class="truncate whitespace-pre pl-2">{{ shareBoard }}</span>
						</code>
						<ClientOnly>
							<button class="btn btn-success join-item" @click="copy()" :disabled="!isSupported || copied">
								<Icon :name="copied ? 'ph:check-bold' : 'ph:clipboard-text-duotone'" class="h-5 w-5" />
							</button>
						</ClientOnly>
					</div>
				</div>
			</div>
		</div>

		<div class="rounded-xl bg-base-300 p-8">
			<div class="flex justify-between">
				<h3 class="text-3xl font-semibold">Editor</h3>
				<button class="btn btn-ghost" @click="modal.showModal()">
					<Icon name="ph:dots-three-outline-vertical-duotone" class="h-5 w-5" />
				</button>
			</div>

			<div class="mt-4">
				<label for="width">Width</label>
				<input type="range" min="4" max="10" class="range" v-model.number="width" />

				<label for="height">Height</label>
				<input type="range" min="4" max="10" class="range" v-model.number="height" />
			</div>

			<div class="mt-8 grid grid-cols-3 gap-4 md:grid-cols-4">
				<button v-for="entry in components" class="btn tooltip tooltip-top h-24 w-24 p-4" :data-tip="entry.name" @click="selected = entry">
					<component :is="entry.component" class="h-full w-full" />
				</button>
			</div>
			<div class="mt-4">
				<h4 class="text-2xl font-semibold">Selected:</h4>
				<div class="join mt-2 flex">
					<div class="join-item flex h-12 flex-grow items-center rounded-xl bg-base-200 px-4">
						<component :is="selected?.component ?? 'div'" class="mr-3 inline-block h-7 w-7" />
						<span class="text-lg font-semibold">{{ selected?.name ?? 'None' }}</span>
					</div>
					<button class="btn btn-error join-item" @click="selected = null" :disabled="selected === null">Unselect</button>
				</div>
			</div>
		</div>
	</div>

	<dialog ref="modal" class="modal">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Paste a map code</h3>
			<form method="dialog" @submit="onModalSubmit($event as SubmitEvent)">
				<input
					v-model="modalInput"
					type="text"
					minlength="23"
					maxlength="109"
					placeholder="00#####.###   #.#TPB  #.### BT#.#T##B #.# # T ##.#B ZBBT#.#   T  #.########"
					class="input w-full bg-base-300 font-mono placeholder-base-content/40"
					pattern="^[0#PXBZT\. ]{23,109}$"
				/>
				<div class="join mt-4 flex flex-row-reverse justify-start">
					<!-- if there is a button in form, it will close the modal -->
					<button id="modal-close" class="btn rounded-l-none">Close</button>
					<button id="modal-submit" class="btn btn-success rounded-r-none">Submit</button>
				</div>
			</form>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import {
	IconsSokobanBox,
	IconsSokobanBoxTarget,
	IconsSokobanBricks,
	IconsSokobanEmpty,
	IconsSokobanFloor,
	IconsSokobanFloorTarget,
	IconsSokobanPlayer,
	IconsSokobanPlayerTarget
} from '#components';

enum Component {
	Empty = '0',
	Bricks = '#',
	Player = 'P',
	PlayerTarget = 'X',
	Box = 'B',
	BoxTarget = 'Z',
	Floor = ' ',
	FloorTarget = 'T'
}

const modal = ref<HTMLDialogElement>(null!);
const modalInput = ref('');

const parsed = parseInput([
	'00#####', //
	'###   #',
	'#TPB  #',
	'### BT#',
	'#T##B #',
	'# # T ##',
	'#B ZBBT#',
	'#   T  #',
	'########'
]);

const rows = reactive(parsed.rows);
const width = ref(parsed.width);
const height = ref(parsed.height);

watch(width, (value) => {
	rows.forEach((row, index) => {
		if (row.length > value) {
			rows[index] = row.slice(0, value);
		} else if (row.length < value) {
			rows[index].push(...getValueTimes(value - row.length, Component.Empty));
		}
	});
});

watch(height, (value) => {
	if (value === rows.length) return;
	if (value > rows.length) {
		for (let i = rows.length; i < value; i++) {
			rows.push([...getValueTimes(width.value, Component.Empty)]);
		}
	} else {
		rows.length = value;
	}
});

const countBoxes = ref(0);
const countTargets = ref(0);
const countPlayers = ref(0);
const errors = reactive<string[]>([]);
const shareBoard = ref<string>('');

const { isSupported, copied, copy } = useClipboard({ source: shareBoard });

watch(rows, onBoardUpdate, { immediate: true });

const components = {
	[Component.Empty]: { component: IconsSokobanEmpty, name: 'Empty', key: Component.Empty },
	[Component.Bricks]: { component: IconsSokobanBricks, name: 'Wall', key: Component.Bricks },
	[Component.Player]: { component: IconsSokobanPlayer, name: 'Player', key: Component.Player },
	[Component.PlayerTarget]: { component: IconsSokobanPlayerTarget, name: 'Player (on target)', key: Component.PlayerTarget },
	[Component.Box]: { component: IconsSokobanBox, name: 'Box', key: Component.Box },
	[Component.BoxTarget]: { component: IconsSokobanBoxTarget, name: 'Box (on target)', key: Component.BoxTarget },
	[Component.Floor]: { component: IconsSokobanFloor, name: 'Floor', key: Component.Floor },
	[Component.FloorTarget]: { component: IconsSokobanFloorTarget, name: 'Target', key: Component.FloorTarget }
};

const selected = shallowRef<ComponentEntry | null>(null);

type ComponentEntry = (typeof components)[keyof typeof components];

function setCell(rowIndex: number, cellIndex: number) {
	const block = selected.value;
	if (block) {
		rows[rowIndex][cellIndex] = block.key;
	}
}

function parseInput(input: readonly string[]) {
	const width = input.reduce((max, row) => Math.max(max, row.length), 0);
	const height = input.length;

	return {
		width,
		height,
		rows: input.map((line) => line.padEnd(width, Component.Empty).split('') as Component[])
	};
}

function onBoardUpdate() {
	let boxes = 0;
	let targets = 0;
	let players = 0;

	for (const row of rows) {
		for (const cell of row) {
			if (cell === Component.Box || cell === Component.BoxTarget) boxes++;
			if (cell === Component.BoxTarget || cell === Component.FloorTarget || cell === Component.PlayerTarget) targets++;
			if (cell === Component.Player || cell === Component.PlayerTarget) players++;
		}
	}

	countBoxes.value = boxes;
	countTargets.value = targets;
	countPlayers.value = players;

	errors.length = 0;
	if (boxes === 0) errors.push('You must place at least one box');
	if (targets === 0) errors.push('You must place at least one target');
	if (boxes !== targets) errors.push('The amount of boxes must match the amount of targets');
	if (players === 0) errors.push('You must place the player');
	else if (players !== 1) errors.push('You cannot have more than one player');
	if (width.value === 4 && height.value === 4) errors.push('The board must be at least 4x5 or 5x4');

	if (errors.length === 0) {
		shareBoard.value = renderShareBoardCode();
	}
}

function onModalSubmit(event: SubmitEvent) {
	if (event.submitter?.id === 'modal-submit') {
		const parsed = parseInput(modalInput.value.split('.'));
		rows.splice(0, rows.length, ...parsed.rows);
		width.value = parsed.width;
		height.value = parsed.height;
	}

	modalInput.value = '';
}

function renderShareBoardCode(): string {
	const lines = [] as string[];
	for (const row of rows) {
		const length = row.findLastIndex((cell) => cell !== Component.Empty) + 1;
		lines.push(row.slice(0, length).join(''));
	}

	return lines.join('.');
}

function* getValueTimes<T>(length: number, value: T): IterableIterator<T> {
	for (let i = 0; i < length; i++) {
		yield value;
	}
}
</script>

<style scoped>
.sokoban-grid {
	--height: 1;

	@apply grid h-fit w-fit;
	grid-template-rows: repeat(var(--height), minmax(0, 1fr));
}

.sokoban-grid-row {
	--width: 1;

	@apply grid;
	grid-template-columns: repeat(var(--width), minmax(0, 1fr));
}

.sokoban-cell {
	width: 100%;
	height: auto;
	max-width: 32px;
	max-height: 32px;
	@apply bg-base-300 outline outline-1 -outline-offset-1 outline-base-100;
}
</style>
