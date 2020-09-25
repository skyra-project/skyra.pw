import { createSeoProps } from '@config/next-seo.config';
import RedirectRoute from '@routing/RedirectRoute';
import { oauthURL } from '@utils/constants';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const LoginPage: NextPage = () => (
	<>
		<NextSeo
			{...createSeoProps({
				title: 'Login to the dashboard',
				additionalMetaTags: [
					{ name: 'robots', content: 'noindex, nofollow' },
					{ name: 'googlebot', content: 'noindex, nofollow' }
				]
			})}
		/>
		<RedirectRoute redirectUri={oauthURL.toString()} />
	</>
);

export default LoginPage;
