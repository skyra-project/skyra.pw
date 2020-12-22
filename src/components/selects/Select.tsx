import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MSelect, { SelectProps as MSelectProps } from '@material-ui/core/Select';
import React, { FC, useEffect, useRef, useState } from 'react';

/**
 * Props to pass to the Select component.
 * Any additional props will be passed to the Material-UI Select component
 */
interface SelectProps extends MSelectProps {
	title: string;
	helperText?: string;
	fullWidth?: boolean;

	/** Additional props to pass to the FormControl component */
	FormControlProps?: FormControlProps;

	onChange: (...args: any[]) => void;
}

const Select: FC<SelectProps> = ({ title, onChange, value, children, error, fullWidth = false, helperText = '', FormControlProps, ...props }) => {
	const inputLabel = useRef<HTMLLabelElement>(null);
	const [labelWidth, setLabelWidth] = useState(0);

	useEffect(() => {
		if (inputLabel.current !== null) {
			setLabelWidth(inputLabel.current.offsetWidth);
		}
	}, []);

	return (
		<FormControl {...FormControlProps} fullWidth={fullWidth} error={error}>
			<InputLabel id={`label-for-${title}-select`} ref={inputLabel}>
				{title}
			</InputLabel>
			<MSelect {...props} labelId={`label-for-${title}-select`} value={value} onChange={onChange} labelWidth={labelWidth} fullWidth={fullWidth}>
				{children}
			</MSelect>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
};

export default Select;
