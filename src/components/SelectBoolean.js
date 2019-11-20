import React from 'reactn';
import { Switch, FormControlLabel, ListItemText } from '@material-ui/core';

export default function SelectBoolean({ title, currentValue, onChange, description }) {
	return (
		<FormControlLabel
			control={<Switch checked={currentValue} onChange={event => onChange(event.target.checked)} color="primary" />}
			label={<ListItemText primary={title} secondary={description} />}
		/>
	);
}
