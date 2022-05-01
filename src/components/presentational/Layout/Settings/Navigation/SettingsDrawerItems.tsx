import SkyraLogo from '@assets/skyraLogo';
import type { TransformedLoginData } from '@config/types/ApiData';
import { FilterRoutes, GuildRoutes } from '@config/types/GuildRoutes';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import EventIcon from '@mui/icons-material/EventNote';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CustomCommandsIcon from '@mui/icons-material/Extension';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChannelsIcon from '@mui/icons-material/Forum';
import GavelIcon from '@mui/icons-material/Gavel';
import RolesIcon from '@mui/icons-material/Group';
import InputIcon from '@mui/icons-material/Input';
import MessagesIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@material/Tooltip';
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

const useStyles = makeStyles((theme) =>
	createStyles({
		guildImage: {
			...theme.mixins.toolbar,
			padding: `0px ${theme.spacing(3)}`,
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
							<Skeleton variant="circular" width={60} height={60} />
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
				</List>
			</Box>
		</Fragment>
	);
};

export default memo(SettingsDrawerItems);
