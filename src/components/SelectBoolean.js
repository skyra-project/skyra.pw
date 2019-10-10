import React from 'reactn';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function CustomizedDialogs({ title, currentValue, onChange }) {
	return (
		<FormControlLabel
			control={
				<Switch
					checked={currentValue}
					onChange={(event) => onChange(event.target.checked)}
					color="primary"
				/>
			}
			label={title}
		/>
	);
}
