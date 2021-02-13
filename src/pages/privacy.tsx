import PrivacyPolicy from '@pages/PrivacyPolicy';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const PrivacyPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Privacy Policy"
				description="Want to learn how we handle your data and protect it? Read out privacy policy."
				openGraph={{
					title: 'Skyra Privacy Policy'
				}}
				additionalMetaTags={[
					{
						name: 'summary',
						content: 'Want to learn how we handle your data and protect it? Read out privacy policy.'
					}
				]}
			/>
			<PrivacyPolicy />
		</>
	);
};

export default PrivacyPage;
