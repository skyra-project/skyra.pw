export const breakpointValues = {
	xs: 0,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1920
};

export const keys = Object.keys(breakpointValues);

function up(key) {
	if (typeof key === 'number') {
		return `@media (min-width:${key}px)`;
	}
	const value = typeof breakpointValues[key] === 'number' ? breakpointValues[key] : key;
	return `@media (min-width:${value}px)`;
}

function down(key) {
	if (typeof key === 'number') {
		return `@media (max-width:${key}px)`;
	}
	const endIndex = keys.indexOf(key) + 1;
	const upperbound = breakpointValues[keys[endIndex]];

	if (endIndex === keys.length) {
		// xl down applies to all sizes
		return up('xs');
	}

	const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
	return `@media (max-width:${value - 5 / 100}px)`;
}

function between(start, end) {
	if (typeof start === 'number') {
		return `@media (min-width:${start}px) and (max-width:${end}px)`;
	}
	const endIndex = keys.indexOf(end) + 1;

	if (endIndex === keys.length) {
		return up(start);
	}

	return `@media (min-width:${breakpointValues[start]}px) and ` + `(max-width:${breakpointValues[keys[endIndex]] - 5 / 100}px)`;
}

function only(key) {
	return between(key, key);
}

export const breakpoints = {
	...breakpointValues,
	down,
	up,
	between,
	only
};
