import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FC, memo } from 'react';
import DesktopMenuItems from './DesktopMenuItems';
import MobileNavMenu from './MobileNavMenu';
import SkyraLogoButton from './SkyraLogoButton';

export interface NavBarProps {
	loading?: boolean;
}

const NavBar: FC<NavBarProps> = ({ loading = false }) => {
	return (
		<Box component="nav">
			<AppBar position="fixed">
				<Toolbar>
					<Hidden mdUp>
						<MobileNavMenu />
					</Hidden>

					<SkyraLogoButton />

					<Hidden smDown>
						<DesktopMenuItems loading={loading} />
					</Hidden>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default memo(NavBar);
