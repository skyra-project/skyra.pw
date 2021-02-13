import { createSeoProps } from '@config/next-seo.config';
import PrivacyPolicy from '@pages/PrivacyPolicy';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const PrivacyPage: NextPage = () => {
	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Privacy Policy' })} />
			<PrivacyPolicy />
		</>
	);
};

export default PrivacyPage;
