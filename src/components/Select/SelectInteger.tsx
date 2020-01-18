import React from 'react';

import { TextField } from '@material-ui/core';

export interface SelectIntegerProps {
	value: number;
	label: string;
	min: number;
	max: number;
	onChange(...args: any[]): void;
}

const SelectInteger = ({ value, label, min, max, onChange }: SelectIntegerProps) => (
	<TextField
		value={value}
		label={label}
		type="number"
		margin="normal"
		style={{ minWidth: 200 }}
		inputProps={{ min, max }}
		onChange={onChange}
	/>
);

export default SelectInteger;
