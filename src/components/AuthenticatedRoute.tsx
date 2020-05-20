import { SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { ComponentType, createElement } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useGlobal } from 'reactn';

export interface AuthenticatedRouteProps extends RouteProps {
	component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
	componentProps?: SettingsPageProps;
}

const AuthenticatedRoute = ({ component, componentProps, ...rest }: AuthenticatedRouteProps) => {
	const [authenticated] = useGlobal('authenticated');

	return (
		<Route
			{...rest}
			render={(props: any) => (authenticated ? createElement(component, { ...componentProps, ...props }) : <Redirect to="/login" />)}
		/>
	);
};

export default AuthenticatedRoute;
