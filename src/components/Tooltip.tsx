import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MUITooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tooltip: {
			backgroundColor: theme.palette.text.primary,
			boxShadow: theme.shadows[5],
			color: theme.palette.getContrastText(theme.palette.text.primary),
			fontSize: '0.8rem'
		},
		box: {
			padding: theme.spacing(1)
		}
	})
);

export default ({ title, placement, enterDelay, children, ...props }: TooltipProps) => {
	const classes = useStyles();

	return (
		<MUITooltip
			{...props}
			title={<Box className={classes.box}>{title}</Box>}
			placement={placement ?? 'top'}
			enterDelay={enterDelay ?? 300}
			classes={{ tooltip: clsx(classes.tooltip) }}
		>
			{children}
		</MUITooltip>
	);
};
