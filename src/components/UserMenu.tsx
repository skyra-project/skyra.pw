import { Avatar, Box, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RootState } from 'meta/typings/Reactn';
import { displayAvatarURL, logOut } from 'meta/util';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobal } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		popper: {
			marginTop: theme.spacing(1)
		},
		button: {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0
		}
	})
);

export default () => {
	const [{ user }] = useGlobal<RootState>();
	const [open, setOpen] = useState(false);
	const routeParams = useParams();

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
				color={Reflect.has(routeParams, 'guildID') ? 'secondary' : 'primary'}
				variant="contained"
				onClick={handleToggle}
				classes={{ root: classes.button }}
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
										Logout
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
