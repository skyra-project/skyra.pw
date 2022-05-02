import Drawer from '@mui/material/Drawer';
import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import SettingsDrawerItems, { SettingsDrawerItemsProps } from './SettingsDrawerItems';

interface MobileSettingsDrawerProps extends SettingsDrawerItemsProps {
	mobileOpen: boolean;
}

const MobileSettingsDrawer: FC<MobileSettingsDrawerProps> = ({ guildData, guildId, isOnMobile, mobileOpen, toggleSidebar, isLoading }) => (
	<Drawer
		variant="temporary"
		open={mobileOpen}
		onClose={toggleSidebar}
		sx={{
			'& 	.MuiDrawer-paper': {
				width: SettingsDrawerWidth,
				bgcolor: 'secondary.main',
				color: 'primary.contrastText'
			}
		}}
	>
		<SettingsDrawerItems guildData={guildData} guildId={guildId} isLoading={isLoading} isOnMobile={isOnMobile} toggleSidebar={toggleSidebar} />
	</Drawer>
);

export default memo(MobileSettingsDrawer);
