import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Slide from '@material-ui/core/Slide';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { noop } from '@sapphire/utilities';
import { navigate } from '@utils/util';
import clsx from 'clsx';
import React, { FC, memo, useContext } from 'react';
import Actions from './Actions';
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

const WarningSnackbar: FC = () => {
	const { allowsCookies } = useContext(CookieConsentContext);
	const classes = useStyles();

	if (allowsCookies !== null) return null;

	return (
		<ClickAwayListener onClickAway={noop}>
			<Box className={clsx(classes.root, classes.anchorOriginBottomCenter)}>
				<Slide appear in={allowsCookies === null} direction="up">
					<SnackbarContent
						message={
							<>
								<Typography>
									This site uses cookies for authentication. If you would like to use the login feature and manage your servers
									please enable the use of cookies by clicking the button below. Want to know how we handle your privacy? Feel free
									to review{' '}
									<span className={classes.fauxLink} onClick={navigate('/privacy')}>
										our privacy policy
									</span>
									.
								</Typography>
							</>
						}
						action={<Actions />}
						classes={{ root: classes.snackbarContent, message: classes.message, action: classes.action }}
					/>
				</Slide>
			</Box>
		</ClickAwayListener>
	);
};

export default memo(WarningSnackbar);
