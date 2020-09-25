import { createSeoProps } from '@config/next-seo.config';
import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { getGlobal, useGlobal } from 'reactn';

const HomePage: NextPage = () => {
	const [authenticated] = useGlobal('authenticated');
	const globalState = getGlobal();

	console.log(authenticated);
	console.log(globalState);
	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Homepage' })} />
			<Typography>Hello World! You are {authenticated ? '' : 'not'} authenticated</Typography>
		</>
	);
};

export default HomePage;
