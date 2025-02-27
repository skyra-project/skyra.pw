import type { Selfmod } from '~~/shared/types/ConfigurableData';

export const updateSliderValueObj = (prop: Selfmod.Union, value: number | number[], multiplier = 1) => ({
	[prop]: Array.isArray(value) && typeof value[0] === 'number' ? value[0] * multiplier : typeof value === 'number' ? value * multiplier : 0
});

export const updateSliderValueArr = (prop: Selfmod.Union, value: number | number[], multiplier = 1) => ({
	[prop]: Array.isArray(value) ? value.map((v) => v * multiplier) : value * multiplier
});
