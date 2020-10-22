import { useRouter } from 'next/router';
import React, { FC, Fragment, memo, useEffect } from 'react';

const ScrollToTop: FC = () => {
	const router = useRouter();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [router.pathname]);

	return <Fragment />;
};

export default memo(ScrollToTop);
