import type { TransformedLoginData } from '@config/types/ApiData';
import type { GuildSettings } from '@config/types/GuildSettings';
import { setAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack } from '@contexts/DiscordPackContext';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import { Box, Grid, Grow, Hidden } from '@mui/material';
import ErrorAlert from '@presentational/Alerts/Error';
import Loading from '@presentational/Loading';
import { objectToTuples } from '@sapphire/utilities';
import { FetchMethods, SettingsDrawerWidth } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { apiFetch, clearData } from '@utils/util';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, type FC, type ReactNode } from 'react';
import type { ValuesType } from 'utility-types';
import DesktopSettingsDrawer from './Navigation/DesktopSettingsDrawer';
import MobileSettingsDrawer from './Navigation/MobileSettingsDrawer';
import SettingsNavBar from './Navigation/SettingsNavBar';
import SubmitResetButtons from './Navigation/SubmitResetButtons';

interface DashboardLayoutProps {
	guildId: string;
	children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ guildId, children }) => {
	const { guildData, setGuildData } = useGuildDataContext();
	const { guildSettings, setGuildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();
	const writeAuthenticated = setAuthenticated();
	const setPack = mergeDiscordPack();

	const [isLoading, setIsLoading] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [hasError, setHasError] = useState(false);
	const router = useRouter();

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
			if ((err as any)?.status === 401) {
				clearData(setPack, writeAuthenticated, router.push);
			} else {
				void router.push('/404');
			}
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
		} catch (error) {
			setHasError(true);
			setTimeout(() => setIsLoading(false), Time.Second);

			if ((error as any)?.status === 401) {
				clearData(setPack, writeAuthenticated, router.push);
			}
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
			<NextSeo title={`${guildData?.name ?? 'Guild'} Settings`} />
			<Loading loading={isLoading} />
			<ErrorAlert
				open={hasError}
				setOpen={setHasError}
				errorText="An error occurred getting data from Skyra's server."
				errorSubText={
					<Box component="span">
						Maybe try again later, or join{' '}
						<Box
							component="a"
							sx={{
								color: 'primary.contrastText',
								fontWeight: 'bolder'
							}}
							href="https://join.skyra.pw"
						>
							the support server
						</Box>{' '}
						and ask for support.
					</Box>
				}
			/>
			<Box display="flex" height="100vh">
				<SettingsNavBar guildData={guildData} toggleSidebar={toggleSidebar} />
				<Box
					component="nav"
					sx={{
						width: {
							sm: SettingsDrawerWidth,
							flexShrink: 0
						}
					}}
				>
					<Hidden smUp>
						<MobileSettingsDrawer
							mobileOpen={mobileOpen}
							guildData={guildData}
							guildId={guildId}
							isLoading={isLoading}
							toggleSidebar={toggleSidebar}
						/>
					</Hidden>
					<Hidden smDown>
						<DesktopSettingsDrawer guildData={guildData} guildId={guildId} isLoading={isLoading} toggleSidebar={toggleSidebar} />
					</Hidden>
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						bgcolor: 'secondary.dark',
						color: 'secondary.contrastText',
						display: 'flex',
						p: 4,
						mt: {
							md: '64px',
							xs: '56px'
						},
						flexDirection: 'column',
						overflowY: 'scroll'
					}}
				>
					{readyToRender && <>{children}</>}
					<Grow in={Object.keys(guildSettingsChanges ?? {}).length > 0} unmountOnExit mountOnEnter>
						<Grid
							container
							direction="row"
							justifyContent="flex-end"
							alignItems="flex-end"
							spacing={2}
							sx={{
								position: 'fixed',
								bottom: 30,
								right: 30
							}}
						>
							<SubmitResetButtons isLoading={isLoading} submitChanges={submitChanges} />
						</Grid>
					</Grow>
				</Box>
			</Box>
		</>
	);
};

export default DashboardLayout;
