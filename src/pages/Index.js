import React, { useGlobal, Fragment } from 'reactn';
import styled from 'styled-components';

import { oauthURL, history } from 'meta/constants';
import { logOut } from 'meta/util';

const Profile = styled.div`
	margin: 10px;
	padding: 10px;
	width: 250px;
`;

const UserAvatar = styled.img`
	border-radius: 50%;
	height: 60px;
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
	const { authenticated, user } = global;
	return (
		<div>
			{authenticated ? (
				<Fragment>
					<Profile>
						Logged in as {user.username} <UserAvatar src={user.displayAvatarURL} alt={user.username} />
						<button onClick={logOut}>Log out</button>
					</Profile>

					<GuildsList>
						{user.guilds
							.filter(guild => guild.userCanManage)
							.map(guild => (
								<div className="guild">
									<UserAvatar
										onClick={() => history.push(`/guilds/${guild.id}`)}
										src={guild.iconURL || 'https://cdn.discordapp.com/embed/avatars/1.png'}
										alt={guild.name}
									/>
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
