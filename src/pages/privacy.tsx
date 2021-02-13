import mergeSeoProps from '@config/SEO/MergeSeoProps';
import PrivacyPolicy from '@pages/PrivacyPolicy';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const PrivacyPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ seoTags }) => {
	return (
		<>
			<NextSeo {...seoTags} />
			<PrivacyPolicy />
		</>
	);
};

export async function getStaticProps() {
	const seoTags = mergeSeoProps({
		title: 'Privacy Policy',
		description: 'Want to learn how we handle your data and protect it? Read out privacy policy.',
		openGraph: {
			title: 'Skyra Privacy Policy'
		},
		additionalMetaTags: [
			{
				name: 'summary',
				content: 'Want to learn how we handle your data and protect it? Read out privacy policy.'
			}
		]
	});

	return {
		props: { seoTags } // will be passed to the page component as props
	};
}

export default PrivacyPage;
