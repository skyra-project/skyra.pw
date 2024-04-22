<template>
	<icons-sokoban-floor>
		<g fill="#3998D5" stroke="#3998D5" stroke-width="16" stroke-linejoin="round" stroke-linecap="round">
			<path d="M 35,128 l 65,0 l -30,-30 l 0,60 l 30,-30" />
			<path d="M 221,128 l -65,0 l 30,-30 l 0,60 l -30,-30" />
			<path d="M 128,35 l 0,65 l -30,-30 l 60,0 l -30,30" />
			<path d="M 128,221 l 0,-65 l -30,30 l 60,0 l -30,-30" />
		</g>

		<slot></slot>
	</icons-sokoban-floor>
</template>
