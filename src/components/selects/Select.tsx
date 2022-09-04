import { FormControl, FormHelperText, InputLabel, Select as MSelect } from '@mui/material';
import type { FormControlProps } from '@mui/material/FormControl';
import type { SelectProps as MSelectProps } from '@mui/material/Select';
import type { FC } from 'react';

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
	return (
		<FormControl {...FormControlProps} variant="standard" fullWidth={fullWidth} error={error}>
			<InputLabel id={`label-for-${title}-select`}>{title}</InputLabel>
			<MSelect
				{...props}
				variant="standard"
				label={title}
				labelId={`label-for-${title}-select`}
				value={value}
				onChange={onChange}
				fullWidth={fullWidth}
			>
				{children}
			</MSelect>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
};

export default Select;
