import { Box, BoxProps, Typography } from '@mui/material';
import React, { FC, memo, ReactNode } from 'react';

export interface SectionProps extends Omit<BoxProps, 'title'> {
	title: ReactNode;
	disableTypography?: boolean;
	titleProps?: BoxProps;
}

export const Section: FC<SectionProps> = ({ title, children, titleProps, disableTypography = false, ...props }) => (
	<Box
		{...props}
		sx={{
			marginRight: {
				md: (theme) => theme.spacing(4),
				xs: 0
			},
			marginBottom: (theme) => theme.spacing(2),
			flexBasis: {
				md: 'inherit',
				xs: '100%'
			},
			width: {
				md: 'inherit',
				xs: '100%'
			},
			'&:not:(:first-child)': {
				marginTop: {
					md: 'inherit',
					xs: (theme) => theme.spacing(3)
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
							marginBottom: (theme) => theme.spacing(3),
							paddingBottom: (theme) => theme.spacing(0.25)
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
