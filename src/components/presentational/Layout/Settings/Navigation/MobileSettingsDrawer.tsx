import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import SettingsDrawerItems, { SettingsDrawerItemsProps } from './SettingsDrawerItems';

interface MobileSettingsDrawerProps extends SettingsDrawerItemsProps {
	mobileOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawerPaper: {
			width: SettingsDrawerWidth,
			background: theme.palette.secondary.main,
			color: theme.palette.primary.contrastText
		}
	})
);

const MobileSettingsDrawer: FC<MobileSettingsDrawerProps> = ({ guildData, guildId, isOnMobile, mobileOpen, toggleSidebar, isLoading }) => {
	const classes = useStyles();

	return (
		<Drawer
			variant="temporary"
			open={mobileOpen}
			onClose={toggleSidebar}
			classes={{
				paper: classes.drawerPaper
			}}
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

export default memo(MobileSettingsDrawer);
