import React, { useGlobal, Fragment } from 'reactn';
import { Grid, Avatar, Card, CardHeader, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import GuildIcon from 'components/GuildIcon';
import { oauthURL } from 'meta/constants';
import { logOut } from 'meta/util';

const useStyles = makeStyles(theme => ({
	profile: {
		margin: 10,
		padding: 10,
		width: 250,
		display: 'flex',
		alignItems: 'center'
	},
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
		background: theme.palette.secondary.main
	}
}));

export default () => {
	const [global] = useGlobal();
	const classes = useStyles();
	const { authenticated, user } = global;
	return (
		<Container>
			{authenticated ? (
				<Fragment>
					<div className={classes.profile}>
						<Avatar src={user.avatarURL} alt={user.username} />
						<p>{user.username}</p>
						<button onClick={logOut}>Log out</button>
					</div>

					<Grid container direction="row" justify="center" alignItems="center" spacing={3} className={classes.guildsList}>
						{user.guilds
							.filter(guild => guild.userCanManage)
							.map(guild => (
								<Grid item className={classes.guildCardContainer} key={guild.id}>
									<Card className={classes.guildCard}>
										<CardHeader avatar={<GuildIcon guild={guild} />} title={guild.name} />
									</Card>
								</Grid>
							))}
					</Grid>
				</Fragment>
			) : (
				<a href={oauthURL}>Log in</a>
			)}
		</Container>
	);
};
