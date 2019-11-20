import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import { Grid, Card, CardHeader, Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import GuildIcon from 'components/GuildIcon';
import { navigate } from 'meta/util';
import theme from 'meta/theme';
import GeneralPage from 'components/GeneralPage';
import { guildAddURL } from 'meta/constants';
const useStyles = makeStyles(theme => ({
	guildCardContainer: {
		flex: '1 1 0%',
		minWidth: 250,
		maxWidth: 250,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			maxWidth: 'none'
		},
		transition: 'width 0.2s ease-in-out'
	},
	guildCard: {
		background: theme.palette.secondary.main,
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const Section = styled(Box)`
	background: ${props => (!props.secondary ? theme.palette.primary.main : theme.palette.secondary.main)};
	width: 100%;
`;

const HomePage = () => {
	const [global] = useGlobal();
	const classes = useStyles();
	const { authenticated, user } = global;
	return (
		<GeneralPage>
			{authenticated && (
				<Section p={5}>
					<Container>
						<Grid container direction="row" justify="center" alignItems="center" spacing={4} className={classes.guildsList}>
							{(user.guilds || [])
								.filter(guild => guild.userCanManage)
								.sort((a, b) => !!b.channels - !!a.channels)
								.map(guild => (
									<Grid item className={classes.guildCardContainer} key={guild.id}>
										<Card
											elevation={2}
											onClick={navigate(!!guild.channels ? `/guilds/${guild.id}` : guildAddURL(guild.id))}
											className={classes.guildCard}
										>
											<CardHeader
												subheader={!guild.channels && 'Not in server'}
												avatar={<GuildIcon guild={guild} />}
												title={guild.name}
											/>
										</Card>
									</Grid>
								))}
						</Grid>
					</Container>
				</Section>
			)}
			<Section secondary height={400} p={5}>
				<Container>
					<Typography variant="h3" component="h1">
						Features
					</Typography>
				</Container>
			</Section>
			<Section height={400} p={5}>
				<Container>
					<Typography variant="h3" component="h1">
						Stuff
					</Typography>
				</Container>
			</Section>
			<Section secondary height={400} p={5}>
				<Container>
					<Typography variant="h3" component="h1">
						Features
					</Typography>
				</Container>
			</Section>
		</GeneralPage>
	);
};

export default HomePage;
