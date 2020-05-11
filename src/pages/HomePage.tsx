import { Box, Container, createStyles, Divider, Hidden, makeStyles, Theme, Typography } from '@material-ui/core';
import features from 'assets/features';
import clsx from 'clsx';
import GeneralPage from 'components/GeneralPage';
import GuildCard from 'components/GuildCard';
import React, { useGlobal } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		oddBox: {
			'&:nth-of-type(odd)': {
				flexDirection: 'row-reverse'
			}
		},
		evenBox: {
			'&:nth-of-type(even)': {
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
			[theme.breakpoints.down('md')]: {
				width: '100%'
			}
		}
	})
);

const Section = ({ name, previewContent, text }: typeof features extends Array<infer U> ? U : never) => {
	const classes = useStyles();
	const [authenticated] = useGlobal('authenticated');

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
			className={clsx({ [classes.evenBox]: authenticated, [classes.oddBox]: !authenticated })}
		>
			<div className={classes.text}>
				<Typography variant="h3" component="h1">
					{name}
				</Typography>
				<Divider classes={{ root: classes.divider }} />
				<Typography>{text}</Typography>
			</div>
			<Hidden mdDown>{previewContent}</Hidden>
		</Box>
	);
};

export default () => {
	const [authenticated] = useGlobal('authenticated');
	const [user] = useGlobal('user');

	return (
		<GeneralPage>
			{authenticated && (
				<Container>
					<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
						{(user?.guilds ?? [])
							// Filter on mangeable servers
							.filter(g => g.manageable)
							// Sort by whether Skyra is in the serve ror not
							.sort((gA, gB) => (gA.skyraIsIn === gB.skyraIsIn ? 0 : gA.skyraIsIn ? -1 : 1))
							// Sort by name of the server
							.sort((gA, gB) => gA.name.localeCompare(gB.name, 'en', { sensitivity: 'base' }))
							// Map the servers to GuildCards
							.map((g, index) => (
								<GuildCard guild={g} key={index} />
							))}
					</Box>
				</Container>
			)}
			{features.map(({ name, previewContent, text }) => (
				<Section name={name} text={text} previewContent={previewContent} key={name} />
			))}
		</GeneralPage>
	);
};
