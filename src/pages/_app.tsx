import { DefaultSeo as DefaultSeoProps } from '@config/next-seo.config';
import theme from '@config/theme';
import { DashboardPack } from '@config/types/ApiData';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { LocalStorageKeys } from '@utils/constants';
import { loadState } from '@utils/util';
import { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { withInit } from 'reactn';
import addReactNDevTools from 'reactn-devtools';

const NoScript = dynamic(() => import('@next/NoScript'));

const discordPack = loadState<DashboardPack>(LocalStorageKeys.DiscordPack);
const INITIAL_STATE = {
	authenticated: Boolean(discordPack) && Boolean(discordPack?.user),
	pack: discordPack ?? {
		user: null
	}
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
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

		if (process.env.NODE_ENV === 'development') {
			addReactNDevTools();
		}

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

	return (
		<>
			<DefaultSeo {...DefaultSeoProps} />
			<Head>
				<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta httpEquiv="Expires" content="1y" />
				<meta httpEquiv="Pragma" content="1y" />
				<meta httpEquiv="Cache-Control" content="1y" />

				{/* Internet Explorer Meta Tags */}
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

				<NoScript>
					<span>
						<h1>Uh-oh. Seems like JavaScript isn't enabled</h1>
						<h4>Make sure that your browser or any antivirus software isn't blocking JavaScript execution</h4>
					</span>
				</NoScript>
			</Head>

			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<style jsx global>{`
						/* Overwrite Chromium browser scrollbar */
						*::-webkit-scrollbar {
							width: 0.45em;
						}
						*::-webkit-scrollbar:hover {
							background-color: rgba(0, 0, 0, 0.09);
						}
						*::-webkit-scrollbar-track {
							opacity: 0;
							transition: all 0.5s;
							-webkit-transition: all 0.5s;
						}
						*::-webkit-scrollbar-thumb {
							background-color: rgba(113, 137, 218, 0.4);
							border-radius: 4px;
						}
						*::-webkit-scrollbar-thumb:hover {
							background-color: rgba(105, 130, 216, 0.4);
							transition: background-color 0.5s ease;
						}
						*::-webkit-scrollbar-thumb:vertical {
							border-radius: 100px;
							-webkit-border-radius: 100px;
						}
						*::-webkit-scrollbar-thumb:vertical:active {
							border-radius: 100px;
							-webkit-border-radius: 100px;
						}

						/* Whitney font face to match Discord */
						@font-face {
							/* Whitney-Light */
							font-family: Whitney;
							font-style: light;
							font-weight: 300;
							src: url('/fonts/Whitney-Light.woff') format('woff');
						}
						@font-face {
							/* Whitney-Normal */
							font-family: Whitney;
							font-style: normal;
							font-weight: 500;
							src: url('/fonts/Whitney-Normal.woff') format('woff');
						}
						@font-face {
							/* Whitney-Medium-Regular */
							font-family: Whitney;
							font-style: medium;
							font-weight: 600;
							src: url('/fonts/Whitney-Medium-Regular.woff') format('woff');
						}
						@font-face {
							/* Whitney-Medium-Extra */
							font-family: WhitneyMedium;
							font-style: medium;
							font-weight: 600;
							src: url('/fonts/Whitney-Medium-Extra.woff') format('woff');
						}
						@font-face {
							/* Whitney-Bold */
							font-family: Whitney;
							font-style: bold;
							font-weight: 700;
							src: url('/fonts/Whitney-Bold.woff') format('woff');
						}

						/* Setting default CSS for Discord messages */
						.discord-message,
						.discord-messages {
							font-family: Whitney, Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
						}

						.discord-messages {
							border-radius: 4px;
						}

						.chrome-picker > div:nth-child(2) > *,
						.chrome-picker > div:nth-child(2) input {
							font-family: Roboto, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
								sans-serif !important;
						}

						/* Discord's CSS for rendering inline code */
						code {
							padding: 0.2em;
							margin: -0.2em 0;
							border-radius: 3px;
							font-size: 85%;
							font-family: Consolas, Andale Mono WT, Andale Mono, Lucida Console, Lucida Sans Typewriter, DejaVu Sans Mono,
								Bitstream Vera Sans Mono, Liberation Mono, Nimbus Mono L, Monaco, Courier New, Courier, monospace;
							text-indent: 0;
							border: none;
							white-space: pre-wrap;
							background-color: #202225;
						}

						noscript {
							position: absolute;
							background-color: #16171d;
							top: 0;
							left: 0;
							height: 100%;
							width: 100%;
						}

						noscript span {
							font-family: 'Roboto';
							margin: 0;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							color: white;
						}
					`}</style>
					<Component {...pageProps} />
				</ThemeProvider>
			</StylesProvider>
		</>
	);
};

export default withInit<typeof INITIAL_STATE, Record<PropertyKey, unknown>, AppProps>(INITIAL_STATE)(App);

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

declare module 'reactn/default' {
	export interface State {
		authenticated: boolean;
		pack?: DashboardPack;
	}
}
