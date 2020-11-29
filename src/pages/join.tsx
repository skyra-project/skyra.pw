import { createSeoProps } from '#config/next-seo.config';
import RedirectRoute from '#routing/RedirectRoute';
import { serverURL } from '#utils/constants';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const JoinPage: NextPage = () => (
	<>
		<NextSeo
			{...createSeoProps({
				title: 'Join support server',
				additionalMetaTags: [
					{ name: 'robots', content: 'noindex, nofollow' },
					{ name: 'googlebot', content: 'noindex, nofollow' }
				]
			})}
		/>
		<RedirectRoute redirectUri={serverURL} />
	</>
);

export default JoinPage;
