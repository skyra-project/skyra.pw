import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import SeoHead from '@config/SEO/SeoHeader';
import RedirectRoute from '@routing/RedirectRoute';
import { serverURL } from '@utils/constants';
import type { NextPage } from 'next';
import React from 'react';

const JoinPage: NextPage = () => (
	<>
		<SeoHead
			additionalSeoProps={{
				title: 'Join support server',
				nofollow: true,
				noindex: true,
				robotsProps: robotBlockingPageProps
			}}
		/>
		<RedirectRoute redirectUri={serverURL} />
	</>
);

export default JoinPage;
