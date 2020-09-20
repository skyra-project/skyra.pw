import Analytics from '@config/Analytics';
import { createSeoProps } from '@config/next-seo.config';
import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const HomePage: NextPage = () => {
	return (
		<>
			<Analytics />
			<NextSeo {...createSeoProps({ title: 'Homepage' })} />
			<Typography>Hello World!</Typography>
		</>
	);
};

export default HomePage;
