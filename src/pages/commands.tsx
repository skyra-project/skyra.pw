import type { FlattenedCommand } from '@config/types/ApiData';
import PageContent from '@pages/CommandsPage';
import { ssrFetch } from '@utils/util';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const CommandsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ commands }) => {
	return (
		<>
			<NextSeo
				title="Commands"
				description="Want to know what Skyra can do? You've come to the right place here. Get information about every command available in Skyra on this page."
				openGraph={{
					title: "Skyra's Commands"
				}}
				additionalMetaTags={[
					{
						name: 'summary',
						content:
							"Want to know what Skyra can do? You've come to the right place here. Get information about every command available in Skyra on this page."
					}
				]}
			/>

			<PageContent commands={commands} />
		</>
	);
};

export const getStaticProps = async () => {
	const commands = await ssrFetch<FlattenedCommand[]>('/commands');

	return {
		props: {
			commands
		}
	};
};

export default CommandsPage;
