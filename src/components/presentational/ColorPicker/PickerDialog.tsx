// Copyright (c) 2017 LoicMahieu. All rights reserved. MIT license.
// Source: https://github.com/LoicMahieu/material-ui-color-picker

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { FC, memo, MouseEventHandler, useEffect, useRef } from 'react';
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

const PickerDialog: FC<PickerDialogProps> = ({ value, onClick, onChange }) => {
	const classes = useStyles();
	const scrollLockRef = useRef<ChromePicker>(null);

	useEffect(() => {
		if (scrollLockRef.current === null) {
			enableBodyScroll(scrollLockRef.current as unknown as HTMLElement);
		} else {
			disableBodyScroll(scrollLockRef.current as unknown as HTMLElement);
		}

		return () => {
			clearAllBodyScrollLocks();
		};
	});

	return (
		<Box component="div" className={classes.pickerBox}>
			<Box component="div" className={classes.positionBox}>
				<Box component="div" className={classes.clickEventBox} onClick={onClick} />
				<ChromePicker ref={scrollLockRef} color={value} onChange={onChange} disableAlpha />
			</Box>
		</Box>
	);
};

export default memo(PickerDialog);
