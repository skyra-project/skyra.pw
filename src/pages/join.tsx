import { robotBlockingPageProps } from '@config/next-seo.config';
import RedirectRoute from '@routing/RedirectRoute';
import { serverURL } from '@utils/constants';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const JoinPage: NextPage = () => (
	<>
		<NextSeo
			title="Join support server"
			robotsProps={{
				...robotBlockingPageProps
			}}
			noindex
			nofollow
		/>
		<RedirectRoute redirectUri={serverURL} />
	</>
);

export default JoinPage;
