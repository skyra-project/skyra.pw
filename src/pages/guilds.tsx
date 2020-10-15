import { createSeoProps } from '@config/next-seo.config';
import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const GuildsPage: NextPage = () => {
	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Guilds' })} />
			<Typography>Guilds Page!</Typography>
		</>
	);
};

export default GuildsPage;
