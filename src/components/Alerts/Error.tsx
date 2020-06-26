import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import CancelIcon from '@material-ui/icons/Cancel';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Time } from 'lib/util/skyraUtils';
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import React from 'reactn';
import BaseAlert from './Base';

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
	/** A local state setter that should trigger open state */
	setOpen?: Dispatch<SetStateAction<boolean>>;
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

export default ({
	errorText,
	errorSubText = '',
	open = false,
	setOpen = (...args: any[]) => args,
	...props
}: PropsWithChildren<ErrorAlertProps>) => {
	const classes = useStyles();
	return (
		<Snackbar
			autoHideDuration={Time.Second * 10}
			open={open}
			TransitionComponent={Grow}
			classes={{ root: classes.snackbar }}
			{...props}
		>
			<BaseAlert
				severity="error"
				classes={{ root: classes.paper }}
				action={
					<Button endIcon={<CancelIcon />} color="inherit" size="large" onClick={() => setOpen(!open ?? false)}>
						CLOSE
					</Button>
				}
			>
				<AlertTitle>{errorText}</AlertTitle>
				{errorSubText}
			</BaseAlert>
		</Snackbar>
	);
};
