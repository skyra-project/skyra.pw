import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import Error from '@presentational/Layout/ErrorPage';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const Page404: NextPage = () => (
	<>
		<NextSeo title="404" description="How'd you get here?" nofollow noindex robotsProps={robotBlockingPageProps} />
		<Error />
	</>
);

export default Page404;
