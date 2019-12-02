import React, { useGlobal } from 'reactn';
import { Route, Redirect } from 'react-router-dom';

const UnauthenticatedRoute = ({ component: Component, componentProps, ...rest }) => {
	const [global] = useGlobal();
	return (
		<Route {...rest} render={props => (global.authenticated ? <Redirect to="/" /> : <Component {...componentProps} {...props} />)} />
	);
};

export default UnauthenticatedRoute;
