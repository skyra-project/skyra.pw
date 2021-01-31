import { createSeoProps } from '@config/next-seo.config';
import Error from '@presentational/Layout/ErrorPage';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const ErrorPage: NextPage = () => {
	return (
		<>
			<NextSeo
				{...createSeoProps({
					title: '500',
					description: "How'd you get here?",
					additionalMetaTags: [
						{ name: 'robots', content: 'noindex, nofollow' },
						{ name: 'googlebot', content: 'noindex, nofollow' }
					]
				})}
			/>
			<Error />
		</>
	);
};

export default ErrorPage;
