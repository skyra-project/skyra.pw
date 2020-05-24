// Copyright (c) 2017 LoicMahieu. All rights reserved. MIT license.
// Source: https://github.com/LoicMahieu/material-ui-color-picker

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { MouseEventHandler } from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';

interface PickerDialogProps {
	value?: string;
	onChange?: ColorChangeHandler;
	onClick?: MouseEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		pickerBox: {
			position: 'relative'
		},
		positionBox: {
			position: 'absolute',
			zIndex: theme.zIndex.modal
		},
		clickEventBox: {
			position: 'fixed',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	})
);

export default ({ value, onClick, onChange }: PickerDialogProps) => {
	const classes = useStyles();
	return (
		<Box component="div" className={classes.pickerBox}>
			<Box component="div" className={classes.positionBox}>
				<Box component="div" className={classes.clickEventBox} onClick={onClick} />
				<ChromePicker color={value} onChange={onChange} />
			</Box>
		</Box>
	);
};
