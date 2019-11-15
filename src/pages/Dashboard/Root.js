import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { withStyles } from '@material-ui/styles';
import {
	Toolbar,
	ListItem,
	ListItemIcon,
	ListItemText,
	List,
	IconButton,
	Hidden,
	Drawer,
	Divider,
	AppBar,
	Typography,
	Breadcrumbs,
	Link as MaterialLink,
	CircularProgress,
	Button,
	Collapse,
	Slide
} from '@material-ui/core';
import deepMerge from 'deepmerge';

import Settings from '@material-ui/icons/Settings';
import Subject from '@material-ui/icons/Subject';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Gavel from '@material-ui/icons/Gavel';

import AuthenticatedRoute from 'components/AuthenticatedRoute';
import SettingsPage from 'pages/Dashboard/SettingsPage';
import LogsPage from 'pages/Dashboard/LogsPage';
import ModerationIndexPage from 'pages/Dashboard/Moderation/IndexPage';
import ModerationFilterPage from 'pages/Dashboard/Moderation/FilterPage';
import { authedFetch, navigate, toTitleCase } from 'meta/util';
import SkyraLogo from 'assets/skyraLogo';

// Overwrite arrays when merging
const mergeOptions = {
	arrayMerge: (destinationArray, sourceArray, options) => sourceArray
};

const drawerWidth = 240;

const ServerHeader = styled.div`
	display: flex;

	justify-content: space-between;
	align-items: center;
	align-content: center;
	padding: 14px 20px;

	.server-icon {
		border-radius: 50%;
		height: 40px;
	}
`;

const styles = theme => ({
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
		background: theme.palette.primary.main,
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
		minHeight: '100%',
		color: theme.palette.secondary.contrastText,
		display: 'flex',
		padding: theme.spacing(4),
		paddingTop: theme.spacing(4) + 64,
		flexDirection: 'column',
		overflowY: 'scroll'
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
	}
});

class Root extends Component {
	state = {
		mobileOpen: false,
		guildData: null,
		guildSettings: {},
		guildSettingsChanges: {},
		isUpdating: false,
		/* Which nested list menus in the sidebar are open */
		openSubMenus: []
	};

	componentDidMount() {
		this.syncGuildData();
	}

	syncGuildData = async () => {
		const { guildID } = this.props.match.params;
		const [guildData, guildSettings] = await Promise.all([
			authedFetch(`/guilds/${guildID}`),
			authedFetch(`/guilds/${guildID}/settings`)
		]);
		this.setState({ guildData, guildSettings });
	};

	submitChanges = async () => {
		this.setState({ isUpdating: true });

		const { guildID } = this.props.match.params;
		const response = await authedFetch(`/guilds/${guildID}/settings`, {
			method: 'POST',
			body: {
				guild_id: guildID,
				data: this.state.guildSettingsChanges
			}
		}).catch(err => {
			console.error(err);
		});

		if (!response || !response.newSettings || response.error) {
			console.log(response);
			return;
		}

		this.setState({
			guildSettingsChanges: {},
			guildSettings: response.newSettings,
			isUpdating: false
		});
	};

	patchGuildData = changes => {
		this.setState({ guildSettingsChanges: deepMerge(this.state.guildSettingsChanges, changes, mergeOptions) });
	};

	toggleSidebar = () => this.setState({ mobileOpen: !this.state.mobileOpen });

	handleSubMenu(menuName) {
		const { openSubMenus } = this.state;
		if (openSubMenus.includes(menuName)) {
			this.setState({ openSubMenus: openSubMenus.filter(item => item !== menuName) });
		} else {
			this.setState({ openSubMenus: [...openSubMenus, menuName] });
		}
	}

