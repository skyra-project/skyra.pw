import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import React from 'react';

export interface SelectBooleanProps extends SwitchProps {
	/** The title to show next to the Switch */
	title: string;
	/** The current value of the Switch */
	currentValue: boolean;
	/** Description to show under the Switch */
	description?: string;
	/** Additional props to pass to the FormControlLabel component */
	FormControlLabelProps?: FormControlLabelProps;
}

export default ({ title, currentValue, onChange, description, FormControlLabelProps, ...props }: SelectBooleanProps) => (
	<FormControlLabel
		{...FormControlLabelProps}
		control={<Switch {...props} checked={currentValue} onChange={onChange} color="primary" />}
		label={<ListItemText primary={title} secondary={description} />}
	/>
);
