import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { noOp } from 'lib/util/skyraUtils';
import { navigate } from 'lib/util/util';
import React, { memo, useContext } from 'react';
import { CookieConsentContext } from './ContextProvider';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			zIndex: theme.zIndex.snackbar,
			position: 'fixed',
			display: 'flex',
			left: theme.spacing(1),
			right: theme.spacing(1),
			justifyContent: 'center',
			alignItems: 'center'
		},
		anchorOriginBottomCenter: {
			bottom: theme.spacing(1),
			[theme.breakpoints.up('md')]: {
				bottom: theme.spacing(3),
				left: '50%',
				right: 'auto',
				transform: 'translateX(-50%)'
			}
		},
		snackbarContent: {
			backgroundColor: theme.palette.secondary.dark
		},
		message: {
			...theme.typography.body1,
			color: theme.palette.secondary.contrastText,
			padding: theme.spacing(3),
			fontSize: theme.spacing(2.5)
		},
		action: {
			marginLeft: 'unset',
			marginRight: 'unset',
			alignContent: 'center',
			justifyContent: 'center',
			width: '100%',
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
			paddingBottom: theme.spacing(3),
			paddingTop: 0
		},
		rejectButton: {
			backgroundColor: theme.palette.error.main,

			'&:hover': {
				backgroundColor: theme.palette.error.dark
			}
		},
		fauxLink: {
			color: theme.palette.primary.main,
			cursor: 'pointer',
			textDecoration: 'underline',
			'&:hover': {
				color: theme.palette.primary.dark
			}
		}
	})
);

const CookieAction = memo(() => {
	const { dispatch } = useContext(CookieConsentContext);
	const classes = useStyles();

	return (
		<Grid container alignContent="stretch" justify="space-between" alignItems="center" spacing={2}>
			<Grid item xs={6}>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					classes={{ root: classes.rejectButton }}
					onClick={() => dispatch(false)}
				>
					I reject cookies
				</Button>
			</Grid>
			<Grid item xs={6}>
				<Button fullWidth variant="contained" color="primary" onClick={() => dispatch(true)}>
					I accept cookies
				</Button>
			</Grid>
		</Grid>
	);
});

export default memo(() => {
	const { allowsCookies } = useContext(CookieConsentContext);
	const classes = useStyles();

	if (allowsCookies !== null) return null;

	return (
		<ClickAwayListener onClickAway={noOp}>
			<Box className={clsx(classes.root, classes.anchorOriginBottomCenter)}>
				<Slide appear in={allowsCookies === null} direction="up">
					<SnackbarContent
						message={
							<>
								<Typography>
									This site uses cookies for authentication. If you would like to use the login feature and manage your
									servers please enable the use of cookies by clicking the button below. Want to know how we handle your
									privacy? Feel free to review{' '}
									<span className={classes.fauxLink} onClick={navigate('/privacy')}>
										our privacy policy
									</span>
									.
								</Typography>
							</>
						}
						action={<CookieAction />}
						classes={{ root: classes.snackbarContent, message: classes.message, action: classes.action }}
					/>
				</Slide>
			</Box>
		</ClickAwayListener>
	);
});
