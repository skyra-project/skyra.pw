import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import RedirectRoute from '@routing/RedirectRoute';
import { serverURL } from '@utils/constants';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const JoinPage: NextPage = () => (
	<>
		<NextSeo title="Join support server" nofollow noindex robotsProps={robotBlockingPageProps} />
		<RedirectRoute redirectUri={serverURL} />
	</>
);

export default JoinPage;
