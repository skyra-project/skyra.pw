import React from 'react';
import { FormControl, InputLabel, Select as MSelect } from '@material-ui/core';

const Select = ({ title, onChange, value, children, error, variant = 'outlined' }) => {
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	return (
		<FormControl error={error} variant={variant}>
			<InputLabel ref={inputLabel}>{title}</InputLabel>
			<MSelect native value={value} onChange={onChange} labelWidth={labelWidth}>
				{children}
			</MSelect>
		</FormControl>
	);
};

export default Select;
