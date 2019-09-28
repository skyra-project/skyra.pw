import React from 'reactn';
import { Router, Route, Switch } from 'react-router-dom';

import { history, oauthURL } from 'meta/constants';
import UnauthenticatedRoute from 'components/UnauthenticatedRoute';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import OAuthCallbackPage from 'pages/OAuthCallbackPage';
import HomePage from 'pages/Index';
import GuildPage from 'pages/GuildPage';
import CommandsPage from 'pages/CommandsPage';

const Root = () => (
	<Router history={history}>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/oauth/callback" component={OAuthCallbackPage} />
			<Route exact path="/commands" component={CommandsPage} />
			<AuthenticatedRoute path="/guilds/:guildID" component={GuildPage} />
			<UnauthenticatedRoute path="/login" component={() => window.location.replace(oauthURL.toString())} />
			<Route component={() => 'Not found'} />
		</Switch>
	</Router>
);

export default Root;
