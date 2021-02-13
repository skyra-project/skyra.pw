import PrivacyPolicy from '@pages/PrivacyPolicy';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const PrivacyPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Privacy Policy"
				description="Want to know how we handle your data when using Skyra and her services? You can read our privacy policy here."
				openGraph={{
					title: 'Skyra Privacy Policy'
				}}
				additionalMetaTags={[
					{
						name: 'summary',
						content: 'Want to know how we handle your data when using Skyra and her services? You can read our privacy policy here.'
					}
				]}
			/>
			<PrivacyPolicy />
		</>
	);
};

export default PrivacyPage;
