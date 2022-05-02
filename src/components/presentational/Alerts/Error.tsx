import CancelIcon from '@mui/icons-material/Cancel';
import { Button, AlertTitle, Grow, Snackbar } from '@mui/material';
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

const ErrorAlert: FC<ErrorAlertProps> = ({ errorText, errorSubText = '', open = false, setOpen = (...args: any[]) => args, ...props }) => (
	<Snackbar
		autoHideDuration={Time.Second * 10}
		open={open}
		TransitionComponent={Grow}
		sx={{
			width: {
				sm: '98%'
			}
		}}
		{...props}
	>
		<BaseAlert
			severity="error"
			sx={{
				width: {
					sm: '98%'
				}
			}}
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

export default memo(ErrorAlert);
