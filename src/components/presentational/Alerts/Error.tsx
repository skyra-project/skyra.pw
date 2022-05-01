import { Button, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Grow from '@mui/material/Grow';
import Snackbar from '@mui/material/Snackbar';
import CancelIcon from '@mui/icons-material/Cancel';
import AlertTitle from '@mui/material/AlertTitle';
import { Time } from '@utils/skyraUtils';
import React, { Dispatch, FC, memo, ReactNode, SetStateAction } from 'react';
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

const ErrorAlert: FC<ErrorAlertProps> = ({ errorText, errorSubText = '', open = false, setOpen = (...args: any[]) => args, ...props }) => {
	const classes = useStyles();
	return (
		<Snackbar autoHideDuration={Time.Second * 10} open={open} TransitionComponent={Grow} classes={{ root: classes.snackbar }} {...props}>
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

export default memo(ErrorAlert);
