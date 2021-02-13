import { robotBlockingPageProps } from '@config/next-seo.config';
import Error from '@presentational/Layout/ErrorPage';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const Page404: NextPage = () => {
	return (
		<>
			<NextSeo
				title="404"
				description="How'd you get here?"
				robotsProps={{
					...robotBlockingPageProps
				}}
				noindex
				nofollow
			/>
			<Error />
		</>
	);
};

export default Page404;
