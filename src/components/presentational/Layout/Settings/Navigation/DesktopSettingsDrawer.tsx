import Drawer from '@mui/material/Drawer';
import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import SettingsDrawerItems, { SettingsDrawerItemsProps } from './SettingsDrawerItems';

const DesktopSettingsDrawer: FC<SettingsDrawerItemsProps> = ({ guildData, guildId, isOnMobile, toggleSidebar, isLoading }) => (
	<Drawer
		sx={{
			'& .MuiDrawer-paper': {
				width: SettingsDrawerWidth,
				bgcolor: 'secondary.main',
				color: 'primary.contrastText'
			}
		}}
		variant="permanent"
		open
	>
		<SettingsDrawerItems guildData={guildData} guildId={guildId} isLoading={isLoading} isOnMobile={isOnMobile} toggleSidebar={toggleSidebar} />
	</Drawer>
);

export default memo(DesktopSettingsDrawer);
