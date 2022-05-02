import type { FlattenedCommand } from '@config/types/ApiData';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import LockIcon from '@mui/icons-material/Lock';
import { Chip, Grid } from '@mui/material';
import { amber, deepOrange } from '@mui/material/colors';
import { useMobileContext } from 'contexts/MobileContext';
import DiscordIcon from 'mdi-react/DiscordIcon';
import React, { FC, memo, useCallback, useMemo } from 'react';

interface ChipsProps {
	command: FlattenedCommand;
}

const GuildOnlyPreconditions = ['Administrator', 'DJ', 'GuildOnly', 'Moderator', 'NewsOnly', 'NSFW', 'TextOnly'];

const Chips: FC<ChipsProps> = ({ command }) => {
	const { isMobile } = useMobileContext();

	const titles = useMemo<Record<number, string>>(
		() => ({
			4: 'This can only be ran by staff members.',
			5: 'This can only be ran by moderators and administrators.',
			6: 'This can only be ran by administrators.'
		}),
		[]
	);

	const mobileTitles = useMemo<Record<number, string>>(
		() => ({
			4: 'Staff members only',
			5: 'Moderators & administrators only',
			6: 'Administrators only'
		}),
		[]
	);

	const isGuildOnly = useCallback(() => {
		return command.preconditions.entries
			.flatMap((preconditionEntry) => preconditionEntry.entries)
			.filter(Boolean)
			.map((entry) => entry.name)
			.some((predicate) => GuildOnlyPreconditions.includes(predicate));
	}, [command.preconditions.entries]);

	return (
		<Grid container spacing={1} direction="row" alignContent="center" alignItems="center" justifyContent="flex-start">
			{command.permissionLevel > 0 && (
				<Grid item xs={12} md={5} lg={4}>
					<Chip
						size="small"
						label={isMobile ? mobileTitles[command.permissionLevel] : titles[command.permissionLevel]}
						icon={<DoubleArrowIcon />}
						color="secondary"
						sx={{
							padding: 0.2,
							marginLeft: 1,
							width: '100%',
							'& .MuiChip-iconSmall': {
								transform: 'rotate(-90deg)',
								color: amber[500]
							}
						}}
					/>
				</Grid>
			)}
			{isGuildOnly() && (
				<Grid item xs={12} md={5} lg={4}>
					<Chip
						size="small"
						label={isMobile ? 'Usable in servers only.' : 'This can only be used in servers.'}
						icon={<DiscordIcon />}
						color="secondary"
						sx={{
							padding: 0.2,
							marginLeft: 1,
							width: '100%',
							'& .MuiChip-iconSmall': {
								color: '#7289DA'
							}
						}}
					/>
				</Grid>
			)}
			{command.guarded && (
				<Grid item xs={12} md={5} lg={4}>
					<Chip
						size="small"
						label="This command cannot be disabled."
						color="secondary"
						icon={<LockIcon />}
						sx={{
							padding: 0.2,
							marginLeft: 1,
							width: '100%',
							'& .MuiChip-iconSmall': {
								color: deepOrange[500]
							}
						}}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default memo(Chips);
