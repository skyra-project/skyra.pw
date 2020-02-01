import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export interface RedirectRouteProps extends RouteProps {
	redirectUri: string;
	path: string;
}

const RedirectRoute = ({ redirectUri, ...rest }: RedirectRouteProps) => (
	<Route
		{...rest}
		component={() => {
			window.location.replace(redirectUri);
			return null;
		}}
	/>
);

export default RedirectRoute;
