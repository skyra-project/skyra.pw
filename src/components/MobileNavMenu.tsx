import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import InviteIcon from '@material-ui/icons/Add';
import LogoutIcon from '@material-ui/icons/Eject';
import CommandsIcon from '@material-ui/icons/Extension';
import DiscordChatIcon from '@material-ui/icons/Forum';
import MenuIcon from '@material-ui/icons/Menu';
import SyncIcon from '@material-ui/icons/Sync';
import LoginIcon from '@material-ui/icons/VpnKey';
import { oauthURL } from 'lib/util/constants';
import { displayAvatarURL } from 'lib/util/skyraUtils';
import { logOut, navigate, syncUser } from 'lib/util/util';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { useGlobal } from 'reactn';
import { CookieConsentContext } from './CookieConsent/ContextProvider';
import { ReactComponent as CookieIcon } from './CookieIcon.svg';
import LazyAvatar from './LazyAvatar';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2)
		},
		popper: {
			marginTop: theme.spacing(1),
			zIndex: theme.zIndex.drawer + 1
		},
		button: {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0
		},
		transparantButton: {
			background: 'transparent',
			boxShadow: 'none',
			'&:hover': {
				background: theme.palette.primary.dark,
				boxShadow: theme.shadows[1]
			}
		},
		syncLogo: {
			'&:hover': {
				animation: `$syncLogoSpin 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1)`
			}
		},
		'@keyframes syncLogoSpin': {
			'0%': {
				transform: 'rotate(0deg)'
			},
			'100%': {
				transform: 'rotate(-360deg)'
			}
		}
	})
);

export default () => {
	const classes = useStyles();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [pack] = useGlobal('pack');
	const [authenticated] = useGlobal('authenticated');
	const [popperMenuIsOpen, setPopperMenuOpen] = useState(false);
	const { allowsCookies, dispatch } = useContext(CookieConsentContext);

	const togglePopperMenu = () => {
		setPopperMenuOpen(prevOpen => !prevOpen);
	};

	const closePopperMenu = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setPopperMenuOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setPopperMenuOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const popperMenuPrevOpen = useRef(popperMenuIsOpen);

	useEffect(() => {
		if (popperMenuPrevOpen.current === true && popperMenuIsOpen === false) {
			anchorRef.current?.focus();
		}

		popperMenuPrevOpen.current = popperMenuIsOpen;
	}, [popperMenuIsOpen]);

	return (
		<>
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
				<If condition={authenticated}>
					<Then>
						<LazyAvatar src={displayAvatarURL(pack?.user, { size: 32 })} imgProps={{ height: 32, width: 32 }} alt="U" />
					</Then>
					<Else>
						<MenuIcon />
					</Else>
				</If>
			</IconButton>
			<Popper
				className={classes.popper}
				open={popperMenuIsOpen}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={closePopperMenu}>
								<MenuList autoFocusItem={popperMenuIsOpen} id="menu-popover" onKeyDown={handleListKeyDown}>
									<If condition={authenticated}>
										<Then>
											<MenuItem
												component="a"
												onClick={(...args: Parameters<typeof closePopperMenu>) => {
													closePopperMenu(...args);
													logOut();
												}}
											>
												<ListItemIcon>
													<LogoutIcon />
												</ListItemIcon>
												<Typography variant="inherit">Logout</Typography>
											</MenuItem>
											<MenuItem
												onClick={(...args: Parameters<typeof closePopperMenu>) => {
													closePopperMenu(...args);
													syncUser();
												}}
											>
												<ListItemIcon>
													<SyncIcon className={classes.syncLogo} />
												</ListItemIcon>
												<Typography variant="inherit">Resync</Typography>
											</MenuItem>
										</Then>
										<Else>
											<MenuItem disabled={!allowsCookies} onClick={navigate(oauthURL.toString())}>
												<ListItemIcon>
													<LoginIcon />
												</ListItemIcon>
												<Typography variant="inherit">Log In</Typography>
											</MenuItem>
										</Else>
									</If>
									<MenuItem onClick={navigate('/commands')}>
										<ListItemIcon>
											<CommandsIcon />
										</ListItemIcon>
										<Typography variant="inherit">Commands</Typography>
									</MenuItem>
									<MenuItem onClick={navigate('https://invite.skyra.pw')}>
										<ListItemIcon>
											<InviteIcon />
										</ListItemIcon>
										<Typography variant="inherit">Add Skyra to server</Typography>
									</MenuItem>
									<MenuItem onClick={navigate('https://join.skyra.pw')}>
										<ListItemIcon>
											<DiscordChatIcon />
										</ListItemIcon>
										<Typography variant="inherit">Join our Discord</Typography>
									</MenuItem>
									{allowsCookies !== null && (
										<MenuItem
											onClick={event => {
												closePopperMenu(event);
												return dispatch(null);
											}}
										>
											<ListItemIcon>
												<CookieIcon />
											</ListItemIcon>
											<Typography variant="inherit">Update cookie consent</Typography>
										</MenuItem>
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};
