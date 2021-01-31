import CookieIcon from '@assets/CookieIcon';
import { setAuthenticated, useAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack, useDiscordPack } from '@contexts/DiscordPackContext';
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
import GavelIcon from '@material-ui/icons/Gavel';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import SyncIcon from '@material-ui/icons/Sync';
import LoginIcon from '@material-ui/icons/VpnKey';
import LazyAvatar from '@mui/LazyAvatar';
import { CookieConsentContext } from '@presentational/CookieConsent/ContextProvider';
import MenuItemLink from '@routing/MenuItemLink';
import { oauthURL } from '@utils/constants';
import { displayAvatarURL } from '@utils/skyraUtils';
import { logOut, syncUser } from '@utils/util';
import { useRouter } from 'next/router';
import React, { FC, memo, useContext, useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';

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
		transparentButton: {
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

const MobileNavMenu: FC = () => {
	const classes = useStyles();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [popperMenuIsOpen, setPopperMenuOpen] = useState(false);
	const { allowsCookies, dispatch } = useContext(CookieConsentContext);

	const authenticated = useAuthenticated();
	const pack = useDiscordPack();
	const writeAuthenticated = setAuthenticated();
	const setPack = mergeDiscordPack();

	const router = useRouter();

	const togglePopperMenu = () => {
		setPopperMenuOpen((prevOpen) => !prevOpen);
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
		if (popperMenuPrevOpen.current && !popperMenuIsOpen) {
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
			<Popper className={classes.popper} open={popperMenuIsOpen} anchorEl={anchorRef.current} transition disablePortal>
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
													logOut(setPack, writeAuthenticated, router.push);
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
													syncUser(authenticated, setPack, writeAuthenticated, router.push);
												}}
											>
												<ListItemIcon>
													<SyncIcon className={classes.syncLogo} />
												</ListItemIcon>
												<Typography variant="inherit">Resync user data</Typography>
											</MenuItem>
										</Then>
										<Else>
											<MenuItemLink
												menuItemDisabled={!allowsCookies}
												href={oauthURL.toString()}
												Icon={<LoginIcon />}
												text="Login"
												forceSameTab
											/>
										</Else>
									</If>
									{router.pathname !== '/' && <MenuItemLink href="/" Icon={<HomeIcon />} text="Go back home" />}
									<MenuItemLink href="/commands" Icon={<CommandsIcon />} text="Commands" />
									<MenuItemLink href="/privacy" Icon={<GavelIcon />} text="Privacy Policy" />
									<MenuItemLink href="https://invite.skyra.pw" Icon={<InviteIcon />} text="Add Skyra to server" />
									<MenuItemLink href="https://join.skyra.pw" Icon={<DiscordChatIcon />} text="Join our Discord" />

									{allowsCookies !== null && (
										<MenuItem
											onClick={(event) => {
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

export default memo(MobileNavMenu);
