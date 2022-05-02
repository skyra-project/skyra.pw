import { ListItemText, FormControlLabel, Switch } from '@mui/material';
import type { FormControlLabelProps as MFormControlLabelProps } from '@mui/material/FormControlLabel';
import type { SwitchProps as MSwitchProps } from '@mui/material/Switch';
import { useFormikContext } from 'formik';
import getProperty from 'lodash/get';
import React from 'react';
import type { FieldPathValue, FormikValues, Path, UnpackNestedValue } from './types';

interface FormikSwitchProps<TFieldValues extends FormikValues = FormikValues, TName extends Path<TFieldValues> = Path<TFieldValues>> {
	/** The name of the field */
	name: Path<TFieldValues>;
	/** The title to show in the {@link ListItemText} component */
	title: string;
	/** The description to show in the {@link ListItemText} component */
	description?: string;
	/** The default value for this field */
	defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
	/** Additional properties to pas to the {@link Switch} component from material-ui */
	SwitchProps?: MSwitchProps;
	/** Additional props to pass to the {@link FormControlLabel} component from material-ui */
	FormControlLabelProps?: MFormControlLabelProps;
}

const FormikSwitch = <TFieldValues extends FormikValues = FormikValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	name,
	title,
	description,
	defaultValue,
	SwitchProps,
	FormControlLabelProps
}: FormikSwitchProps<TFieldValues, TName>) => {
	const { values, handleChange, handleBlur } = useFormikContext<TFieldValues>();

	return (
		<FormControlLabel
			{...FormControlLabelProps}
			control={
				<Switch
					color="primary"
					{...SwitchProps}
					name={name}
					value={getProperty(values, name) ?? defaultValue}
					checked={(getProperty(values, name) ?? undefined) as boolean | undefined}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			}
			label={<ListItemText primary={title} secondary={description} />}
		/>
	);
};

export default FormikSwitch;
