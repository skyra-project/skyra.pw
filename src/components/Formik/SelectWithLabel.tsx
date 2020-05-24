import SelectBoolean, { SelectBooleanProps } from 'components/Select/SelectBoolean';
import { fieldToSwitch, SwitchProps } from 'formik-material-ui';
import React from 'react';

export default ({ form, field, meta, ...props }: SwitchProps & Omit<SelectBooleanProps, 'onChange' | 'currentValue'>) => (
	<SelectBoolean
		currentValue={field.value}
		{...props}
		{...fieldToSwitch({ form, field, meta })}
		onChange={event => form.setFieldValue(field.name, event.target.checked)}
	/>
);
