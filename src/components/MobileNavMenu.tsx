import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
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
import { logOut, navigate, syncUser } from 'lib/util/util';
import React, { useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { useGlobal } from 'reactn';
import { displayAvatarURL } from 'lib/util/skyraUtils';

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
	const [user] = useGlobal('user');
	const [authenticated] = useGlobal('authenticated');
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);

	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current?.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<>
			<IconButton
				ref={anchorRef}
				edge="start"
				aria-controls={open ? 'menu-popover' : undefined}
				aria-haspopup="true"
				className={classes.menuButton}
				color="inherit"
				aria-label="menu"
				onClick={handleToggle}
			>
				<If condition={authenticated}>
					<Then>
						<Avatar src={displayAvatarURL(user, { size: 32 })} alt="U" />
					</Then>
					<Else>
						<MenuIcon />
					</Else>
				</If>
			</IconButton>
			<Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="menu-popover" onKeyDown={handleListKeyDown}>
									<If condition={authenticated}>
										<Then>
											<MenuItem
												component="a"
												onClick={(...args: Parameters<typeof handleClose>) => {
													handleClose(...args);
													logOut();
												}}
											>
												<ListItemIcon>
													<LogoutIcon />
												</ListItemIcon>
												<Typography variant="inherit">Logout</Typography>
											</MenuItem>
											<MenuItem
												onClick={(...args: Parameters<typeof handleClose>) => {
													handleClose(...args);
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
											<MenuItem onClick={navigate(oauthURL.toString())}>
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
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};
