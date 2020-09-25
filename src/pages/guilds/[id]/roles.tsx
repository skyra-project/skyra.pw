import { createSeoProps } from '@config/next-seo.config';
import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const RolesSettings: NextPage = () => {
	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Homepage' })} />
			<Typography>Roles page!</Typography>
		</>
	);
};

export default RolesSettings;
