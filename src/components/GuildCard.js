import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader } from '@material-ui/core';

import GuildIcon from 'components/GuildIcon';
import { navigate } from 'meta/util';
import { guildAddURL } from 'meta/constants';
import theme from 'meta/theme';

const StyledCard = styled(Card)`
	min-width: 230px;
	background: ${theme.palette.secondary.light};
	max-width: 230px;
	margin: ${theme.spacing(2)}px;

	&:hover {
		cursor: pointer;
	}

	${theme.breakpoints.down('xs')} {
		width: 100%;
		max-width: none;
	}

	.MuiCardHeader-content span,
	.MuiCardHeader-content {
		white-space: nowrap;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
	}
`;

const GuildCard = ({ guild }) => (
	<StyledCard elevation={2} onClick={navigate(guild.skyraIsIn ? `/guilds/${guild.id}` : guildAddURL(guild.id))}>
		<CardHeader subheader={!guild.skyraIsIn && 'Click to invite Skyra'} avatar={<GuildIcon guild={guild} />} title={guild.name} />
	</StyledCard>
);

export default GuildCard;
