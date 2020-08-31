import Root from 'components/Root';
import theme from 'lib/theme';
import { DashboardPack } from 'lib/types/ApiData';
import { LocalStorageKeys } from 'lib/util/constants';
import { loadState } from 'lib/util/util';
import { render } from 'react-dom';
import React, { setGlobal } from 'reactn';
import addReactNDevTools from 'reactn-devtools';
import './index.css';

const rootElement = document.getElementById('root');

const discordPack = loadState<DashboardPack>(LocalStorageKeys.DiscordPack);

setGlobal({
	authenticated: Boolean(discordPack) && Boolean(discordPack?.user),
	pack: discordPack ?? {
		user: null
	}
});

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

render(<Root />, rootElement);

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

if (process.env.NODE_ENV === 'development') {
	addReactNDevTools();
	if ((module as HotNodeModule).hot) {
		(module as HotNodeModule).hot.accept('./components/Root.tsx', () => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const NextApp = require('./components/Root.tsx').default;
			render(<NextApp />, rootElement);
		});
	}
}

interface HotNodeModule extends NodeModule {
	hot: any;
}

declare module 'reactn/default' {
	export interface State {
		authenticated: boolean;
		pack: DashboardPack;
	}
}

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
