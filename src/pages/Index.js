import React, { useGlobal, Fragment } from 'reactn';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

import { oauthURL, history } from 'meta/constants';
import { logOut, getAcronym } from 'meta/util';
import { makeStyles } from '@material-ui/styles';
import theme from 'meta/theme';

const useStyles = makeStyles({
	defaultIcon: {
		backgroundColor: theme.palette.secondary.main
	}
})

const Profile = styled.div`
	margin: 10px;
	padding: 10px;
	width: 250px;
	display: flex;
	align-items: 'center';

	div.MuiAvatar-root {
		margin-right: 10px;
	}
`;

const GuildsList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	margin: 10px;
	padding: 10px;

	.guild {
		display: flex;
		align-content: center;
		flex-direction: column;
		max-width: 90px;
		margin: 0px 10px;

		img {
			align-self: center;
		}

		&:hover {
			cursor: pointer;
		}
	}
`;

export default () => {
	const [global] = useGlobal();
	const classes = useStyles();
	const { authenticated, user } = global;
	return (
		<div>
			{authenticated ? (
				<Fragment>
					<Profile>
						<Avatar
							src={user.avatarURL}
							alt={user.username}
						/>
						<p>{user.username}</p>
						<button onClick={logOut}>Log out</button>
					</Profile>

					<GuildsList>
						{user.guilds
							.filter(guild => guild.userCanManage)
							.map(guild => (
								<div className="guild" key={guild.id}>
									{guild.iconURL ? (
										<Avatar
											onClick={() => history.push(`/guilds/${guild.id}`)}
											src={guild.iconURL}
											alt={guild.name}
										/>
									) : (
										<Avatar
											onClick={() => history.push(`/guilds/${guild.id}`)}
											className={classes.defaultIcon}
										>
											{getAcronym(guild.name)}
										</Avatar>
									)}
									<p className="name">{guild.name}</p>
								</div>
							))}
					</GuildsList>
				</Fragment>
			) : (
				<a href={oauthURL}>Log in</a>
			)}
		</div>
	);
};
