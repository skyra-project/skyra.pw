import type { NuxtAppConfig } from 'nuxt/schema';

export const BaseUrl = 'https://wolfstar.rocks';
export const DefaultSeoProps: NuxtAppConfig['head'] = {
	charset: 'utf-8',
	viewport: 'width=device-width, initial-scale=1',
	title: 'WolfStar',
	titleTemplate: '%s - WolfStar',
	htmlAttrs: { lang: 'en_GB' },
	link: [
		{ rel: 'alternate', href: 'https://wolfstar.rocks' },
		{ rel: 'canonical', href: 'https://wolfstar.rocks' },
		{ rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
		{ rel: 'apple-touch-startup-image', href: '/icons/apple-startup.png' },
		{ rel: 'icon', href: '/icons/android-chrome-192x192.png' },
		{ rel: 'icon', href: '/favicon.ico' },
		{ rel: 'icon', href: '/icons/favicon-16x16.png' },
		{ rel: 'icon', href: '/icons/android-chrome-192x192.png' },
		{ rel: 'icon', href: '/icons/favicon-32x32.png' },
		{ rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg' },
		{ rel: 'shortcut icon', href: '/favicon.ico' }
	],
	meta: [
		{ 'http-equiv': 'Cache-Control', content: '1y' },
		{ 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
		{ 'http-equiv': 'Expires', content: '1y' },
		{
			'http-equiv': 'Page-Enter',
			content: 'RevealTrans(Duration=2.0,Transition=2)'
		},
		{
			'http-equiv': 'Page-Exit',
			content: 'RevealTrans(Duration=3.0,Transition=12)'
		},
		{ 'http-equiv': 'Pragma', content: '1y' },
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
		{ name: 'apple-mobile-web-app-title', content: 'WolfStar Dashboard' },
		{ name: 'application-name', content: 'WolfStar' },
		{ name: 'msapplication-TileColor', content: '#fd171b' },
		{
			name: 'msapplication-TileImage',
			content: '/icons/mstile-144x144.png'
		},
		{ name: 'msapplication-config', content: '/browserconfig.xml' },
		{ name: 'theme-color', content: '#fd171b' },
		{ name: 'revisit-after', content: '7 days' },
		{ name: 'url', content: BaseUrl },
		{ name: 'identifier-URL', content: BaseUrl },
		{ name: 'shortlink', content: BaseUrl },
		{
			name: 'keywords',
			content: 'discord, bot, wolfstar, moderation, automation, wolfstar, cyborg, pokemon'
		},
		{
			name: 'summary',
			content: 'WolfStar is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.'
		},
		{
			name: 'subject',
			content: 'Dashboard for WolfStar, a multifunctional Discord bot.'
		},
		{
			name: 'robots',
			content: 'archive,follow,imageindex,index,odp,snippet,translate'
		},
		{ name: 'googlebot', content: 'index,follow' },
		{ name: 'author', content: 'WolfStar Project, contact@wolfstar.rocks' },
		{ name: 'owner', content: 'WolfStar Project, contact@wolfstar.rocks' },
		{
			name: 'designer',
			content: 'WolfStar Project, contact@wolfstar.rocks'
		},
		{ name: 'reply-to', content: 'contact@wolfstar.rocks' },
		{ name: 'target', content: 'all' },
		{ name: 'audience', content: 'all' },
		{ name: 'coverage', content: 'Worldwide' },
		{ name: 'distribution', content: 'Global' },
		{ name: 'rating', content: 'safe for kids' },
		{ name: 'HandheldFriendly', content: 'True' },
		{ property: 'og:email', content: 'contact@wolfstar.rocks' },
		{
			property: 'og:description',
			content: 'WolfStar is a multipurpose Discord bot designed to handle most tasks, helping users manage their servers easily.'
		},
		{ property: 'og:image:alt', content: 'OpenGraphImage' },
		{ property: 'og:image:height', content: '512' },
		{ property: 'og:image:width', content: '1024' },
		{
			property: 'og:image',
			content: 'https://wolfstar.rocks/icons/opengraph.png'
		},
		{ property: 'og:locale', content: 'en_GB' },
		{ property: 'og:site_name', content: 'WolfStar Dashboard' },
		{ property: 'og:title', content: 'WolfStar Dashboard' },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: BaseUrl }
	]
};

export const robotBlockingPageProps = 'nosnippet,notranslate,noimageindex,noarchive,max-snippet:-1,max-image-preview:none,max-video-preview:-1';
