import CookieIcon from '#assets/CookieIcon';
import { useAuthenticated } from '#contexts/AuthenticationContext';
import UserMenu from '#layout/Navigation/UserMenu';
import Tooltip from '#mui/Tooltip';
import { CookieConsentContext } from '#presentational/CookieConsent/ContextProvider';
import MenuItemLink from '#routing/MenuItemLink';
import { oauthURL } from '#utils/constants';
import { navigate } from '#utils/util';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
import CommandsIcon from '@material-ui/icons/Extension';
import DiscordChatIcon from '@material-ui/icons/Forum';
import GavelIcon from '@material-ui/icons/Gavel';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import LoginIcon from '@material-ui/icons/VpnKey';
import { useRouter } from 'next/router';
import React, { FC, memo, useContext, useEffect, useRef, useState } from 'react';
import { When } from 'react-if';

export interface DesktopMenuItemsProps {
	loading?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
		}
	})
);

const DesktopMenuItems: FC<DesktopMenuItemsProps> = ({ loading = false }) => {
	const classes = useStyles();

	const anchorRef = useRef<HTMLButtonElement>(null);
	const [popperMenuIsOpen, setPopperMenuOpen] = useState(false);
	const { allowsCookies, dispatch } = useContext(CookieConsentContext);
	const router = useRouter();

	const authenticated = useAuthenticated();

	const togglePopperMenu = () => {
		setPopperMenuOpen((prevOpen) => !prevOpen);
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
		if (popperMenuPrevOpen.current && !popperMenuIsOpen) {
			anchorRef.current?.focus();
		}

		popperMenuPrevOpen.current = popperMenuIsOpen;
	}, [popperMenuIsOpen]);

	return (
		<>
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
							onClick={navigate(oauthURL.toString(), true)}
							startIcon={<LoginIcon />}
							disabled={!allowsCookies}
						>
							<Typography variant="body2" color="textPrimary">
								Login
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
			<Popper className={classes.popper} open={popperMenuIsOpen} anchorEl={anchorRef.current} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={closePopperMenu}>
								<MenuList autoFocusItem={popperMenuIsOpen} id="menu-popover">
									{router.pathname !== '/' && (
										<Tooltip title="Click to go back to the home page" placement="left">
											<MenuItemLink href="/" Icon={<HomeIcon />} text="Go back home" />
										</Tooltip>
									)}
									<Tooltip title="Click to view Skyra's commands" placement="left">
										<MenuItemLink href="/commands" Icon={<CommandsIcon />} text="Commands" />
									</Tooltip>
									<Tooltip title="Click to read how we handle your data" placement="left">
										<MenuItemLink href="/privacy" Icon={<GavelIcon />} text="Privacy Policy" />
									</Tooltip>
									{allowsCookies !== null && (
										<Tooltip title="Click to update whether we can store cookies" placement="left">
											<MenuItem
												onClick={(event) => {
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
		</>
	);
};

export default memo(DesktopMenuItems);
