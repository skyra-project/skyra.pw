import React, { useRef, useState, useEffect, FC } from 'react';
import { FormControl, InputLabel, Select as MSelect, FormHelperText, SelectProps as MSelectProps } from '@material-ui/core';
import clsx from 'clsx';

interface SelectProps extends MSelectProps {
	title: string;
	helperText?: string;
	customClasses?: string;
	customFormControlClasses?: string;

	onChange: (...args: any[]) => void;
}

const Select: FC<SelectProps> = ({
	title,
	onChange,
	value,
	children,
	error,
	helperText = '',
	customClasses = '',
	customFormControlClasses = ''
}) => {
	const inputLabel = useRef<HTMLLabelElement>(null);
	const [labelWidth, setLabelWidth] = useState(0);

	useEffect(() => {
		if (inputLabel.current !== null) {
			setLabelWidth(inputLabel.current.offsetWidth);
		}
	}, []);

	return (
		<FormControl error={error} classes={{ root: customFormControlClasses }}>
			<InputLabel id={`label-for-${title}-select`} ref={inputLabel}>
				{title}
			</InputLabel>
			<MSelect
				className={clsx(customClasses)}
				labelId={`label-for-${title}-select`}
				value={value}
				onChange={onChange}
				labelWidth={labelWidth}
			>
				{children}
			</MSelect>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
};

export default Select;
