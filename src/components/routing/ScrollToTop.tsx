import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';

const ScrollToTop = () => {
	const router = useRouter();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [router.pathname]);

	return <Fragment />;
};

export default ScrollToTop;
