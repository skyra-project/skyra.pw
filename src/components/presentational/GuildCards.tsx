import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useDiscordPack } from '@contexts/DiscordPackContext';
import { Box, Container } from '@mui/material';
import { FilteredGuildCards } from '@presentational/GuildCard';
import React, { memo, type FC } from 'react';

const GuildCards: FC = () => {
	const authenticated = useAuthenticated();
	const pack = useDiscordPack();

	if (!authenticated) {
		return null;
	}

	return (
		<Container maxWidth="md">
			<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
				{FilteredGuildCards(pack)}
			</Box>
		</Container>
	);
};

export default memo(GuildCards);
