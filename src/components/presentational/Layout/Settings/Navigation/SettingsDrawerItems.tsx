import SkyraLogo from '@assets/skyraLogo';
import type { TransformedLoginData } from '@config/types/ApiData';
import { FilterRoutes, GuildRoutes } from '@config/types/GuildRoutes';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CakeIcon from '@material-ui/icons/Cake';
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
import ListItemLink from '@routing/ListItemLink';
import { noop } from '@sapphire/utilities';
import { navigate } from '@utils/util';
import { useRouter } from 'next/router';
import React, { FC, Fragment, memo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import type { ValuesType } from 'utility-types';

export interface SettingsDrawerItemsProps {
	guildData: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>> | undefined;
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
	const router = useRouter();
	const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

	const closeSidebarOnMobile = () => (isOnMobile ? toggleSidebar() : noop());

	const handleSubMenu = (menuName: string) => {
		return openSubMenus.includes(menuName)
			? setOpenSubMenus(openSubMenus.filter((item) => item !== menuName))
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
					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}`}
						itemText="General Settings"
						Icon={<SettingsIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Birthdays}`}
						itemText="Birthdays"
						Icon={<CakeIcon />}
					/>

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Moderation}`}
						itemText="Moderation"
						Icon={<GavelIcon />}
					/>

					{/* ------------------------------- */}
					<ListItem disabled={!guildData || isLoading} button onClick={() => handleSubMenu('filter')}>
						<ListItemIcon>
							<FilterListIcon />
						</ListItemIcon>
						<ListItemText primary="Filters" />
						{openSubMenus.includes('filter') ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openSubMenus.includes('filter') || router.asPath.split('/')?.[3] === 'filter'} timeout="auto" unmountOnExit>
						<List disablePadding>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemClassName={classes.nested}
								href={`/guilds/${guildId}/${FilterRoutes.Words}`}
								itemText="Words"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemClassName={classes.nested}
								href={`/guilds/${guildId}/${FilterRoutes.Capitals}`}
								itemText="Capitals"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemClassName={classes.nested}
								href={`/guilds/${guildId}/${FilterRoutes.Invites}`}
								itemText="Invites"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemClassName={classes.nested}
								href={`/guilds/${guildId}/${FilterRoutes.Links}`}
								itemText="Links"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemClassName={classes.nested}
								href={`/guilds/${guildId}/${FilterRoutes.MessageDuplication}`}
								itemText="Message Duplication"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemClassName={classes.nested}
								href={`/guilds/${guildId}/${FilterRoutes.NewLines}`}
								itemText="Line Spam"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemClassName={classes.nested}
								href={`/guilds/${guildId}/${FilterRoutes.Reactions}`}
								itemText="Reactions"
							/>
						</List>
					</Collapse>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Channels}`}
						itemText="Channels"
						Icon={<ChannelsIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Events}`}
						itemText="Events"
						Icon={<EventIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Messages}`}
						itemText="Messages"
						Icon={<MessagesIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Roles}`}
						itemText="Roles"
						Icon={<RolesIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Starboard}`}
						itemText="Starboard"
						Icon={<StarIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.DisabledCommands}`}
						itemText="Disable Commands"
						Icon={<InputIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.CustomCommands}`}
						itemText="Custom Commands"
						Icon={<CustomCommandsIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/guilds/${guildId}/${GuildRoutes.Suggestions}`}
						itemText="Suggestions"
						Icon={<FeedbackIcon />}
					/>

					{/* ------------------------------- */}

					<ListItemLink
						listItemOnClick={closeSidebarOnMobile}
						listItemDisabled={!guildData || isLoading}
						href={`/music/${guildId}`}
						itemText="Music"
						Icon={<MusicIcon />}
					/>
				</List>
			</Box>
		</Fragment>
	);
};

export default memo(SettingsDrawerItems);
