import type { TransformedLoginData } from '@config/types/ApiData';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Link from '@routing/Link';
import { guildAddURL } from '@utils/constants';
import React, { memo } from 'react';
import type { ValuesType } from 'utility-types';
import GuildIcon from './GuildIcon';

interface GuildCardProps {
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
}

const useStyles = makeStyles((theme) =>
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
			[theme.breakpoints.down('sm')]: {
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
		// Sort by whether Skyra is in the server or not, or sort by the name of the server
		.sort((gA, gB) => (gA.skyraIsIn === gB.skyraIsIn ? gA.name.localeCompare(gB.name, 'en', { sensitivity: 'base' }) : gA.skyraIsIn ? -1 : 1))
		.map((g, index) => React.cloneElement(<GuildCard guild={g} key={index} />));
