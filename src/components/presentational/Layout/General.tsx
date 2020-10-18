import CookieIcon from '@assets/CookieIcon';
import SkyraLogo from '@assets/skyraLogo';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box, { BoxProps } from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fab from '@material-ui/core/Fab';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InviteIcon from '@material-ui/icons/Add';
import CommandsIcon from '@material-ui/icons/Extension';
import DiscordChatIcon from '@material-ui/icons/Forum';
import GavelIcon from '@material-ui/icons/Gavel';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import LoginIcon from '@material-ui/icons/VpnKey';
import Tooltip from '@mui/Tooltip';
import { CookieConsentContext } from '@presentational/CookieConsent/ContextProvider';
import Footer from '@presentational/Layout/Footer';
import UserMenu from '@presentational/Layout/UserMenu';
import { oauthURL } from '@utils/constants';
import { navigate } from '@utils/util';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Else, If, Then, When } from 'react-if';
import MobileNavMenu from './MobileNavMenu';
import ScrollToTopButton from './ScrollToTopButton';

export interface GeneralPageProps {
	loading?: boolean;
	containerProps?: BoxProps;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '100vh'
		},
		svg: {
			minWidth: 120,
			display: 'flex',
			justifyContent: 'space-around',
			alignContent: 'center',
			alignItems: 'center'
		},
		skyraButton: {
			textAlign: 'left',
			textTransform: 'unset'
		},
		transparentButton: {
			background: 'transparent',
			boxShadow: 'none',
			'&:hover': {
				background: theme.palette.primary.dark,
				boxShadow: theme.shadows[1]
			}
		},
		menuButton: {
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(2)
		},
		popper: {
			marginTop: theme.spacing(-1),
			zIndex: theme.zIndex.drawer + 1
		},
		button: {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0
		},
		loadingBox: {
			display: 'flex',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			height: 'calc(100vh - 128px - 200px)'
		},
		loadingIndicator: {
			width: '100vw'
		}
	})
);

