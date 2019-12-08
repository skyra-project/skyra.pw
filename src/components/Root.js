import React from 'reactn';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';

import theme from 'meta/theme';
import { history, oauthURL } from 'meta/constants';
import UnauthenticatedRoute from 'components/UnauthenticatedRoute';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import CssBaseline from 'components/CssBaseline';
import OAuthCallbackPage from 'pages/oauth/OAuthCallbackPage';
import GuildCallbackPage from 'pages/oauth/GuildCallbackPage';
import HomePage from 'pages/Index';
import DashboardRootPage from 'pages/Dashboard/Root';
import CommandsPage from 'pages/Commands';
import NotFoundPage from 'pages/NotFound';
import StatusPage from 'pages/Status';

const Root = () => (
	<StylesProvider injectFirst>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/oauth/callback" component={OAuthCallbackPage} />
					<Route exact path="/oauth/guild" component={GuildCallbackPage} />
					<Route exact path="/commands" component={CommandsPage} />
					<Route exact path="/status" component={StatusPage} />
					<AuthenticatedRoute path="/guilds/:guildID/:pageName?" component={DashboardRootPage} />
					<UnauthenticatedRoute path="/login" component={() => window.location.replace(oauthURL.toString())} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		</ThemeProvider>
	</StylesProvider>
);

export default Root;
