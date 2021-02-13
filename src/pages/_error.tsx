import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import mergeSeoProps from '@config/SEO/MergeSeoProps';
import Error from '@presentational/Layout/ErrorPage';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const ErrorPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ seoTags }) => (
	<>
		<NextSeo {...seoTags} />
		<Error />
	</>
);

export async function getStaticProps() {
	const seoTags = mergeSeoProps({
		title: '500',
		description: "How'd you get here?",
		nofollow: true,
		noindex: true,
		robotsProps: robotBlockingPageProps
	});

	return {
		props: { seoTags } // will be passed to the page component as props
	};
}

export default ErrorPage;
