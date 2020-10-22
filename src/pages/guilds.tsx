import { createSeoProps } from '@config/next-seo.config';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useDiscordPack } from '@contexts/DiscordPackContext';
import { Box, Container, createStyles, makeStyles } from '@material-ui/core';
import { renderFilteredGuildCards } from '@presentational/GuildCard';
import GeneralPage from '@presentational/Layout/General';
import ScrollToTop from '@routing/ScrollToTop';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			height: 'calc(100vh - 200px - 128px)',
			alignContent: 'center',
			alignItems: 'center'
		}
	})
);

const GuildsPage: NextPage = () => {
	const classes = useStyles();
	const authenticated = useAuthenticated();
	const pack = useDiscordPack();

	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Guilds' })} />
			<ScrollToTop />
			<GeneralPage>
				{authenticated && (
					<Container classes={{ root: classes.container }}>
						<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
							{renderFilteredGuildCards(pack)}
						</Box>
					</Container>
				)}
			</GeneralPage>
		</>
	);
};

export default GuildsPage;
