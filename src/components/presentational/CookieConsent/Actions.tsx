import { setCookieConsent } from '@contexts/CookieContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		rejectButton: {
			backgroundColor: theme.palette.error.main,

			'&:hover': {
				backgroundColor: theme.palette.error.dark
			}
		}
	})
);

const Actions: FC = () => {
	const writeAllowsCookies = setCookieConsent();
	const classes = useStyles();

	return (
		<Grid container alignContent="stretch" justify="space-between" alignItems="center" spacing={2}>
			<Grid item xs={6}>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					classes={{ root: classes.rejectButton }}
					onClick={() => writeAllowsCookies(false)}
				>
					I reject cookies
				</Button>
			</Grid>
			<Grid item xs={6}>
				<Button fullWidth variant="contained" color="primary" onClick={() => writeAllowsCookies(true)}>
					I accept cookies
				</Button>
			</Grid>
		</Grid>
	);
};

export default Actions;
