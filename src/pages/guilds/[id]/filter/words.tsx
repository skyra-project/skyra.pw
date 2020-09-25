import { createSeoProps } from '@config/next-seo.config';
import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const WordFilterSettings: NextPage = () => {
	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Homepage' })} />
			<Typography>Words Filter page!</Typography>
		</>
	);
};

export default WordFilterSettings;
