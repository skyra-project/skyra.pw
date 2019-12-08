import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

import Link from 'components/Link';
import theme from 'meta/theme';
import { getAcronym, displayIconURL } from 'meta/util';

const CustomAvatar = styled(Avatar)`
	color: ${theme.palette.secondary.contrastText};
	background: ${theme.palette.secondary.main};
`;

const GuildIcon = ({ guild, size = 128 }) => (
	<Link to={`/guilds/${guild.id}`}>
		<CustomAvatar src={displayIconURL(guild, { size })}>{getAcronym(guild.name)}</CustomAvatar>
	</Link>
);

export default GuildIcon;
