export function emptyStringToUndefined(value: number, originalValue: string | number | null): number | undefined {
	if ((typeof originalValue === 'string' && originalValue === '') || value === 0) {
		return undefined;
	}

	return value;
}
