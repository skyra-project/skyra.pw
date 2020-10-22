import SelectBoolean, { SelectBooleanProps } from '@selects/SelectBoolean';
import { fieldToSwitch, SwitchProps } from 'formik-material-ui';
import React, { FC, memo } from 'react';

const SelectWithLabel: FC<SwitchProps & Omit<SelectBooleanProps, 'onChange' | 'currentValue'>> = ({ form, field, meta, ...props }) => (
	<SelectBoolean
		currentValue={field.value}
		{...props}
		{...fieldToSwitch({ form, field, meta })}
		onChange={event => form.setFieldValue(field.name, event.target.checked)}
	/>
);

export default memo(SelectWithLabel);
