import { FlattenedGuild } from '@config/types/ApiData';
import { GuildSettings, SettingsPageProps } from '@config/types/GuildSettings';
import { useMediaQuery } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorAlert from '@presentational/Alerts/Error';
import { SettingsDrawerWidth } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { apiFetch, navigate } from '@utils/util';
import deepMerge, { Options as DeepMergeOptions } from 'deepmerge';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { DeepPartial } from 'utility-types';
import DesktopSettingsDrawer from './Navigation/DesktopSettingsDrawer';
import MobileSettingsDrawer from './Navigation/MobileSettingsDrawer';
import SettingsNavBar from './Navigation/SettingsNavBar';
import SubmitResetButtons from './Navigation/SubmitResetButtons';

interface DashboardLayoutProps {
	guildId: string;
}

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			height: '100vh'
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: SettingsDrawerWidth,
				flexShrink: 0
			}
		},
		content: {
			flexGrow: 1,
			background: theme.palette.secondary.dark,
			color: theme.palette.secondary.contrastText,
			display: 'flex',
			padding: theme.spacing(4),
			marginTop: 64,
			flexDirection: 'column',
			overflowY: 'scroll',
			[theme.breakpoints.down('sm')]: {
				marginTop: 56
			}
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff'
		},
		link: {
			color: theme.palette.primary.contrastText,
			fontWeight: 'bolder'
		},
		toolbar: theme.mixins.toolbar
	})
);

const DashboardLayout: FC<DashboardLayoutProps> = ({ guildId, children }) => {
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles();

	const [guildData, setGuildData] = useState<FlattenedGuild>();
	const [guildSettings, setGuildSettings] = useState<GuildSettings>();
	const [guildSettingsChanges, setGuildSettingsChanges] = useState<GuildSettings>();
	const [isLoading, setIsLoading] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [hasError, setHasError] = useState(false);

	const syncGuildData = useCallback(async () => {
		setIsLoading(true);
		try {
			const [guildData, guildSettings] = await Promise.all([
				apiFetch<FlattenedGuild>(`/guilds/${guildId}`),
				apiFetch<GuildSettings>(`/guilds/${guildId}/settings`)
			]);

			setGuildData(guildData);
			setGuildSettings(guildSettings);
		} catch (err) {
			navigate('/404')();
		} finally {
			setIsLoading(false);
		}
	}, [guildId]);

	useEffect(() => {
		syncGuildData();
	}, [syncGuildData]);

	const submitChanges = async () => {
		try {
			setIsLoading(true);

			const response = await apiFetch<{ newSettings: GuildSettings; error?: string }>(`/guilds/${guildId}/settings`, {
				method: 'POST',
				body: JSON.stringify({
					guild_id: guildId,
					data: guildSettingsChanges
				})
			});

			if (!response || !response.newSettings || response.error) {
				setHasError(true);
				setTimeout(() => setIsLoading(false), Time.Second);
			} else {
				setGuildSettingsChanges(undefined);
				setGuildSettings(response.newSettings);
				setIsLoading(false);
			}
		} catch {
			setHasError(true);
			setTimeout(() => setIsLoading(false), Time.Second);
		}
	};

	const patchGuildData = (changes?: DeepPartial<GuildSettings>) => {
		setGuildSettingsChanges(
			deepMerge<GuildSettings, DeepPartial<GuildSettings>>(guildSettingsChanges ?? {}, changes ?? {}, mergeOptions)
		);
	};

	const toggleSidebar = () => setMobileOpen(!mobileOpen);

	const componentProps: SettingsPageProps = {
		guildSettings: deepMerge(guildSettings ?? {}, guildSettingsChanges ?? {}, mergeOptions),
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		guildData: guildData!,
		guildId,
		patchGuildData
	};

	const readyToRender =
		guildData !== undefined &&
		guildSettings !== undefined &&
		Object.keys(guildData).length !== 0 &&
		Object.keys(guildSettings).length !== 0;

	return (
		<>
			<Backdrop className={classes.backdrop} open={isLoading} unmountOnExit mountOnEnter>
				<CircularProgress color="inherit" />
			</Backdrop>
			<ErrorAlert
				open={hasError}
				setOpen={setHasError}
				errorText="An error occurred getting data from Skyra's server."
				errorSubText={
					<Box component="span">
						Maybe try again later, or join{' '}
						<a className={classes.link} href="https://join.skyra.pw">
							the support server
						</a>{' '}
						and ask for support.
					</Box>
				}
			/>
			<Box className={classes.root}>
				<SettingsNavBar guildData={guildData} toggleSidebar={toggleSidebar} />
				<Box component="nav" className={classes.drawer}>
					<Hidden smUp>
						<MobileSettingsDrawer
							mobileOpen={mobileOpen}
							guildData={guildData}
							guildId={guildId}
							isLoading={isLoading}
							isOnMobile={isOnMobile}
							toggleSidebar={toggleSidebar}
						/>
					</Hidden>
					<Hidden xsDown>
						<DesktopSettingsDrawer
							guildData={guildData}
							guildId={guildId}
							isLoading={isLoading}
							isOnMobile={isOnMobile}
							toggleSidebar={toggleSidebar}
						/>
					</Hidden>
				</Box>
				<Box component="main" className={classes.content}>
					<Box className={classes.toolbar} />
					<If condition={readyToRender}>
						<Then>
							{React.Children.map(children, child => {
								if (React.isValidElement(child)) {
									return React.cloneElement(child, componentProps);
								}
								return child;
							})}
						</Then>
						<Else>
							<Skeleton variant="rect" animation="wave" />
						</Else>
					</If>
					<Slide direction="up" in={Object.keys(guildSettingsChanges ?? {}).length > 0} mountOnEnter unmountOnExit>
						<SubmitResetButtons
							isLoading={isLoading}
							isOnMobile={isOnMobile}
							setGuildSettingsChanges={setGuildSettingsChanges}
							submitChanges={submitChanges}
						/>
					</Slide>
				</Box>
			</Box>
		</>
	);
};

export default DashboardLayout;