const GeneralPage: FC<GeneralPageProps> = ({ children, loading = false, containerProps, ...props }) => {
	const classes = useStyles();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [popperMenuIsOpen, setPopperMenuOpen] = useState(false);
	const { allowsCookies, dispatch } = useContext(CookieConsentContext);
	const router = useRouter();

	const authenticated = useAuthenticated();

	const togglePopperMenu = () => {
		setPopperMenuOpen(prevOpen => !prevOpen);
	};

	const closePopperMenu = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setPopperMenuOpen(false);
	};

	// return focus to the button when we transitioned from !open -> open
	const popperMenuPrevOpen = useRef(popperMenuIsOpen);

	useEffect(() => {
		if (popperMenuPrevOpen.current === true && popperMenuIsOpen === false) {
			anchorRef.current?.focus();
		}

		popperMenuPrevOpen.current = popperMenuIsOpen;
	}, [popperMenuIsOpen]);

	useEffect(() => {
		// TODO: Sync User
		// syncUser();
	}, []);

	return (
		<Box component="section" className={classes.container} {...containerProps}>
			<Box component="nav">
				<AppBar position="fixed">
					<Toolbar>
						<Hidden mdUp>
							<MobileNavMenu />
						</Hidden>

						<Box flexGrow={1}>
							<Tooltip title="Click to go home" placement="bottom">
								<Button onClick={navigate('/')} classes={{ root: classes.skyraButton }}>
									<Box className={classes.svg}>
										<SkyraLogo />
										<Box display="flex" flexDirection="column" ml={3}>
											<Typography variant="h5" component="h1">
												Skyra
											</Typography>
											<Hidden smDown>
												<Typography variant="caption" component="h1">
													The most advanced moderation bot
												</Typography>
											</Hidden>
										</Box>
									</Box>
								</Button>
							</Tooltip>
						</Box>

						<Hidden smDown>
							<Tooltip title="Click to add Skyra to your server" placement="bottom">
								<Button
									color="primary"
									variant="contained"
									classes={{ root: classes.transparentButton }}
									onClick={navigate('https://invite.skyra.pw')}
									startIcon={<InviteIcon />}
								>
									<Typography variant="body2" color="textPrimary">
										Add Skyra to server
									</Typography>
								</Button>
							</Tooltip>
							<Tooltip title="Click to join Skyra Lounge Discord server" placement="bottom">
								<Button
									color="primary"
									variant="contained"
									classes={{ root: classes.transparentButton }}
									onClick={navigate('https://join.skyra.pw')}
									startIcon={<DiscordChatIcon />}
								>
									<Typography variant="body2" color="textPrimary">
										Join our Discord
									</Typography>
								</Button>
							</Tooltip>

							<When condition={authenticated}>
								<UserMenu />
							</When>

							<When condition={!authenticated && !loading}>
								<Tooltip
									title={
										allowsCookies
											? 'Click to login and manage your servers'
											: [
													'Looks like do not allow use to save cookies',
													'We use cookies for authentication.',
													'Please enable cookies and this button will be enabled.'
											  ].join(' ') // eslint-disable-line no-mixed-spaces-and-tabs
									}
									placement={allowsCookies ? 'bottom' : 'left'}
								>
									<Box component="div">
										<Button
											color="primary"
											variant="contained"
											classes={{ root: classes.transparentButton }}
											onClick={navigate(oauthURL.toString())}
											startIcon={<LoginIcon />}
											disabled={!allowsCookies}
										>
											<Typography variant="body2" color="textPrimary">
												Log In
											</Typography>
										</Button>
									</Box>
								</Tooltip>
							</When>

							<IconButton
								ref={anchorRef}
								edge="start"
								aria-controls={popperMenuIsOpen ? 'menu-popover' : undefined}
								aria-haspopup="true"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								onClick={togglePopperMenu}
							>
								<MenuIcon />
							</IconButton>
							<Popper
								className={classes.popper}
								open={popperMenuIsOpen}
								anchorEl={anchorRef.current}
								transition
								disablePortal
							>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
									>
										<Paper>
											<ClickAwayListener onClickAway={closePopperMenu}>
												<MenuList autoFocusItem={popperMenuIsOpen} id="menu-popover">
													{router.pathname !== '/' && (
														<Tooltip title="Click to go back to the home page" placement="left">
															<MenuItem onClick={navigate('/')}>
																<ListItemIcon>
																	<HomeIcon />
																</ListItemIcon>
																<Typography variant="inherit">Go back home</Typography>
															</MenuItem>
														</Tooltip>
													)}
													<Tooltip title="Click to view Skyra's commands" placement="left">
														<MenuItem onClick={navigate('/commands')}>
															<ListItemIcon>
																<CommandsIcon />
															</ListItemIcon>
															<Typography variant="inherit">Commands</Typography>
														</MenuItem>
													</Tooltip>
													<Tooltip title="Click to read how we handle your data" placement="left">
														<MenuItem onClick={navigate('/privacy')}>
															<ListItemIcon>
																<GavelIcon />
															</ListItemIcon>
															<Typography variant="inherit">Privacy Policy</Typography>
														</MenuItem>
													</Tooltip>
													{allowsCookies !== null && (
														<Tooltip title="Click to update whether we can store cookies" placement="left">
															<MenuItem
																onClick={event => {
																	closePopperMenu(event);
																	dispatch(null);
																}}
															>
																<ListItemIcon>
																	<CookieIcon />
																</ListItemIcon>
																<Typography variant="inherit">Update cookie consent</Typography>
															</MenuItem>
														</Tooltip>
													)}
												</MenuList>
											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</Hidden>
					</Toolbar>
				</AppBar>

				{/* These toolbars are to ensure there is some offset for the content.
			For more information see https://material-ui.com/components/app-bar/#fixed-placement */}
				<Toolbar />
				<Toolbar />
			</Box>

			<Box component="main" role="contentinfo" className={clsx({ [classes.loadingBox]: loading })}>
				<If condition={loading}>
					<Then>
						<LinearProgress variant="query" classes={{ root: classes.loadingIndicator }} />
					</Then>
					<Else>{children}</Else>
				</If>
			</Box>

			<Footer />

			<Box component="span">
				<ScrollToTopButton {...props}>
					<Fab color="primary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollToTopButton>
			</Box>
		</Box>
	);
};

export default GeneralPage;
