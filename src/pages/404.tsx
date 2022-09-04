import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import Error from '@layout/ErrorPage';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Page404: NextPage = () => (
	<>
		<NextSeo title="404" description="How'd you get here?" nofollow noindex robotsProps={robotBlockingPageProps} />
		<Error />
	</>
);

export default Page404;
