import Box from '@mui/material/Box';
import MUITooltip, { TooltipProps } from '@mui/material/Tooltip';
import React, { FC } from 'react';

const Tooltip: FC<TooltipProps> = ({ title, placement, enterDelay, children, ...props }) => (
	<MUITooltip
		title={<Box p={1}>{title}</Box>}
		placement={placement ?? 'top'}
		enterDelay={enterDelay ?? 300}
		{...props}
		sx={{
			bgcolor: 'text.primary',
			boxShadow: (theme) => theme.shadows[5],
			color: (theme) => theme.palette.getContrastText(theme.palette.text.primary),
			fontSize: '0.8rem'
		}}
	>
		{children}
	</MUITooltip>
);

export default Tooltip;
