import mergeSeoProps from '@config/SEO/MergeSeoProps';
import type { TransformedLoginData } from '@config/types/ApiData';
import type { GuildSettings } from '@config/types/GuildSettings';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import { Grow, useMediaQuery } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ErrorAlert from '@presentational/Alerts/Error';
import { objectToTuples } from '@sapphire/utilities';
import { FetchMethods, SettingsDrawerWidth } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { apiFetch, navigate } from '@utils/util';
import { NextSeo } from 'next-seo';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { When } from 'react-if';
import type { ValuesType } from 'utility-types';
import DesktopSettingsDrawer from './Navigation/DesktopSettingsDrawer';
import MobileSettingsDrawer from './Navigation/MobileSettingsDrawer';
import SettingsNavBar from './Navigation/SettingsNavBar';
import SubmitResetButtons from './Navigation/SubmitResetButtons';

interface DashboardLayoutProps {
	guildId: string;
}

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
		}
	})
);

const DashboardLayout: FC<DashboardLayoutProps> = ({ guildId, children }) => {
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles();
	const { guildData, setGuildData } = useGuildDataContext();
	const { guildSettings, setGuildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	const [isLoading, setIsLoading] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [hasError, setHasError] = useState(false);

	const syncGuildData = useCallback(async () => {
		setIsLoading(true);
		try {
			const [guildData, guildSettings] = await Promise.all([
				apiFetch<ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>>(`/guilds/${guildId}`),
				apiFetch<GuildSettings>(`/guilds/${guildId}/settings`)
			]);

			setGuildData(guildData);
			setGuildSettings(guildSettings);
		} catch (err) {
			navigate('/404')();
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		void syncGuildData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submitChanges = async () => {
		try {
			setIsLoading(true);

			const response = await apiFetch<GuildSettings | [string] | { error: string }>(`/guilds/${guildId}/settings`, {
				method: FetchMethods.Patch,
				body: JSON.stringify({
					guild_id: guildId,
					data: objectToTuples(guildSettingsChanges as any)
				})
			});

			if (!response || Array.isArray(response) || 'error' in response || Object.keys(response).length === 0) {
				setHasError(true);
				setTimeout(() => setIsLoading(false), Time.Second);
			} else {
				setGuildSettingsChanges(undefined);
				setGuildSettings(response);
				setIsLoading(false);
			}
		} catch {
			setHasError(true);
			setTimeout(() => setIsLoading(false), Time.Second);
		}
	};

	const toggleSidebar = () => setMobileOpen(!mobileOpen);

	const readyToRender =
		!isLoading &&
		guildData !== undefined &&
		guildSettings !== undefined &&
		Object.keys(guildData).length !== 0 &&
		Object.keys(guildSettings).length !== 0;

	return (
		<>
			<NextSeo
				{...mergeSeoProps({
					title: `${guildData?.name ?? 'Guild'} Settings`
				})}
			/>
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
					<When condition={readyToRender}>{children}</When>
					<Grow in={Object.keys(guildSettingsChanges ?? {}).length > 0} unmountOnExit mountOnEnter>
						<SubmitResetButtons isLoading={isLoading} isOnMobile={isOnMobile} submitChanges={submitChanges} />
					</Grow>
				</Box>
			</Box>
		</>
	);
};

export default DashboardLayout;
