import features from '@assets/features';
import { Box, Container } from '@material-ui/core';
import GuildCard from '@presentational/GuildCard';
import HomePageSection from '@presentational/HomePageSection';
import GeneralPage from '@presentational/Layout/General';
import ScrollToTop from '@routing/ScrollToTop';
import { getAuthenticated, getDiscordPack } from '@store/selectors';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

const HomePage: FC = () => {
	const pack = useSelector(getDiscordPack);
	const authenticated = useSelector(getAuthenticated);

	return (
		<>
			<ScrollToTop />
			<GeneralPage>
				{authenticated && (
					<Container>
						<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
							{(pack?.user?.guilds ?? [])
								// Filter on mangeable servers
								.filter(g => g.manageable)
								// Sort by whether Skyra is in the serve ror not
								.sort((gA, gB) => (gA.skyraIsIn === gB.skyraIsIn ? 0 : gA.skyraIsIn ? -1 : 1))
								// Sort by name of the server
								.sort((gA, gB) => gA.name.localeCompare(gB.name, 'en', { sensitivity: 'base' }))
								// Map the servers to GuildCards
								.map((g, index) => (
									<GuildCard guild={g} key={index} />
								))}
						</Box>
					</Container>
				)}
				{features.map(({ name, previewContent, text }) => (
					<HomePageSection name={name} text={text} previewContent={previewContent} key={name} />
				))}
			</GeneralPage>
		</>
	);
};

export default HomePage;
