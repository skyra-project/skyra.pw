import { Box, Container, createStyles, Divider, Hidden, makeStyles, Theme, Typography } from '@material-ui/core';
import features from 'assets/features';
import GeneralPage from 'components/GeneralPage';
import GuildCard from 'components/GuildCard';
import React, { useGlobal, useMemo } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			'&:nth-of-type(odd)': {
				flexDirection: 'row-reverse'
			}
		},
		divider: {
			marginTop: theme.spacing(1.25),
			marginBottom: theme.spacing(1.25)
		},
		text: {
			display: 'flex',
			flexDirection: 'column',
			width: '47%',
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			}
		},
		previewImage: {
			borderRadius: 4,
			maxWidth: 400,
			maxHeight: 400,
			[theme.breakpoints.down('sm')]: {
				marginTop: theme.spacing(2.5),
				width: '100%'
			}
		}
	})
);

const Section = ({ name, image, text }: typeof features extends Array<infer U> ? U : never) => {
	const classes = useStyles();

	return (
		<Box
			p={5}
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			alignContent="center"
			flexWrap="wrap"
			flexDirection="row"
			minHeight="min-content"
			className={classes.box}
		>
			<div className={classes.text}>
				<Typography variant="h3" component="h1">
					{name}
				</Typography>
				<Divider classes={{ root: classes.divider }} />
				<Typography>{text}</Typography>
			</div>
			<Hidden smDown>
				<img alt={name} src={image.src} width={image.width} height={image.height} className={classes.previewImage} loading="lazy" />
			</Hidden>
		</Box>
	);
};

export default () => {
	const [authenticated] = useGlobal('authenticated');
	const [user] = useGlobal('user');

	const skyraGuildList = useMemo(
		() =>
			(user.guilds || [])
				// Filter on mangeable servers
				.filter(g => g.manageable)
				.sort((gA, gB) => (gA.manageable === gB.manageable ? 0 : gA.manageable ? -1 : 1))
				// Sort by whether Skyra is in the serve ror not
				.sort((gA, gB) => (gA.skyraIsIn === gB.skyraIsIn ? 0 : gA.skyraIsIn ? -1 : 1))
				// Sort by name of the server
				.sort((gA, gB) => gA.name.localeCompare(gB.name, 'en', { sensitivity: 'base' }))
				// Map the servers to GuildCards
				.map((g, index) => <GuildCard guild={g} key={index} />),
		[user.guilds]
	);

	const skyraFeatures = useMemo(
		() => features.map(({ name, image, text }) => <Section name={name} image={image} text={text} key={name} />),
		[]
	);

	return (
		<GeneralPage>
			{authenticated && (
				<Container>
					<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
						{skyraGuildList}
					</Box>
				</Container>
			)}
			{skyraFeatures}
		</GeneralPage>
	);
};
