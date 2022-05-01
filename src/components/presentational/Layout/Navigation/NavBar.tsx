import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
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
			<AppBar position="fixed" enableColorOnDark>
				<Toolbar>
					<Hidden mdUp>
						<MobileNavMenu />
					</Hidden>

					<SkyraLogoButton />

					<Hidden mdDown>
						<DesktopMenuItems loading={loading} />
					</Hidden>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default memo(NavBar);
