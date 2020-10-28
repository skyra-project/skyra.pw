import { mergeDefault } from '@sapphire/utilities';
import { DefaultSeoProps, NextSeoProps } from 'next-seo';
import theme from './theme';

type KeyedObject = Record<PropertyKey, unknown>;

export const BaseUrl = 'https://beta.skyra.pw';
export const DefaultSeo: DefaultSeoProps & KeyedObject = {
	titleTemplate: 'Skyra | %s',
	title: 'Home',
	description: 'Skyra is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.',
	canonical: BaseUrl,
	additionalMetaTags: [
		{ name: 'url', content: BaseUrl },
		{ name: 'identifier-URL', content: BaseUrl },
		{ name: 'shortlink', content: BaseUrl },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'keywords', content: 'discord, bot, skyra, moderation, automation, kyra, favna, kyranet, cyborg, pokemon' },
		{
			name: 'summary',
			content: 'Skyra is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.'
		},
		{ name: 'subject', content: 'Dashboard for Skyra, a multifunctional Discord bot.' },
		{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
		{ name: 'googlebot', content: 'index,follow' },
		{ name: 'author', content: `Skyra Project, contact@skyra.pw` },
		{ name: 'owner', content: `Skyra Project, contact@skyra.pw` },
		{ name: 'designer', content: `Skyra Project, contact@skyra.pw` },
		{ name: 'reply-to', content: 'contact@skyra.pw' },
		{ name: 'target', content: 'all' },
		{ name: 'audience', content: 'all' },
		{ name: 'coverage', content: 'Worldwide' },
		{ name: 'distribution', content: 'Global' },
		{ name: 'rating', content: 'safe for kids' },
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
		{ name: 'HandheldFriendly', content: 'True' },
		{ name: 'apple-mobile-web-app-title', content: 'Skyra Dashboard' },
		{ name: 'application-name', content: 'Skyra' },
		{ name: 'msapplication-TileColor', content: theme.palette.primary.main },
		{ name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' },
		{ name: 'msapplication-config', content: '/icons/browserconfig.xml' },
		{ name: 'theme-color', content: theme.palette.primary.main },
		{ name: 'revisit-after', content: '7 days' },
		{ property: 'og:email', content: 'contact@skyra.pw' }
	],
	openGraph: {
		title: 'Skyra Dashboard',
		url: BaseUrl,
		images: [
			{
				url: `${BaseUrl}/icons/opengraph.png`,
				alt: 'OpenGraphImage',
				width: 1024,
				height: 512
			}
		],
		type: 'website',
		locale: 'en_US',
		site_name: 'Skyra',
		profile: {
			firstName: 'Skyra Project',
			username: 'Skyra',
			gender: 'female'
		}
	},
	twitter: {
		handle: '@SkyraBot',
		site: '@SkyraBot',
		cardType: 'summary'
	}
};

export const createSeoProps = (seoProps?: NextSeoProps & KeyedObject) => mergeDefault(DefaultSeo, seoProps);
