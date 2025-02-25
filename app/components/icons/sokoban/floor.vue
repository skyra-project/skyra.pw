<template>
	<icons-sokoban-empty>
		<pattern id="icons-sokoban-floor-checkerboard" viewBox="0 0 32 32" width="32" height="32" patternUnits="userSpaceOnUse">
			<rect x="16" y="0" width="16" height="16" fill="#DADADA" />
			<rect x="0" y="16" width="16" height="16" fill="#DADADA" />
		</pattern>

		<rect x="0" y="0" width="256" height="256" fill="#F3F3F3" />
		<rect x="0" y="0" width="256" height="256" fill="url(#icons-sokoban-floor-checkerboard)" />

		<slot></slot>
	</icons-sokoban-empty>
</template>
