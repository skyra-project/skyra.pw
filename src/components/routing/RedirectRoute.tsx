import { useRouter } from 'next/router';
import { useEffect, type FC, type ReactNode } from 'react';

export interface RedirectRouteProps {
	redirectUri: string;
	children?: ReactNode;
}

const RedirectRoute: FC<RedirectRouteProps> = ({ redirectUri, children }) => {
	const router = useRouter();

	useEffect(() => {
		void router.replace(redirectUri);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};

export default RedirectRoute;
