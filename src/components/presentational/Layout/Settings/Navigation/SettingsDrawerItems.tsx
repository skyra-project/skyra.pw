import SkyraLogo from '@assets/skyraLogo';
import type { TransformedLoginData } from '@config/types/ApiData';
import { FilterRoutes, GuildRoutes } from '@config/types/GuildRoutes';
import Tooltip from '@material/Tooltip';
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
import SettingsIcon from '@mui/icons-material/Settings';
import GuildIcon from '@presentational/GuildIcon';
import ListItemLink from '@routing/ListItemLink';
import { isNullish, noop } from '@sapphire/utilities';
import { navigate } from '@utils/util';
import { useRouter } from 'next/router';
import { Fragment, memo, useState, type FC } from 'react';
import type { ValuesType } from 'utility-types';

import { useMobileContext } from '@contexts/MobileContext';
import { Box, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Skeleton, Typography } from '@mui/material';

export interface SettingsDrawerItemsProps {
	guildData: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>> | undefined;
	guildId: string;
	isLoading: boolean;
	toggleSidebar(): void;
}

const SettingsDrawerItems: FC<SettingsDrawerItemsProps> = ({ guildData, guildId, toggleSidebar, isLoading }) => {
	const router = useRouter();
	const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
	const { isMobile } = useMobileContext();

	const closeSidebarOnMobile = () => (isMobile ? toggleSidebar() : noop());

	const handleSubMenu = (menuName: string) => {
		return openSubMenus.includes(menuName)
			? setOpenSubMenus(openSubMenus.filter((item) => item !== menuName))
			: setOpenSubMenus([...openSubMenus, menuName]);
	};

	return (
		<Fragment>
			<Tooltip title="Go back to homepage">
				<Box
					component="div"
					onClick={navigate(`/`)}
					sx={(theme) => ({
						...theme.mixins.toolbar,
						padding: `0px ${theme.spacing(3)}`,
						background: theme.palette.primary.main,
						color: theme.palette.primary.contrastText,
						minHeight: '64px !important',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						'&:hover': {
							cursor: 'pointer'
						}
					})}
				>
					<SkyraLogo />
					<Typography variant="h5">Skyra</Typography>
				</Box>
			</Tooltip>
			<Divider />

			{/* --------------------- */}
			<Box
				sx={{
					px: 1,
					py: 1.5,
					display: 'flex',
					flexDirection: 'column',
					alignContent: 'center',
					alignItems: 'center',
					minHeight: 100
				}}
			>
				{isNullish(guildData) ? (
					<>
						<Skeleton variant="circular" width={60} height={60} />
						<Skeleton variant="text" width={100} height={14} />
					</>
				) : (
					<>
						<GuildIcon
							guild={guildData}
							size={256}
							LazyAvatarSx={{
								width: 60,
								height: 60,
								minHeight: 60,
								maxHeight: 60,
								minWidth: 60,
								maxWidth: 60
							}}
						/>
						<Typography variant="subtitle2" sx={{ mt: 1.875 }} data-premid="server-title">
							{guildData?.name}
						</Typography>
					</>
				)}
			</Box>
			{/* --------------------- */}

			<Box component="div" onKeyDown={isMobile ? toggleSidebar : noop}>
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
								listItemSx={{ pl: 4 }}
								href={`/guilds/${guildId}/${FilterRoutes.Words}`}
								itemText="Words"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemSx={{ pl: 4 }}
								href={`/guilds/${guildId}/${FilterRoutes.Capitals}`}
								itemText="Capitals"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemSx={{ pl: 4 }}
								href={`/guilds/${guildId}/${FilterRoutes.Invites}`}
								itemText="Invites"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemSx={{ pl: 4 }}
								href={`/guilds/${guildId}/${FilterRoutes.Links}`}
								itemText="Links"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemSx={{ pl: 4 }}
								href={`/guilds/${guildId}/${FilterRoutes.MessageDuplication}`}
								itemText="Message Duplication"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemSx={{ pl: 4 }}
								href={`/guilds/${guildId}/${FilterRoutes.NewLines}`}
								itemText="Line Spam"
							/>
							<ListItemLink
								listItemOnClick={closeSidebarOnMobile}
								listItemDisabled={!guildData || isLoading}
								listItemDense
								listItemSx={{ pl: 4 }}
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
				</List>
			</Box>
		</Fragment>
	);
};

export default memo(SettingsDrawerItems);
