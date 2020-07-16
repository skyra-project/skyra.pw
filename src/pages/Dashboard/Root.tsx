import { useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Fade from '@material-ui/core/Fade';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EventIcon from '@material-ui/icons/EventNote';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CustomCommandsIcon from '@material-ui/icons/Extension';
import FeedbackIcon from '@material-ui/icons/Feedback';
import FilterListIcon from '@material-ui/icons/FilterList';
import ChannelsIcon from '@material-ui/icons/Forum';
import GavelIcon from '@material-ui/icons/Gavel';
import RolesIcon from '@material-ui/icons/Group';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import MessagesIcon from '@material-ui/icons/Message';
import MusicIcon from '@material-ui/icons/MusicNote';
import SaveIconIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';
import Skeleton from '@material-ui/lab/Skeleton';
import SkyraLogo from 'assets/skyraLogo';
import ErrorAlert from 'components/Alerts/Error';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import GuildIcon from 'components/GuildIcon';
import Tooltip from 'components/Tooltip';
import UserMenu from 'components/UserMenu';
import deepMerge, { Options as DeepMergeOptions } from 'deepmerge';
import { FlattenedGuild } from 'lib/types/ApiData';
import { GuildSettings, SettingsPageProps } from 'lib/types/GuildSettings';
import { noOp, Time } from 'lib/util/skyraUtils';
import { apiFetch, navigate } from 'lib/util/util';
import CustomCommandsPage from 'pages/Dashboard/CustomCommands';
import EventsPage from 'pages/Dashboard/EventsPage';
import FilterCapitalsPage from 'pages/Dashboard/Filter/Capitals';
import FilterLinksPage from 'pages/Dashboard/Filter/Links';
import FilterWordsPage from 'pages/Dashboard/Filter/Words';
import SettingsPage from 'pages/Dashboard/GeneralSettingsPage';
import ModerationSettingsPage from 'pages/Dashboard/Moderation/Settings';
import StarboardPage from 'pages/Dashboard/Starboard';
import SuggestionsPage from 'pages/Dashboard/SuggestionsPage';
import React, { Fragment, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { useParams } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import { DeepPartial } from 'utility-types';
import ChannelsPage from './ChannelsPage';
import DisableCommandsPage from './DisableCommandsPage';
import InvitesFilterPage from './Filter/Invites';
import MessagesFilterPage from './Filter/Messages';
import NewLinesFilterPage from './Filter/NewLines';
import ReactionsFilterPage from './Filter/Reactions';
import MessagesPage from './MessagesPage';
import RolesPage from './RolesPage';

// Overwrite arrays when merging
const mergeOptions: DeepMergeOptions = {
	arrayMerge: (_, sourceArray) => sourceArray
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			height: '100vh'
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0
			}
		},
		appBar: {
			marginLeft: drawerWidth,
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`
			}
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none'
			}
		},
		toolbar: {
			...theme.mixins.toolbar,
			color: theme.palette.primary.contrastText
		},
		guildImage: {
			...theme.mixins.toolbar,
			padding: `0px ${theme.spacing(3)}px`,
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			'&:hover': {
				cursor: 'pointer'
			}
		},
		drawerPaper: {
			width: drawerWidth,
			background: theme.palette.secondary.main,
			color: theme.palette.primary.contrastText
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
		card: {
			background: theme.palette.secondary.main
		},
		fabContainer: {
			position: 'fixed',
			bottom: 30,
			right: 30,
			'& button': {
				marginLeft: 30
			}
		},
		saveIcon: {
			marginRight: theme.spacing(2)
		},
		nested: {
			paddingLeft: theme.spacing(4)
		},
		serverHeader: {
			paddingRight: theme.spacing(1),
			paddingLeft: theme.spacing(1),
			paddingTop: theme.spacing(1.5),
			paddingBottom: theme.spacing(1.5),
			display: 'flex',
			flexDirection: 'column',
			alignContent: 'center',
			alignItems: 'center',
			minHeight: 100
		},
		serverAvatar: {
			width: 60,
			height: 60,
			minHeight: 60,
			maxHeight: 60,
			minWidth: 60,
			maxWidth: 60
		},
		errorButton: {
			backgroundColor: theme.palette.error.main,
			'&:hover': {
				backgroundColor: theme.palette.error.dark
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

const RootComponent = (props: PropsWithChildren<any>) => {
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles(props);

	const [guildData, setGuildData] = useState<FlattenedGuild>();
	const [guildSettings, setGuildSettings] = useState<GuildSettings>();
	const [guildSettingsChanges, setGuildSettingsChanges] = useState<GuildSettings>();
	const [isLoading, setIsLoading] = useState(false);
	const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [hasError, setHasError] = useState(false);

	const { guildID } = useParams();

	const syncGuildData = useCallback(async () => {
		setIsLoading(true);
		try {
			const [guildData, guildSettings] = await Promise.all([
				apiFetch<FlattenedGuild>(`/guilds/${guildID}`),
				apiFetch<GuildSettings>(`/guilds/${guildID}/settings`)
			]);

			setGuildData(guildData);
			setGuildSettings(guildSettings);
		} catch (err) {
			navigate('/404')();
		} finally {
			setIsLoading(false);
		}
	}, [guildID]);

	useEffect(() => {
		syncGuildData();
	}, [syncGuildData]);

	const submitChanges = async () => {
		try {
			setIsLoading(true);

			const response = await apiFetch<{ newSettings: GuildSettings; error?: string }>(`/guilds/${guildID}/settings`, {
				method: 'POST',
				body: JSON.stringify({
					guild_id: guildID,
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
	const closeSidebarOnMobile = () => (isOnMobile ? toggleSidebar() : noOp());

	const handleSubMenu = (menuName: string) => {
		return openSubMenus.includes(menuName)
			? setOpenSubMenus(openSubMenus.filter(item => item !== menuName))
			: setOpenSubMenus([...openSubMenus, menuName]);
	};

	const { container } = props;

	const componentProps: SettingsPageProps = {
		guildSettings: deepMerge(guildSettings ?? {}, guildSettingsChanges ?? {}, mergeOptions),
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		guildData: guildData!,
		guildID,
		patchGuildData
	};

	const drawer = (
		<Fragment>
			<Tooltip title="Go back to homepage">
				<Box component="div" onClick={navigate(`/`)} className={classes.guildImage}>
					<SkyraLogo />
					<Typography variant="h5">Skyra</Typography>
				</Box>
			</Tooltip>
			<Divider />

			{/* --------------------- */}
			<Box className={classes.serverHeader}>
				<If condition={guildData !== null}>
					<Then>
						<Fragment>
							<GuildIcon guild={guildData} size={256} sizeClass={classes.serverAvatar} />
							<Typography variant="subtitle2" style={{ marginTop: 15 }} data-premid="server-title">
								{guildData?.name}
							</Typography>
						</Fragment>
					</Then>
					<Else>
						<Fragment>
							<Skeleton variant="circle" width={60} height={60} />
							<Skeleton variant="text" width={100} height={14} />
						</Fragment>
					</Else>
				</If>
			</Box>
			{/* --------------------- */}

			<Box component="div" role="presentation" onKeyDown={isOnMobile ? toggleSidebar : noOp}>
				<List style={{ overflowY: 'auto' }}>
					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}`}
						button
					>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="General Settings" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/moderation`}
						button
					>
						<ListItemIcon>
							<GavelIcon />
						</ListItemIcon>
						<ListItemText primary="Moderation" />
					</ListItem>

					{/* ------------------------------- */}
					<ListItem disabled={!guildData && !isLoading} button onClick={() => handleSubMenu('filter')}>
						<ListItemIcon>
							<FilterListIcon />
						</ListItemIcon>
						<ListItemText primary="Filters" />
						{openSubMenus.includes('filter') ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openSubMenus.includes('filter')} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData && !isLoading}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Words" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData && !isLoading}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/capitals`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Capitals" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData && !isLoading}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/invites`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Invites" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData && !isLoading}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/links`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Links" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData && !isLoading}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/messages`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Message Duplication" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData && !isLoading}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/newlines`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Line Spam" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData && !isLoading}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/reactions`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Reactions" />
							</ListItem>
						</List>
					</Collapse>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/events`}
						button
					>
						<ListItemIcon>
							<EventIcon />
						</ListItemIcon>
						<ListItemText primary="Events" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/channels`}
						button
					>
						<ListItemIcon>
							<ChannelsIcon />
						</ListItemIcon>
						<ListItemText primary="Channels" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/messages`}
						button
					>
						<ListItemIcon>
							<MessagesIcon />
						</ListItemIcon>
						<ListItemText primary="Messages" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/roles`}
						button
					>
						<ListItemIcon>
							<RolesIcon />
						</ListItemIcon>
						<ListItemText primary="Roles" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/disabled-commands`}
						button
					>
						<ListItemIcon>
							<InputIcon />
						</ListItemIcon>
						<ListItemText primary="Disable Commands" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/custom-commands`}
						button
					>
						<ListItemIcon>
							<CustomCommandsIcon />
						</ListItemIcon>
						<ListItemText primary="Custom Commands" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/starboard`}
						button
					>
						<ListItemIcon>
							<StarIcon />
						</ListItemIcon>
						<ListItemText primary="Starboard" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/guilds/${guildID}/suggestions`}
						button
					>
						<ListItemIcon>
							<FeedbackIcon />
						</ListItemIcon>
						<ListItemText primary="Suggestions" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						to={`/music/${guildID}`}
						button
					>
						<ListItemIcon>
							<MusicIcon />
						</ListItemIcon>
						<ListItemText primary="Music" />
					</ListItem>
				</List>
			</Box>
		</Fragment>
	);

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
				<Box component="nav" className={classes.drawer}>
					<Hidden smUp>
						<Drawer
							container={container}
							variant="temporary"
							open={mobileOpen}
							onClose={toggleSidebar}
							classes={{
								paper: classes.drawerPaper
							}}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown>
						<Drawer
							classes={{
								paper: classes.drawerPaper
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</Box>
				<Box component="main" className={classes.content}>
					{readyToRender ? (
						<Fade in={Boolean(guildData)}>
							<Box>
								<Switch>
									<AuthenticatedRoute
										exact
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/starboard"
										component={StarboardPage}
									/>
									<AuthenticatedRoute
										exact
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/filter"
										component={FilterWordsPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/filter/capitals"
										component={FilterCapitalsPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/filter/invites"
										component={InvitesFilterPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/filter/links"
										component={FilterLinksPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/filter/messages"
										component={MessagesFilterPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/filter/newlines"
										component={NewLinesFilterPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/filter/reactions"
										component={ReactionsFilterPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/moderation"
										component={ModerationSettingsPage}
									/>

									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/events"
										component={EventsPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/channels"
										component={ChannelsPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/roles"
										component={RolesPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/messages"
										component={MessagesPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/disabled-commands"
										component={DisableCommandsPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/custom-commands"
										component={CustomCommandsPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID/suggestions"
										component={SuggestionsPage}
									/>
									<AuthenticatedRoute
										componentProps={{ ...componentProps }}
										path="/guilds/:guildID"
										component={SettingsPage}
									/>
								</Switch>
							</Box>
						</Fade>
					) : null}
					<Slide direction="up" in={Object.keys(guildSettingsChanges ?? {}).length > 0} mountOnEnter unmountOnExit>
						<Box component="div" className={classes.fabContainer}>
							<Button
								disabled={isLoading}
								onClick={() => setGuildSettingsChanges(undefined)}
								color="secondary"
								classes={{ root: classes.errorButton }}
								variant="contained"
								size={isOnMobile ? 'small' : 'large'}
							>
								<DeleteIcon className={classes.saveIcon} />
								Reset
							</Button>
							<Button
								disabled={isLoading}
								onClick={submitChanges}
								color="primary"
								variant="contained"
								size={isOnMobile ? 'small' : 'large'}
							>
								<SaveIconIcon className={classes.saveIcon} />
								Save
							</Button>
						</Box>
					</Slide>
				</Box>
			</Box>
		</>
	);
};

export default RootComponent;
