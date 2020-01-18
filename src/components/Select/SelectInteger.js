import React from 'react';

import { TextField } from '@material-ui/core';

const SelectInteger = ({ value, label, min, max, onChange }) => (
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
