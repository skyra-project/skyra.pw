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
	Slide
} from '@material-ui/core';
import { Menu as MenuIcon, Save as SaveIcon, DeleteForever as DeleteIcon } from '@material-ui/icons';
import deepMerge from 'deepmerge';

import AuthenticatedRoute from 'components/AuthenticatedRoute';
import SettingsPage from 'pages/Dashboard/SettingsPage';
import { authedFetch, navigate, toTitleCase } from 'meta/util';
import SkyraLogo from 'assets/skyraLogo';
import pages from './pages';
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
		padding: theme.spacing(2),
		background: theme.palette.secondary.dark,
		minHeight: '100%',
		paddingTop: theme.spacing(2) + 64,
		color: theme.palette.secondary.contrastText
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
	}
});

class Root extends Component {
	state = {
		mobileOpen: false,
		guildData: null,
		guildSettings: null,
		guildSettingsChanges: {},
		isUpdating: false
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
		this.setState({ guildSettingsChanges: deepMerge(this.state.guildSettingsChanges, changes) });
	};

	toggleSidebar = () => this.setState({ mobileOpen: !this.state.mobileOpen });

	render() {
		const { container, classes } = this.props;
		// The guildID and optional pageName in the URL. e.g. /guilds/228822415189344257/settings
		const { guildID, pageName } = this.props.match.params;
		const { mobileOpen, guildData, guildSettings, guildSettingsChanges, isUpdating } = this.state;

		if (!guildData) return <p>Loading</p>;

		const componentProps = {
			guildSettings: deepMerge(guildSettings, guildSettingsChanges),
			guildData,
			guildID,
			patchGuildData: this.patchGuildData
		};

		const drawer = (
			<div>
				<div onClick={navigate(`/guilds/${guildID}`)} className={classes.guildImage}>
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
					{pages.map(page => (
						<ListItem component={Link} to={`/guilds/${guildID}/${page.name}`} button key={page.name}>
							<ListItemIcon>
								<page.icon />
							</ListItemIcon>
							<ListItemText primary={toTitleCase(page.name)} />
						</ListItem>
					))}
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
								componentProps={componentProps}
							/>
							<AuthenticatedRoute
								componentProps={{ ...componentProps }}
								path="/guilds/:guildID/settings"
								component={SettingsPage}
							/>
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