	render() {
		const { container, classes } = this.props;
		// The guildID and optional pageName in the URL. e.g. /guilds/228822415189344257/settings
		const { guildID, pageName } = this.props.match.params;
		const { mobileOpen, guildData, guildSettings, guildSettingsChanges, isUpdating, openSubMenus } = this.state;

		if (!guildData) return <p>Loading</p>;

		const componentProps = {
			guildSettings: deepMerge(guildSettings, guildSettingsChanges, mergeOptions),
			guildData,
			guildID,
			patchGuildData: this.patchGuildData
		};

		const drawer = (
			<div>
				<div onClick={navigate(`/`)} className={classes.guildImage}>
					<SkyraLogo />
					<Typography variant="h5">Skyra</Typography>
				</div>
				<Divider />

				<ServerHeader>
					<img
						alt="Server Icon"
						className="server-icon"
						src={`https://cdn.discordapp.com/icons/${guildID}/${guildData.icon}?size=512`}
					/>
					<Typography variant="body1">{guildData.name}</Typography>
				</ServerHeader>
				<List>
					<ListItem component={Link} to={`/guilds/${guildID}/settings`} button>
						<ListItemIcon>
							<Settings />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItem>

					{/* ------------------------------- */}
					<ListItem button onClick={() => this.handleSubMenu('moderation')}>
						<ListItemIcon>
							<Gavel />
						</ListItemIcon>
						<ListItemText primary="Moderation" />
						{openSubMenus.includes('moderation') ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openSubMenus.includes('moderation')} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem dense component={Link} to={`/guilds/${guildID}/moderation/filter`} button className={classes.nested}>
								<ListItemText primary="Filter" />
							</ListItem>
						</List>
					</Collapse>
					{/* ------------------------------- */}

					<ListItem component={Link} to={`/guilds/${guildID}/logs`} button>
						<ListItemIcon>
							<Subject />
						</ListItemIcon>
						<ListItemText primary="Message Logs" />
					</ListItem>
				</List>
			</div>
		);

		return (
			<div className={classes.root}>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton color="primary" edge="start" onClick={this.toggleSidebar} className={classes.menuButton}>
							<MenuIcon color="secondary" />
						</IconButton>
						<Breadcrumbs className={classes.breadcrumb}>
							<MaterialLink component={Link} color="inherit" to={`/guilds/${guildID}`}>
								{guildData.name}
							</MaterialLink>
							{!!pageName && (
								<MaterialLink component={Link} color="inherit" to={`/guilds/${guildID}/${pageName}`} onClick={() => ''}>
									{toTitleCase(pageName)}
								</MaterialLink>
							)}
						</Breadcrumbs>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer}>
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							open={mobileOpen}
							onClose={this.toggleSidebar}
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
					<Hidden xsDown implementation="css">
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
				</nav>
				<main className={classes.content}>
					{guildData ? (
						<Switch>
							<AuthenticatedRoute
								exact
								path="/guilds/:guildID"
								component={() => 'Index Page'}
								componentProps={{ ...componentProps }}
							/>
							<AuthenticatedRoute
								componentProps={{ ...componentProps }}
								path="/guilds/:guildID/settings"
								component={SettingsPage}
							/>
							<AuthenticatedRoute
								componentProps={{ ...componentProps }}
								path="/guilds/:guildID/moderation/filter"
								component={ModerationFilterPage}
							/>
							<AuthenticatedRoute
								componentProps={{ ...componentProps }}
								path="/guilds/:guildID/moderation"
								component={ModerationIndexPage}
							/>
							<AuthenticatedRoute componentProps={{ ...componentProps }} path="/guilds/:guildID/logs" component={LogsPage} />
						</Switch>
					) : (
						<CircularProgress className={classes.progress} />
					)}
					<Slide direction="up" in={Object.keys(guildSettingsChanges).length > 0} mountOnEnter unmountOnExit>
						<div className={classes.fabContainer}>
							<Button
								disabled={isUpdating}
								onClick={() => this.setState({ guildSettingsChanges: {} })}
								color="secondary"
								variant="contained"
								size="small"
							>
								<DeleteIcon className={classes.saveIcon} />
								Reset
							</Button>
							<Button disabled={isUpdating} onClick={this.submitChanges} color="primary" variant="contained">
								<SaveIcon className={classes.saveIcon} />
								Save Changes
							</Button>
						</div>
					</Slide>
				</main>
			</div>
		);
	}
}

export default withStyles(styles)(Root);
