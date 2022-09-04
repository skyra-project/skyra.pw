import { Box, BoxProps, Typography } from '@mui/material';
import { memo, type FC, type ReactNode } from 'react';

export interface SectionProps extends Omit<BoxProps, 'title'> {
	title: ReactNode;
	disableTypography?: boolean;
	titleProps?: BoxProps;
}

export const Section: FC<SectionProps> = ({ title, children, titleProps, disableTypography = false, ...props }) => (
	<Box
		{...props}
		component="section"
		sx={{
			mr: {
				md: 4,
				xs: 0
			},
			mb: 2,
			flexBasis: {
				md: 'inherit',
				xs: '100%'
			},
			width: {
				md: 'inherit',
				xs: '100%'
			},
			'&:not:(:first-of-type)': {
				mt: {
					md: 'inherit',
					xs: 3
				}
			},
			...props.sx
		}}
	>
		{Boolean(title) && (
			<>
				{disableTypography ? (
					<Box {...titleProps}>{title}</Box>
				) : (
					<Typography
						variant="h5"
						component="h1"
						{...titleProps}
						sx={{
							...titleProps?.sx,
							borderBottomWidth: 2,
							borderBottomStyle: 'solid',
							borderBottomColor: (theme) => theme.palette.primary.main,
							mb: 3,
							pb: 0.25
						}}
					>
						{title}
					</Typography>
				)}
			</>
		)}
		{children}
	</Box>
);

export default memo(Section);
