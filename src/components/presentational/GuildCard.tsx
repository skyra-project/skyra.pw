import { DashboardPack, FlattenedGuild } from '@config/types/ApiData';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { guildAddURL } from '@utils/constants';
import { navigate } from '@utils/util';
import React, { FC } from 'react';
import GuildIcon from './GuildIcon';

interface GuildCardProps {
	guild: FlattenedGuild;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			minWidth: 230,
			maxWidth: 230,
			minHeight: 80,
			maxHeight: 80,
			background: theme.palette.secondary.main,
			margin: theme.spacing(2),
			'&:hover': {
				cursor: 'pointer'
			},
			[theme.breakpoints.down('xs')]: {
				width: '100%',
				maxWidth: 'none'
			}
		},
		headerRoot: {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			display: 'inline-flex',
			textOverflow: 'ellipsis'
		},
		headerContent: {
			whiteSpace: 'pre-wrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}
	})
);

const GuildCard: FC<GuildCardProps> = ({ guild }) => {
	const classes = useStyles();

	return (
		<Card
			classes={{ root: classes.card }}
			elevation={2}
			onClick={navigate(guild.skyraIsIn ? `/guilds/${guild.id}` : guildAddURL(guild.id))}
		>
			<CardHeader
				classes={{ root: classes.headerRoot, content: classes.headerContent }}
				subheader={!guild.skyraIsIn && 'Click to invite Skyra'}
				avatar={<GuildIcon guild={guild} />}
				title={guild.name}
			/>
		</Card>
	);
};

export const renderFilteredGuildCards = (pack?: DashboardPack) =>
	(pack?.user?.guilds ?? [])
		// Filter on mangeable servers
		.filter(g => g.manageable)
		// Sort by whether Skyra is in the serve ror not
		.sort((gA, gB) => (gA.skyraIsIn === gB.skyraIsIn ? 0 : gA.skyraIsIn ? -1 : 1))
		// Sort by name of the server
		.sort((gA, gB) => gA.name.localeCompare(gB.name, 'en', { sensitivity: 'base' }))
		.map((g, index) => React.cloneElement(<GuildCard guild={g} key={index} />));

export default GuildCard;
