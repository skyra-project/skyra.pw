import { memo, type FC } from 'react';
import DesktopMenuItems from './DesktopMenuItems';
import MobileNavMenu from './MobileNavMenu';
import SkyraLogoButton from './SkyraLogoButton';

import { AppBar, Box, Hidden, Toolbar } from '@mui/material';

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
