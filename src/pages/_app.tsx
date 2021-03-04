import '@config/globals.css';
import DefaultSeoProps from '@config/SEO/DefaultSeoProps';
import theme from '@config/theme';
import { MobileContextProvider } from '@contexts/MobileContext';
import { useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import CookieWarning from '@presentational/CookieConsent/WarningSnackbar';
import type { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import React, { useEffect } from 'react';

const CookieConsentProvider = dynamic(() => import('@contexts/CookieContext'));
const DiscordPackProvider = dynamic(() => import('@contexts/DiscordPackContext'));
const AuthenticatedProvider = dynamic(() => import('@contexts/AuthenticationContext'));

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}

		window.$discordMessage = {
			avatars: {
				default: 'blue',
				favna: '/avatars/favna.png',
				skyra: '/avatars/skyra.png'
			},
			profiles: {
				skyra: {
					author: 'Skyra',
					avatar: '/avatars/skyra.png',
					bot: true,
					verified: true,
					roleColor: '#1E88E5'
				},
				favna: {
					author: 'Favna',
					avatar: '/avatars/favna.png',
					roleColor: '#FF0000'
				},
				kyra: {
					author: 'Kyra',
					avatar: '/avatars/kyra.png',
					roleColor: '#FF9D01'
				}
			}
		};

		if (process.env.NODE_ENV === 'production') {
			console.log(
				'%cHold Up!',
				`color: ${theme.palette.primary.main}; font-size: 72px; font-weight: bold; -webkit-text-stroke: 2px ${theme.palette.common.black}`
			);
			console.log(
				[
					'%cIf someone told you to copy/paste something here,',
					'it is likely that you are being tricked and/or scammed.',
					'For more information check out\n\nhttps://en.wikipedia.org/wiki/Self-XSS'
				].join(' '),
				'font-size: 16px;'
			);
			console.log(
				[
					'%cWhile we do everything in our power to ensure your security,',
					'pasting anything in here could give attackers access to your private information!'
				].join(' '),
				'font-size: 18px; font-weight: bold; color: red;'
			);
			console.log(
				'%cIf you do understand exactly what you are doing, you should join the Skyra Development team https://join.skyra.pw',
				'font-size: 16px;'
			);
		}
	}, []);

	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<Head>
				<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta httpEquiv="Expires" content="1y" />
				<meta httpEquiv="Pragma" content="1y" />
				<meta httpEquiv="Cache-Control" content="1y" />

				<meta httpEquiv="Page-Enter" content="RevealTrans(Duration=2.0,Transition=2)" />
				<meta httpEquiv="Page-Exit" content="RevealTrans(Duration=3.0,Transition=12)" />

				<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
				<link rel="icon" type="image/png" sizes="194x194" href="/icons/android-chrome-194x194.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color={theme.palette.primary.main} />
				<link rel="shortcut icon" href="/icons/favicon.ico" />
				<link rel="apple-touch-startup-image" href="/icons/apple-startup.png" />
			</Head>
			<DefaultSeo {...DefaultSeoProps} />

			<ThemeProvider theme={theme}>
				<MobileContextProvider value={{ isMobile }}>
					<AuthenticatedProvider>
						<DiscordPackProvider>
							<CookieConsentProvider>
								<CssBaseline />
								<Component {...pageProps} />
								<NextNprogress color="#0A5699" startPosition={0.3} stopDelayMs={200} height={3} />
								<CookieWarning />
							</CookieConsentProvider>
						</DiscordPackProvider>
					</AuthenticatedProvider>
				</MobileContextProvider>
			</ThemeProvider>
		</>
	);
};

export default App;

declare global {
	type DiscordMessageAvatars = Record<string, string> &
		Partial<{
			blue: string;
			gray: string;
			green: string;
			orange: string;
			red: string;
		}>;

	type DiscordMessageProfile = Partial<{
		author: string;
		avatar: string;
		bot: boolean;
		verified: boolean;
		roleColor: string;
	}>;

	interface Window {
		$discordMessage: Partial<{
			avatars: DiscordMessageAvatars;
			profiles: Record<string, DiscordMessageProfile>;
			defaultTheme: string;
			defaultMode: string;
			defaultBackground: 'discord' | 'none';
		}>;
	}
}
