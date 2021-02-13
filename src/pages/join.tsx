import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import mergeSeoProps from '@config/SEO/MergeSeoProps';
import RedirectRoute from '@routing/RedirectRoute';
import { serverURL } from '@utils/constants';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const JoinPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ seoTags }) => (
	<>
		<NextSeo {...seoTags} />
		<RedirectRoute redirectUri={serverURL} />
	</>
);

export async function getStaticProps() {
	const seoTags = mergeSeoProps({
		title: 'Join support server',
		nofollow: true,
		noindex: true,
		robotsProps: robotBlockingPageProps
	});

	return {
		props: { seoTags } // will be passed to the page component as props
	};
}

export default JoinPage;
