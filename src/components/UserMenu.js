import React, { Fragment, useGlobal } from 'reactn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Avatar, Menu, MenuItem } from '@material-ui/core';

import { logOut, displayAvatarURL } from 'meta/util';

const UserMenu = () => {
	const [user] = useGlobal('user');
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Fragment>
			<Button color="inherit" onClick={handleClick}>
				<Avatar style={{ marginRight: 5, height: 40, width: 40 }} src={displayAvatarURL(user, { size: 128 })} alt="" />
				<ExpandMoreIcon />
			</Button>
			<Menu style={{ marginTop: 25 }} onClose={handleClose} anchorEl={anchorEl} open={Boolean(anchorEl)} onClick={handleClose}>
				<MenuItem component="a" onClick={logOut}>
					Logout
				</MenuItem>
			</Menu>
		</Fragment>
	);
};

export default UserMenu;
