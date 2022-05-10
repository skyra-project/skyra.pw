import type { TransformedLoginData } from '@config/types/ApiData';
import UserMenu from '@layout/Navigation/UserMenu';
import MenuIcon from '@mui/icons-material/Menu';
import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import type { ValuesType } from 'utility-types';

import { AppBar, Box, IconButton, Skeleton, Toolbar, Typography } from '@mui/material';

interface SettingsNavBarProps {
	guildData: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>> | undefined;
	toggleSidebar(): void;
}

const SettingsNavBar: FC<SettingsNavBarProps> = ({ guildData, toggleSidebar }) => (
	<AppBar
		position="fixed"
		enableColorOnDark
		sx={{
			ml: SettingsDrawerWidth,
			width: {
				sm: `calc(100% - ${SettingsDrawerWidth}px)`
			}
		}}
	>
		<Toolbar>
			<IconButton
				color="primary"
				edge="start"
				onClick={toggleSidebar}
				size="large"
				sx={{
					mr: 2,
					display: {
						sm: 'none'
					}
				}}
			>
				<MenuIcon color="secondary" />
			</IconButton>

			<Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
				{guildData ? (
					<Typography component="h1" data-premid="server-title">
						{guildData.name}
					</Typography>
				) : (
					<Skeleton variant="text" width={100} height={14} />
				)}
				<UserMenu />
			</Box>
		</Toolbar>
	</AppBar>
);

export default memo(SettingsNavBar);
