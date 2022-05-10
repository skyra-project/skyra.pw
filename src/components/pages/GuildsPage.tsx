import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useDiscordPack } from '@contexts/DiscordPackContext';
import { useMobileContext } from '@contexts/MobileContext';
import GeneralPage from '@layout/General';
import { FilteredGuildCards } from '@presentational/GuildCard';
import type { NextPage } from 'next';
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

const GuildsPage: NextPage = () => {
	const authenticated = useAuthenticated();
	const pack = useDiscordPack();
	const { isMobile } = useMobileContext();

	return (
		<>
			<GeneralPage>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignContent: 'center',
						alignItems: 'center',
						height: {
							sm: 'calc(100vh - 200px - 128px)',
							xs: authenticated ? 'unset' : 'calc(100vh - 200px - 128px)'
						}
					}}
				>
					<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
						{authenticated ? (
							FilteredGuildCards(pack)
						) : (
							<Typography
								variant="h1"
								sx={{
									fontSize: {
										md: (theme) => theme.typography.pxToRem(40),
										xs: (theme) => theme.typography.pxToRem(30)
									}
								}}
							>
								Sorry, you are not logged in and can therefore not view this page. Please{' '}
								{isMobile ? 'open the menu button at the top left then click "Login"' : 'click the "Login" button at the top right'}{' '}
								to login with Discord
							</Typography>
						)}
					</Box>
				</Container>
			</GeneralPage>
		</>
	);
};

export default GuildsPage;
