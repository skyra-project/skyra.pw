import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import SettingsDrawerItems, { SettingsDrawerItemsProps } from './SettingsDrawerItems';
import { Drawer } from '@mui/material';

interface MobileSettingsDrawerProps extends SettingsDrawerItemsProps {
	mobileOpen: boolean;
}

const MobileSettingsDrawer: FC<MobileSettingsDrawerProps> = ({ guildData, guildId, mobileOpen, toggleSidebar, isLoading }) => (
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
		<SettingsDrawerItems guildData={guildData} guildId={guildId} isLoading={isLoading} toggleSidebar={toggleSidebar} />
	</Drawer>
);

export default memo(MobileSettingsDrawer);
