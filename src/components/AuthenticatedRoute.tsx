import React, { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useGlobal } from 'reactn';

export interface AuthenticatedRouteProps extends RouteProps {
	component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
	componentProps?: RouteComponentProps<any>;
}

const AuthenticatedRoute = ({ component: Component, componentProps, ...rest }: AuthenticatedRouteProps) => {
	const [authenticated] = useGlobal('authenticated');

	return <Route {...rest} render={props => (authenticated ? <Component {...componentProps} {...props} /> : <Redirect to="/login" />)} />;
};

export default AuthenticatedRoute;
