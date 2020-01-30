import { RootState } from 'meta/typings/Reactn';
import React, { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useGlobal } from 'reactn';

export interface AuthenticatedRouteProps extends RouteProps {
	component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
	componentProps?: RouteComponentProps<any>;
}

const AuthenticatedRoute = ({ component: Component, componentProps, ...rest }: AuthenticatedRouteProps) => {
	const [global] = useGlobal<RootState>();

	return (
		<Route
			{...rest}
			render={props => (global.authenticated ? <Component {...componentProps} {...props} /> : <Redirect to="/login" />)}
		/>
	);
};

export default AuthenticatedRoute;
