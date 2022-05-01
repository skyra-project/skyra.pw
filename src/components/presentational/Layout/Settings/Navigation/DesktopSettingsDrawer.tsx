import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import SettingsDrawerItems, { SettingsDrawerItemsProps } from './SettingsDrawerItems';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawerPaper: {
			width: SettingsDrawerWidth,
			background: theme.palette.secondary.main,
			color: theme.palette.primary.contrastText
		}
	})
);

const DesktopSettingsDrawer: FC<SettingsDrawerItemsProps> = ({ guildData, guildId, isOnMobile, toggleSidebar, isLoading }) => {
	const classes = useStyles();

	return (
		<Drawer
			classes={{
				paper: classes.drawerPaper
			}}
			variant="permanent"
			open
		>
			<SettingsDrawerItems
				guildData={guildData}
				guildId={guildId}
				isLoading={isLoading}
				isOnMobile={isOnMobile}
				toggleSidebar={toggleSidebar}
			/>
		</Drawer>
	);
};

export default memo(DesktopSettingsDrawer);
