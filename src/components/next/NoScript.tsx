import React, { FC, useEffect, useState } from 'react';

const NoScript: FC = ({ children }) => {
	const [isComponentMounted, setIsComponentMounted] = useState(false);

	// We don't want to send 'react-dom/server' to the client
	let ReactDOMServer;
	if (typeof window === 'undefined') {
		ReactDOMServer = require('react-dom/server');
	}

	useEffect(() => setIsComponentMounted(true), []);

	if (!ReactDOMServer || !isComponentMounted) {
		return null;
	}

	const staticMarkup = ReactDOMServer.renderToStaticMarkup(children);
	// eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
	return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

export default NoScript;
