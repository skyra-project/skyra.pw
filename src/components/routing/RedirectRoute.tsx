import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

export interface RedirectRouteProps {
	redirectUri: string;
}

const RedirectRoute: FC<RedirectRouteProps> = ({ redirectUri, children }) => {
	const router = useRouter();

	useEffect(() => {
		router.replace(redirectUri);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};

export default RedirectRoute;
