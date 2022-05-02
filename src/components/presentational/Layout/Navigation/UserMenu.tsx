import { setAuthenticated, useAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack, useDiscordPack } from '@contexts/DiscordPackContext';
import LazyAvatar from '@material/LazyAvatar';
import Tooltip from '@material/Tooltip';
import LogoutIcon from '@mui/icons-material/Eject';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import { displayAvatarURL } from '@utils/skyraUtils';
import { clearData, logOut, syncUser } from '@utils/util';
import { useRouter } from 'next/router';
import React, { FC, memo, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import SpinningSyncIcon from './SpinningSyncIcon';

const UserMenu: FC = () => {
	const [open, setOpen] = useState(false);

	const anchorRef = useRef<HTMLButtonElement>(null);

	const authenticated = useAuthenticated();
	const pack = useDiscordPack();
	const writeAuthenticated = setAuthenticated();
	const setPack = mergeDiscordPack();

	const router = useRouter();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: MouseEvent | TouchEvent | ReactMouseEvent<HTMLLIElement | HTMLAnchorElement, MouseEvent>) => {
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
					sx={{
						background: 'transparent',
						boxShadow: 'none',
						'&:hover': {
							bgcolor: 'primary.dark',
							boxShadow: (theme) => theme.shadows[1]
						}
					}}
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
			<Popper sx={{ mt: 1 }} open={open} anchorEl={anchorRef.current} transition disablePortal>
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
											<SpinningSyncIcon />
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
