import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { PropsWithChildren, ReactNode } from 'react';
import React from 'reactn';
import BaseAlert from './Base';
import { Time } from 'meta/constants';

/** Props to pass to the ErrorAlert component, any additional props are passed to the `Snackbar` component */
interface ErrorAlertProps {
	/** The title text to show as an error */
	errorText: string;
	/**
	 * Subtext to show in the error
	 * @default ''
	 */
	errorSubText?: ReactNode;
	/**
	 * Whether this alert is visible or not
	 * @default false
	 */
	open?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		snackbar: {
			[theme.breakpoints.up('sm')]: {
				width: '98%'
			}
		},
		paper: {
			[theme.breakpoints.up('sm')]: {
				width: '98%'
			}
		}
	})
);

export default ({ errorText, errorSubText = '', open = false, ...props }: PropsWithChildren<ErrorAlertProps>) => {
	const classes = useStyles();
	return (
		<Snackbar
			autoHideDuration={Time.Second * 10}
			open={open}
			TransitionComponent={Grow}
			classes={{ root: classes.snackbar }}
			{...props}
		>
			<BaseAlert severity="error" classes={{ root: classes.paper }}>
				<AlertTitle>{errorText}</AlertTitle>
				{errorSubText}
			</BaseAlert>
		</Snackbar>
	);
};
