import { Box, Tooltip as MTooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TooltipProps } from '@mui/material/Tooltip';
import type { FC } from 'react';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => <MTooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.text.primary,
		color: theme.palette.getContrastText(theme.palette.text.primary),
		boxShadow: theme.shadows[5],
		fontSize: '0.8rem'
	}
}));

const Tooltip: FC<TooltipProps> = ({ title, placement, enterDelay, children, ...props }) => (
	<StyledTooltip title={<Box p={1}>{title}</Box>} placement={placement ?? 'top'} enterDelay={enterDelay ?? 300} {...props}>
		{children}
	</StyledTooltip>
);

export default Tooltip;
