import { createSeoProps } from '@config/next-seo.config';
import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const PrivacyPage: NextPage = () => {
	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Homepage' })} />
			<Typography>Privacy Page!</Typography>
		</>
	);
};

export default PrivacyPage;
