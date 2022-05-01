import type { TransformedLoginData } from '@config/types/ApiData';
import UserMenu from '@layout/Navigation/UserMenu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Skeleton from '@mui/material/Skeleton';
import { SettingsDrawerWidth } from '@utils/constants';
import React, { FC, memo } from 'react';
import type { ValuesType } from 'utility-types';

const useStyles = makeStyles((theme) =>
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
	guildData: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>> | undefined;
	toggleSidebar(): void;
}

const SettingsNavBar: FC<SettingsNavBarProps> = ({ guildData, toggleSidebar }) => {
	const classes = useStyles();

	return (
		<AppBar position="fixed" className={classes.appBar} enableColorOnDark>
			<Toolbar>
				<IconButton color="primary" edge="start" onClick={toggleSidebar} className={classes.menuButton} size="large">
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
