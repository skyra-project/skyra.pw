import { createSeoProps } from '@config/next-seo.config';
import { setAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack } from '@contexts/DiscordPackContext';
import GeneralLayout from '@layout/General';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@routing/Link';
import { BASE_WEB_URL, CLIENT_ID, LocalStorageKeys } from '@utils/constants';
import { apiFetch, saveState } from '@utils/util';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			display: 'flex',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			height: 'calc(100vh - 128px - 200px)'
		},
		smallerHeader1: {
			fontSize: theme.typography.pxToRem(theme.spacing(8))
		},
		largerSubtitle1: {
			fontSize: theme.typography.pxToRem(theme.spacing(3))
		}
	})
);

const OauthCallback: NextPage = () => {
	const [error, setError] = useState(null);
	const mergePack = mergeDiscordPack();
	const writeAuthenticated = setAuthenticated();
	const router = useRouter();
	const classes = useStyles();

	// @ts-ignore temp
	const finalizeAuthFlow = useCallback(
		async (code: string | null) => {
			const data: any = await apiFetch(`/oauth/callback`, {
				method: 'POST',
				body: JSON.stringify({
					code,
					clientId: CLIENT_ID,
					redirectUri: `${BASE_WEB_URL}/oauth/callback`
				})
			});

			if (data.error || !data.user) {
				setError(data.error || 'Error fetching user data.');
				return;
			}

			saveState(LocalStorageKeys.DiscordPack, data);

			writeAuthenticated(true);
			mergePack(data);

			router.push('/');
		},
		[mergePack, router, writeAuthenticated]
	);

	useEffect(() => {
		finalizeAuthFlow(router.query.code);
	});

	return (
		<>
			<NextSeo
				{...createSeoProps({
					title: 'OAUTH Callback',
					additionalMetaTags: [
						{ name: 'robots', content: 'noindex, nofollow' },
						{ name: 'googlebot', content: 'noindex, nofollow' }
					]
				})}
			/>
			<GeneralLayout loading={!error}>
				{error && (
					<Box className={classes.box}>
						<Container>
							<>
								<Typography variant="h1" color="textPrimary" classes={{ root: classes.smallerHeader1 }}>
									Authentication Error
								</Typography>
								<Typography variant="subtitle1" color="textPrimary" classes={{ root: classes.largerSubtitle1 }}>
									{error}
								</Typography>
								<Link href="/">
									<Button variant="contained" color="secondary">
										Go Back
									</Button>
								</Link>
							</>
						</Container>
					</Box>
				)}
			</GeneralLayout>
		</>
	);
};

export default OauthCallback;

declare module 'querystring' {
	interface ParsedUrlQuery {
		code: string | null;
	}
}
