import PageContent from '@pages/CommandsPage';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const CommandsPage: NextPage = () => {
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

			<PageContent />
		</>
	);
};

export default CommandsPage;
