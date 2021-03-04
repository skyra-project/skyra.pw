import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import type { TransformedLoginData } from '@config/types/ApiData';
import { setAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack } from '@contexts/DiscordPackContext';
import GeneralPage from '@layout/General';
import { BASE_WEB_URL, CLIENT_ID, CodeMatchRegex, FetchMethods, LocalStorageKeys } from '@utils/constants';
import { apiFetch, saveState } from '@utils/util';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const OauthCallback: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const mergePack = mergeDiscordPack();
	const writeAuthenticated = setAuthenticated();
	const { push, query, asPath } = useRouter();

	const finalizeAuthFlow = useCallback(
		async (code: string | null) => {
			setLoading(true);

			try {
				const data = await apiFetch<TransformedLoginData>(`/oauth/callback`, {
					method: FetchMethods.Post,
					body: JSON.stringify({
						code,
						clientId: CLIENT_ID,
						redirectUri: `${BASE_WEB_URL}/oauth/callback`
					})
				});

				saveState(LocalStorageKeys.DiscordPack, data);
				saveState(LocalStorageKeys.LastSync, Date.now());
				writeAuthenticated(true);
				mergePack(data);
				setLoading(false);

				return push('/');
			} catch (error) {
				setLoading(false);
				return push('/oauth/auth-failed');
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		void finalizeAuthFlow(
			query.code ??
				new URL(window?.location.href).searchParams.get('code') ??
				CodeMatchRegex.exec(window?.location.search || asPath)?.groups?.code ??
				null
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<NextSeo title="OAUTH Callback" nofollow noindex robotsProps={robotBlockingPageProps} />
			<GeneralPage loading={loading} />
		</>
	);
};

export default OauthCallback;

declare module 'querystring' {
	interface ParsedUrlQuery {
		code: string | null;
	}
}
