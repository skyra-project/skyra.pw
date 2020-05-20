import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

export interface SelectIntegerProps extends StandardTextFieldProps {
	value: number;
	label: string;
	min: number;
	max: number;
	onChange(...args: any[]): void;
}

const SelectInteger = ({ value, label, min, max, onChange, ...props }: SelectIntegerProps) => (
	<TextField
		{...props}
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
