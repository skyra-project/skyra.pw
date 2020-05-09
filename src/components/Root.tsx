import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import RedirectRoute from 'components/RedirectRoute';
import { history, oauthURL, serverURL } from 'meta/constants';
import theme from 'meta/theme';
import CommandsPage from 'pages/Commands';
import DashboardRootPage from 'pages/Dashboard/Root';
import HomePage from 'pages/HomePage';
import MusicPage from 'pages/Music/Music';
import NotFoundPage from 'pages/NotFound';
import GuildCallbackPage from 'pages/oauth/GuildCallbackPage';
import OAuthCallbackPage from 'pages/oauth/OAuthCallbackPage';
import StatusPage from 'pages/Status';
import { Route, Router, Switch } from 'react-router-dom';
import React from 'reactn';
import { ServiceWorkerProvider } from 'ServiceWorkerContext';
import ServiceWorkerUpdater from './ServiceWorkerUpdater';

export default () => (
	<ServiceWorkerProvider>
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ServiceWorkerUpdater />
				<Router history={history}>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/oauth/callback" component={OAuthCallbackPage} />
						<Route exact path="/oauth/guild" component={GuildCallbackPage} />
						<Route exact path="/commands" component={CommandsPage} />
						<Route exact path="/status" component={StatusPage} />
						<AuthenticatedRoute path="/guilds/:guildID/:pageName?" component={DashboardRootPage} />
						<Route exact path="/music/:guildID" component={MusicPage} />
						<RedirectRoute path="/login" redirectUri={oauthURL.toString()} />
						<RedirectRoute path="/join" redirectUri={serverURL} />
						<Route component={NotFoundPage} />
					</Switch>
				</Router>
			</ThemeProvider>
		</StylesProvider>
	</ServiceWorkerProvider>
);
