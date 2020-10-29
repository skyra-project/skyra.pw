import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MUITooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { FC } from 'react';

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

const Tooltip: FC<TooltipProps> = ({ title, placement, enterDelay, children, ...props }) => {
	const classes = useStyles();

	return (
		<MUITooltip
			title={<Box className={classes.box}>{title}</Box>}
			placement={placement ?? 'top'}
			enterDelay={enterDelay ?? 300}
			{...props}
			classes={{ tooltip: clsx(classes.tooltip, props.classes?.tooltip) }}
		>
			{children}
		</MUITooltip>
	);
};

export default Tooltip;
