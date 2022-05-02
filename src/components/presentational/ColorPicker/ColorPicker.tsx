import LazyAvatar from '@material/LazyAvatar';
import type { FieldPathValue, FormikValues, Path, TextFieldPropsOmittable, UnpackNestedValue } from '@mods/Formik/types';
import { useMediaQuery } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import TextField, { TextFieldProps as MTextFieldProps } from '@mui/material/TextField';
import { REGEXP } from '@utils/Color';
import { useFormikContext } from 'formik';
import getProperty from 'lodash/get';
import React, { useState } from 'react';
import PickerDialog from './PickerDialog';

interface FormikTextFieldProps<TFieldValues extends FormikValues = FormikValues, TName extends Path<TFieldValues> = Path<TFieldValues>> {
	/** The {@link TextField} label */
	label: string;
	/** The name of the field */
	name: Path<TFieldValues>;
	/** The default value for this field */
	defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
	/** Additional properties to pas to the {@link TextField} component from material-ui */
	TextFieldProps?: Omit<MTextFieldProps, TextFieldPropsOmittable>;
}

const FormikTextField = <TFieldValues extends FormikValues = FormikValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	label,
	name,
	defaultValue,
	TextFieldProps
}: FormikTextFieldProps<TFieldValues, TName>) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const { touched, errors, values, handleChange, handleBlur, setFieldValue } = useFormikContext<TFieldValues>();
	const [showPicker, setShowPicker] = useState(false);

	const togglePicker = () => setShowPicker(!showPicker);

	return (
		<>
			<TextField
				autoComplete="on"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck={false}
				fullWidth
				required
				variant="standard"
				name={name}
				{...TextFieldProps}
				InputProps={{
					startAdornment: (
						<InputAdornment disablePointerEvents position="start">
							<LazyAvatar
								imgProps={{ height: theme.spacing(2), width: theme.spacing(2) }}
								style={{ backgroundColor: REGEXP.HEX.test(getProperty(values, name)) ? getProperty(values, name) : 'transparent' }}
								sx={(theme) => ({
									width: theme.spacing(2),
									height: theme.spacing(2)
								})}
							>
								{'\u200B'}
							</LazyAvatar>
						</InputAdornment>
					)
				}}
				FormHelperTextProps={{
					...TextFieldProps?.FormHelperTextProps,
					sx: {
						...TextFieldProps?.FormHelperTextProps?.sx,
						position: 'absolute',
						top: (theme) => theme.spacing(6.5)
					}
				}}
				inputProps={{
					...TextFieldProps?.inputProps,
					readOnly: isMobile ? 'readonly' : undefined
				}}
				label={label}
				value={getProperty(values, name) ?? defaultValue}
				onChange={handleChange}
				onClick={togglePicker}
				onBlur={handleBlur}
				error={getProperty(touched, name) && Boolean(getProperty(errors, name))}
				helperText={getProperty(touched, name) && (getProperty(errors, name) as string)}
			/>
			{showPicker && (
				<PickerDialog value={getProperty(values, name)} onClick={togglePicker} onChange={(color) => setFieldValue(name, color.hex)} />
			)}
		</>
	);
};

export default FormikTextField;
