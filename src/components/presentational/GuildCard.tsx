import type { TransformedLoginData } from '@config/types/ApiData';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@routing/Link';
import { guildAddURL } from '@utils/constants';
import React, { memo } from 'react';
import type { ValuesType } from 'utility-types';
import GuildIcon from './GuildIcon';

interface GuildCardProps {
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
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
				width: '90vw',
				maxWidth: '90vw'
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
		},
		link: {
			color: 'inherit',
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'none',
				color: 'inherit'
			},
			'&:visited': {
				textDecoration: 'none',
				color: 'inherit'
			}
		}
	})
);

const GuildCard = memo<GuildCardProps>(({ guild }) => {
	const classes = useStyles();

	return (
		<Link href={guild.skyraIsIn ? `/guilds/${guild.id}` : guildAddURL(guild.id)} className={classes.link}>
			<Card classes={{ root: classes.card }} elevation={2}>
				<CardHeader
					classes={{ root: classes.headerRoot, content: classes.headerContent }}
					subheader={!guild.skyraIsIn && 'Click to invite Skyra'}
					avatar={<GuildIcon guild={guild} />}
					title={guild.name}
				/>
			</Card>
		</Link>
	);
});

export const FilteredGuildCards = (pack?: TransformedLoginData) =>
	(pack?.transformedGuilds ?? [])
		// Filter on manageable servers
		.filter((g) => g.manageable)
		// Sort by whether Skyra is in the server or not
		.sort((gA, gB) => (gA.skyraIsIn === gB.skyraIsIn ? 0 : gA.skyraIsIn ? -1 : 1))
		// Sort by name of the server
		.sort((gA, gB) => gA.name.localeCompare(gB.name, 'en', { sensitivity: 'base' }))
		.map((g, index) => React.cloneElement(<GuildCard guild={g} key={index} />));
