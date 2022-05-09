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
		<Container maxWidth="xl" sx={{ my: 2 }}>
			{features.map((feature, id) => (
				<HomePageSection key={id} isOdd={Boolean(id % 2)} feature={feature} />
			))}
		</Container>
	</GeneralPage>
);

export default HomePage;
