import React, { useGlobal, Fragment } from 'reactn';
import { Grid, Card, CardHeader, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import GuildIcon from 'components/GuildIcon';
import { oauthURL } from 'meta/constants';
import { navigate } from 'meta/util';
import GeneralPage from 'components/GeneralPage';

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

export default () => {
	const [global] = useGlobal();
	const classes = useStyles();
	const { authenticated, user } = global;
	return (
		<GeneralPage>
			{authenticated && (
				<Grid container direction="row" justify="center" alignItems="center" spacing={3} className={classes.guildsList}>
					{(user.guilds || [])
						.filter(guild => guild.userCanManage)
						.map(guild => (
							<Grid item className={classes.guildCardContainer} key={guild.id}>
								<Card elevation={2} onClick={navigate(`/guilds/${guild.id}`)} className={classes.guildCard}>
									<CardHeader avatar={<GuildIcon guild={guild} />} title={guild.name} />
								</Card>
							</Grid>
						))}
				</Grid>
			)}
		</GeneralPage>
	);
};
