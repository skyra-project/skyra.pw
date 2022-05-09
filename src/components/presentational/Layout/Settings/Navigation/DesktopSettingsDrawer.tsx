import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import SettingsDrawerItems, { SettingsDrawerItemsProps } from './SettingsDrawerItems';
import { Drawer } from '@mui/material';

const DesktopSettingsDrawer: FC<SettingsDrawerItemsProps> = ({ guildData, guildId, toggleSidebar, isLoading }) => (
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
		<SettingsDrawerItems guildData={guildData} guildId={guildId} isLoading={isLoading} toggleSidebar={toggleSidebar} />
	</Drawer>
);

export default memo(DesktopSettingsDrawer);
