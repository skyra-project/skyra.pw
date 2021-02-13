import mergeSeoProps from '@config/SEO/MergeSeoProps';
import BuildSeoTags from '@config/SEO/SeoGenerator';
// import SeoHead from '@config/SEO/SeoHeader';
import PrivacyPolicy from '@pages/PrivacyPolicy';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const PrivacyPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ seoTags }) => {
	return (
		<>
			<Head>{BuildSeoTags(seoTags)}</Head>
			{/* <SeoHead
				additionalSeoProps={{
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
				}}
			/> */}
			<PrivacyPolicy />
		</>
	);
};

// eslint-disable-next-line @typescript-eslint/require-await
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
