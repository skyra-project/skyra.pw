import { setAuthenticated, useAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack, useDiscordPack } from '@contexts/DiscordPackContext';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from '@material-ui/icons/Eject';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SyncIcon from '@material-ui/icons/Sync';
import LazyAvatar from '@mui/LazyAvatar';
import Tooltip from '@mui/Tooltip';
import { displayAvatarURL } from '@utils/skyraUtils';
import { clearData, logOut, syncUser } from '@utils/util';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		popper: {
			marginTop: theme.spacing(1)
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

const UserMenu: FC = () => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();
	const anchorRef = useRef<HTMLButtonElement>(null);

	const authenticated = useAuthenticated();
	const pack = useDiscordPack();
	const writeAuthenticated = setAuthenticated();
	const setPack = mergeDiscordPack();

	const router = useRouter();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
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
		if (prevOpen.current && !open) {
			anchorRef.current?.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<Box component="div">
			<Tooltip title="Click to open the user menu" placement="bottom">
				<Button
					ref={anchorRef}
					aria-controls={open ? 'logout-popover' : undefined}
					aria-haspopup="true"
					color="primary"
					variant="contained"
					onClick={handleToggle}
					classes={{ root: classes.transparentButton }}
				>
					<LazyAvatar
						imgProps={{ height: 128, width: 128 }}
						style={{ marginRight: 5, height: 40, width: 40 }}
						src={displayAvatarURL(pack?.user, { size: 128 })}
						alt="U"
					/>
					<ExpandMoreIcon />
				</Button>
			</Tooltip>
			<Popper className={classes.popper} open={open} anchorEl={anchorRef.current} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="logout-popover" onKeyDown={handleListKeyDown}>
									<MenuItem
										component="a"
										onClick={async (...args: Parameters<typeof handleClose>) => {
											handleClose(...args);
											await logOut();
											clearData(setPack, writeAuthenticated, router.push);
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
											syncUser(authenticated, setPack, writeAuthenticated, router.push);
										}}
									>
										<ListItemIcon>
											<SyncIcon className={classes.syncLogo} />
										</ListItemIcon>
										<Typography variant="inherit">Resync user data</Typography>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Box>
	);
};

export default memo(UserMenu);
