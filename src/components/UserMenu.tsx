import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grid';
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
import { displayAvatarURL, logOut, syncUser } from 'meta/util';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGlobal } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		popper: {
			marginTop: theme.spacing(1)
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
	const [user] = useGlobal('user');
	const [open, setOpen] = useState(false);
	const routeParams = useParams();
	const { pathname } = useLocation();

	const classes = useStyles();
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
		<Box component="div">
			<Button
				ref={anchorRef}
				aria-controls={open ? 'logout-popover' : undefined}
				aria-haspopup="true"
				color={Reflect.has(routeParams, 'guildID') && !pathname.includes('music') ? 'secondary' : 'primary'}
				variant="contained"
				onClick={handleToggle}
				classes={{ root: classes.button, containedSecondary: classes.transparantButton }}
			>
				<Avatar style={{ marginRight: 5, height: 40, width: 40 }} src={displayAvatarURL(user, { size: 128 })} alt="" />
				<ExpandMoreIcon />
			</Button>
			<Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="logout-popover" onKeyDown={handleListKeyDown}>
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
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Box>
	);
};
