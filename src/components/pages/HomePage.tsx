import features from '@assets/features';
import GeneralPage from '@layout/General';
import { Container } from '@mui/material';
import HomePageSection from '@presentational/HomePageSection';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

const GuildCards = dynamic(() => import('@presentational/GuildCards'), { ssr: false });

const HomePage: FC = () => (
	<GeneralPage>
		<GuildCards />
		<Container maxWidth="md">
			{features.map(({ name, text }) => (
				<HomePageSection name={name} text={text} key={name} />
			))}
		</Container>
	</GeneralPage>
);

export default HomePage;
