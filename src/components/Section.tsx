import { Box, BoxProps, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';
import { Else, If, Then, When } from 'react-if';

export interface SectionProps {
	title: ReactNode;
	disableTypography?: boolean;
	titleProps?: BoxProps;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginRight: theme.spacing(4),
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down('sm')]: {
				flexBasis: '100%',
				width: '100%',
				marginRight: 0,

				'&:not:(:first-child)': {
					marginTop: theme.spacing(3)
				}
			}
		},
		typography: {
			borderBottomWidth: 2,
			borderBottomStyle: 'solid',
			borderBottomColor: theme.palette.primary.main,
			marginBottom: '1.5rem',
			paddingBottom: '0.6rem'
		}
	})
);

export const Section: FC<SectionProps> = ({ title, children, titleProps, disableTypography = false }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<When condition={Boolean(title)}>
				<If condition={disableTypography}>
					<Then>
						<Box {...titleProps}>{title}</Box>
					</Then>
					<Else>
						<Typography variant="h5" component="h1" classes={{ root: classes.typography }} {...titleProps}>
							{title}
						</Typography>
					</Else>
				</If>
			</When>
			{children}
		</Box>
	);
};

export default Section;
