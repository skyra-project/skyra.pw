import { useAuthenticated } from '@contexts/AuthenticationContext';
import UserMenu from '@layout/Navigation/UserMenu';
import Tooltip from '@material/Tooltip';
import InviteIcon from '@mui/icons-material/Add';
import CommandsIcon from '@mui/icons-material/Extension';
import DiscordChatIcon from '@mui/icons-material/Forum';
import GavelIcon from '@mui/icons-material/Gavel';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/VpnKey';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import MenuItemLink from '@routing/MenuItemLink';
import { oauthURL } from '@utils/constants';
import { navigate } from '@utils/util';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import { When } from 'react-if';

export interface DesktopMenuItemsProps {
	loading?: boolean;
}

const useStyles = makeStyles((theme) =>
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
	const router = useRouter();

	const authenticated = useAuthenticated();

	const togglePopperMenu = () => {
		setPopperMenuOpen((prevOpen) => !prevOpen);
	};

	const closePopperMenu = (event: MouseEvent | TouchEvent | ReactMouseEvent<HTMLAnchorElement | HTMLLIElement, MouseEvent>) => {
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
				<Tooltip title="Click to login and manage your servers" placement="bottom">
					<Box component="div">
						<Button
							color="primary"
							variant="contained"
							classes={{ root: classes.transparentButton }}
							onClick={navigate(oauthURL.toString(), true)}
							startIcon={<LoginIcon />}
						>
							<Typography variant="body2" color="textPrimary">
								Login
							</Typography>
						</Button>
					</Box>
				</Tooltip>
			</When>

			<Tooltip title="Open to view more pages and options">
				<IconButton
					ref={anchorRef}
					edge="start"
					aria-controls={popperMenuIsOpen ? 'menu-popover' : undefined}
					aria-haspopup="true"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
					onClick={togglePopperMenu}
					size="large"
				>
					<MenuIcon />
				</IconButton>
			</Tooltip>
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
