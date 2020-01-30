import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import UnauthenticatedRoute from 'components/UnauthenticatedRoute';
import { history, oauthURL, serverURL } from 'meta/constants';
import theme from 'meta/theme';
import CommandsPage from 'pages/Commands';
import DashboardRootPage from 'pages/Dashboard/Root';
import HomePage from 'pages/Index';
import MusicPage from 'pages/Music/Music';
import NotFoundPage from 'pages/NotFound';
import GuildCallbackPage from 'pages/oauth/GuildCallbackPage';
import OAuthCallbackPage from 'pages/oauth/OAuthCallbackPage';
import StatusPage from 'pages/Status';
import { Route, Router, Switch } from 'react-router-dom';
import React from 'reactn';

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
					<Route exact path="/music/:guildID" component={MusicPage} />
					<UnauthenticatedRoute
						path="/login"
						component={() => {
							window.location.replace(oauthURL.toString());
							return null;
						}}
					/>
					<UnauthenticatedRoute
						path="/join"
						component={() => {
							window.location.replace(serverURL);
							return null;
						}}
					/>
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		</ThemeProvider>
	</StylesProvider>
);

export default Root;
