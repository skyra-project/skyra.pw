import type { FlattenedGuild } from '#config/types/ApiData';
import UserMenu from '#layout/Navigation/UserMenu';
import { SettingsDrawerWidth } from '#utils/constants';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { FC, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			marginLeft: SettingsDrawerWidth,
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${SettingsDrawerWidth}px)`
			}
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none'
			}
		}
	})
);

interface SettingsNavBarProps {
	guildData: FlattenedGuild | undefined;
	toggleSidebar(): void;
}

const SettingsNavBar: FC<SettingsNavBarProps> = ({ guildData, toggleSidebar }) => {
	const classes = useStyles();

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				<IconButton color="primary" edge="start" onClick={toggleSidebar} className={classes.menuButton}>
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
};

export default memo(SettingsNavBar);
