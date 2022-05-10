import type { TextFieldProps as MTextFieldProps } from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import getProperty from 'lodash/get';
import React from 'react';
import type { FieldPathValue, FormikValues, Path, TextFieldPropsOmittable, UnpackNestedValue } from './types';

import { TextField } from '@mui/material';

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
	const { touched, errors, values, handleChange, handleBlur } = useFormikContext<TFieldValues>();

	return (
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
			label={label}
			value={getProperty(values, name) ?? defaultValue}
			onChange={handleChange}
			onBlur={handleBlur}
			error={getProperty(touched, name) && Boolean(getProperty(errors, name))}
			helperText={getProperty(touched, name) && (getProperty(errors, name) as string)}
		/>
	);
};

export default FormikTextField;
