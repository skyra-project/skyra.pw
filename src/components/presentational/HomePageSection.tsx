import type features from '@assets/features';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import { Box, Divider, Hidden, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) =>
	createStyles({
		oddBox: {
			'&:nth-of-type(odd)': {
				flexDirection: 'row-reverse'
			}
		},
		evenBox: {
			'&:nth-of-type(even)': {
				flexDirection: 'row-reverse'
			}
		},
		divider: {
			marginTop: theme.spacing(1.25),
			marginBottom: theme.spacing(1.25)
		},
		text: {
			display: 'flex',
			flexDirection: 'column',
			width: '47%',
			[theme.breakpoints.down('lg')]: {
				width: '100%'
			}
		}
	})
);

const HomePageSection = ({ name, previewContent, text }: typeof features extends Array<infer U> ? U : never) => {
	const classes = useStyles();
	const authenticated = useAuthenticated();

	return (
		<Box
			p={5}
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			alignContent="center"
			flexWrap="wrap"
			flexDirection="row"
			minHeight="min-content"
			className={clsx({ [classes.evenBox]: authenticated, [classes.oddBox]: !authenticated })}
		>
			<div className={classes.text}>
				<Typography variant="h3" component="h1">
					{name}
				</Typography>
				<Divider classes={{ root: classes.divider }} />
				<Typography>{text}</Typography>
			</div>
			<Hidden lgDown>{previewContent}</Hidden>
		</Box>
	);
};

export default HomePageSection;
