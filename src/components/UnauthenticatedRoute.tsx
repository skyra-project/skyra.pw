import React, { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useGlobal } from 'reactn';

export interface UnauthenticatedRouteProps extends RouteProps {
	component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
	componentProps?: RouteComponentProps<any>;
}

const UnauthenticatedRoute = ({ component: Component, componentProps, ...rest }: UnauthenticatedRouteProps) => {
	const [authenticated] = useGlobal('authenticated');
	return <Route {...rest} render={props => (authenticated ? <Redirect to="/" /> : <Component {...componentProps} {...props} />)} />;
};

export default UnauthenticatedRoute;
