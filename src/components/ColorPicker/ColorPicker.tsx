// Copyright (c) 2017 LoicMahieu. All rights reserved. MIT license.
// Source: https://github.com/LoicMahieu/material-ui-color-picker

import { useMediaQuery } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';
import LazyAvatar from 'components/LazyAvatar';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import { REGEXP } from 'lib/util/Color';
import React, { ChangeEvent, PropsWithChildren, useCallback, useState } from 'react';
import PickerDialog from './PickerDialog';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		smallAvatar: {
			width: theme.spacing(2),
			height: theme.spacing(2)
		},
		errorLabel: {
			position: 'absolute',
			top: theme.spacing(6.5)
		}
	})
);

export default ({ form: { setFieldValue, ...form }, field, ...props }: PropsWithChildren<Omit<TextFieldProps, 'variant'>>) => {
	const [showPicker, setShowPicker] = useState(false);
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const onChange = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			setFieldValue(field.name, event.target.value);
		},
		[field.name, setFieldValue]
	);

	const togglePicker = () => setShowPicker(!showPicker);

	return (
		<>
			<MuiTextField
				{...props}
				InputProps={{
					startAdornment: (
						<InputAdornment disablePointerEvents position="start">
							<LazyAvatar
								imgProps={{ height: theme.spacing(2), width: theme.spacing(2) }}
								style={{ backgroundColor: REGEXP.HEX.test(field.value) ? field.value : 'transparent' }}
								className={classes.smallAvatar}
							>
								{'\u200B'}
							</LazyAvatar>
						</InputAdornment>
					)
				}}
				variant="standard"
				{...fieldToTextField({ field, form: { setFieldValue, ...form }, ...props })}
				onChange={onChange}
				onClick={togglePicker}
				FormHelperTextProps={{
					classes: { error: classes.errorLabel }
				}}
				inputProps={{
					readOnly: isMobile ? 'readonly' : undefined
				}}
			/>
			{showPicker && (
				<PickerDialog value={field.value} onClick={togglePicker} onChange={color => setFieldValue(field.name, color.hex)} />
			)}
		</>
	);
};
