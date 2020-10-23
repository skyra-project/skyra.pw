import SkyraLogo from '@assets/skyraLogo';
import { FlattenedGuild } from '@config/types/ApiData';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
import MessagesIcon from '@material-ui/icons/Message';
import MusicIcon from '@material-ui/icons/MusicNote';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';
import Skeleton from '@material-ui/lab/Skeleton';
import Tooltip from '@mui/Tooltip';
import GuildIcon from '@presentational/GuildIcon';
import Link from '@routing/Link';
import { noop } from '@sapphire/utilities';
import { navigate } from '@utils/util';
import React, { FC, Fragment, memo, useState } from 'react';
import { Else, If, Then } from 'react-if';

export interface SettingsDrawerItemsProps {
	guildData: FlattenedGuild | undefined;
	guildId: string;
	isOnMobile: boolean;
	isLoading: boolean;
	toggleSidebar(): void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
		}
	})
);

const SettingsDrawerItems: FC<SettingsDrawerItemsProps> = ({ guildData, guildId, isOnMobile, toggleSidebar, isLoading }) => {
	const classes = useStyles();
	const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

	const closeSidebarOnMobile = () => (isOnMobile ? toggleSidebar() : noop());

	const handleSubMenu = (menuName: string) => {
		return openSubMenus.includes(menuName)
			? setOpenSubMenus(openSubMenus.filter(item => item !== menuName))
			: setOpenSubMenus([...openSubMenus, menuName]);
	};

	return (
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

			<Box component="div" onKeyDown={isOnMobile ? toggleSidebar : noop}>
				<List style={{ overflowY: 'auto' }}>
					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData && !isLoading}
						component={Link}
						href={`/guilds/${guildId}`}
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
						href={`/guilds/${guildId}/moderation`}
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
								href={`/guilds/${guildId}/filter/words`}
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
								href={`/guilds/${guildId}/filter/capitals`}
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
								href={`/guilds/${guildId}/filter/invites`}
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
								href={`/guilds/${guildId}/filter/links`}
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
								href={`/guilds/${guildId}/filter/messages`}
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
								href={`/guilds/${guildId}/filter/newlines`}
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
								href={`/guilds/${guildId}/filter/reactions`}
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
						href={`/guilds/${guildId}/events`}
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
						href={`/guilds/${guildId}/channels`}
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
						href={`/guilds/${guildId}/messages`}
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
						href={`/guilds/${guildId}/roles`}
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
						href={`/guilds/${guildId}/disabled-commands`}
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
						href={`/guilds/${guildId}/custom-commands`}
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
						href={`/guilds/${guildId}/starboard`}
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
						href={`/guilds/${guildId}/suggestions`}
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
						href={`/music/${guildId}`}
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
};

export default memo(SettingsDrawerItems);
