import { Box, Container, createStyles, Divider, Hidden, makeStyles, Theme, Typography } from '@material-ui/core';
import { DiscordEmbed, DiscordMessage, DiscordMessages } from '@skyra/discord-message-components';
import features from 'assets/features';
import GeneralPage from 'components/GeneralPage';
import GuildCard from 'components/GuildCard';
import React, { useGlobal } from 'reactn';

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
			<DiscordMessages data-qa="test" style={{ width: 400, borderRadius: 4 }}>
				<DiscordMessage roleColor="#5c71bd" author="Skyra" avatar="skyra" bot>
					<DiscordEmbed
						slot="embeds"
						color="#FFD54F"
						authorImage="https://cdn.discordapp.com/avatars/157797566833098752/a_58c11318d45efbde40e37dd1ac7408b0.gif?size=2048"
						authorName="Magnaboy#7556"
						footerImage="https://github.com/NM-EEA-Y.png"
						timestamp={new Date()}
					>
						<strong>> Type</strong>: Temporary Mute
						<br />
						<strong>> User</strong>: enkiel#8897 (489096182069461003)
						<br />
						<strong>> Reason</strong>: Spamming.
						<br />
						<strong>> Expires In</strong>: 10 minutes
						<span slot="footer">Case 11</span>
					</DiscordEmbed>
				</DiscordMessage>
			</DiscordMessages>
			{features.map(({ name, image, text }) => (
				<Section name={name} image={image} text={text} key={name} />
			))}
		</GeneralPage>
	);
};
