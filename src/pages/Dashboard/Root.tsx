import {
	AppBar,
	Box,
	Button,
	Collapse,
	Divider,
	Drawer,
	Fade,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Slide,
	Toolbar,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EventIcon from '@material-ui/icons/EventNote';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CustomCommandsIcon from '@material-ui/icons/Extension';
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
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import GuildIcon from 'components/GuildIcon';
import UserMenu from 'components/UserMenu';
import deepMerge, { Options as DeepMergeOptions } from 'deepmerge';
import { FlattenedGuild } from 'meta/typings/ApiData';
import { GuildSettings, SettingsPageProps } from 'meta/typings/GuildSettings';
import { authedFetch, navigate, noOp } from 'meta/util';
import CustomCommandsPage from 'pages/Dashboard/CustomCommands';
import EventsPage from 'pages/Dashboard/EventsPage';
import FilterCapitalsPage from 'pages/Dashboard/Filter/Capitals';
import FilterLinksPage from 'pages/Dashboard/Filter/Links';
import FilterWordsPage from 'pages/Dashboard/Filter/Words';
import ModerationSettingsPage from 'pages/Dashboard/Moderation/Settings';
import SettingsPage from 'pages/Dashboard/SettingsPage';
import StarboardPage from 'pages/Dashboard/Starboard';
import { PropsWithChildren } from 'react';
import { Else, If, Then } from 'react-if';
import { useParams } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'reactn';
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
		breadcrumb: {
			color: theme.palette.primary.contrastText
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
	const [isUpdating, setIsUpdating] = useState(false);
	const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
	const [mobileOpen, setMobileOpen] = useState(false);

	const { guildID } = useParams();

	const syncGuildData = async () => {
		try {
			const [guildData, guildSettings] = (await Promise.all([
				authedFetch(`/guilds/${guildID}`),
				authedFetch(`/guilds/${guildID}/settings`)
			])) as [FlattenedGuild, GuildSettings];

			setGuildData(guildData);
			setGuildSettings(guildSettings);
		} catch {
			return navigate('/404');
		}
	};

	useEffect(() => {
		syncGuildData();
	}, []); // eslint-disable-line

	const submitChanges = async () => {
		setIsUpdating(true);

		const response = await authedFetch(`/guilds/${guildID}/settings`, {
			method: 'POST',
			body: JSON.stringify({
				// eslint-disable-next-line @typescript-eslint/camelcase
				guild_id: guildID,
				data: guildSettingsChanges
			})
		}).catch(() => {
			// TODO toast
			// Do nothing
		});

		if (!response || !response.newSettings || response.error) {
			// TODO toast
			return;
		}

		setGuildSettingsChanges(undefined);
		setGuildSettings(response.newSettings);
		setIsUpdating(false);
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
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
		guildData: guildData!,
		guildID,
		patchGuildData
	};

	const drawer = (
		<Fragment>
			<Box component="div" onClick={navigate(`/`)} className={classes.guildImage}>
				<SkyraLogo />
				<Typography variant="h5">Skyra</Typography>
			</Box>
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
					<ListItem onClick={closeSidebarOnMobile} disabled={!guildData} component={Link} to={`/guilds/${guildID}`} button>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItem>

					{/* ------------------------------- */}
					<ListItem disabled={!guildData} button onClick={() => handleSubMenu('moderation')}>
						<ListItemIcon>
							<GavelIcon />
						</ListItemIcon>
						<ListItemText primary="Moderation" />
						{openSubMenus.includes('moderation') ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openSubMenus.includes('moderation')} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/moderation/settings`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Moderation Settings" />
							</ListItem>
						</List>
					</Collapse>

					{/* ------------------------------- */}
					<ListItem disabled={!guildData} button onClick={() => handleSubMenu('filter')}>
						<ListItemIcon>
							<FilterListIcon />
						</ListItemIcon>
						<ListItemText primary="Filter" />
						{openSubMenus.includes('filter') ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openSubMenus.includes('filter')} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
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
								disabled={!guildData}
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
								disabled={!guildData}
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
								disabled={!guildData}
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
								disabled={!guildData}
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
								disabled={!guildData}
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
								disabled={!guildData}
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

					<ListItem onClick={closeSidebarOnMobile} disabled={!guildData} component={Link} to={`/guilds/${guildID}/events`} button>
						<ListItemIcon>
							<EventIcon />
						</ListItemIcon>
						<ListItemText primary="Events" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData}
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
						disabled={!guildData}
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

					<ListItem onClick={closeSidebarOnMobile} disabled={!guildData} component={Link} to={`/guilds/${guildID}/roles`} button>
						<ListItemIcon>
							<RolesIcon />
						</ListItemIcon>
						<ListItemText primary="Roles" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData}
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
						disabled={!guildData}
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
						disabled={!guildData}
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

					<ListItem onClick={closeSidebarOnMobile} component={Link} to={`/music/${guildID}`} button>
						<ListItemIcon>
							<MusicIcon />
						</ListItemIcon>
						<ListItemText primary="Music" />
					</ListItem>
				</List>
			</Box>
		</Fragment>
	);

	return (
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
				{guildData ? (
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
							disabled={isUpdating}
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
							disabled={isUpdating}
							onClick={submitChanges}
							color="primary"
							variant="contained"
							size={isOnMobile ? 'small' : 'large'}
						>
							<SaveIconIcon className={classes.saveIcon} />
							Reset
						</Button>
					</Box>
				</Slide>
			</Box>
		</Box>
	);
};

export default RootComponent;
