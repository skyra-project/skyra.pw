import { createSeoProps } from '@config/next-seo.config';
import HomePage from '@pages/HomePage';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const Index: NextPage = () => {
	return (
		<>
			<NextSeo {...createSeoProps()} />
			<HomePage />
		</>
	);
};

export default Index;
