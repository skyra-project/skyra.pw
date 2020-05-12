import React, { Component } from 'react';
import NotFound from 'pages/NotFound';

type ErrorBoundaryProps = Record<PropertyKey, unknown>;
type ErrorBoundaryState = Record<PropertyKey, unknown> & { hasError: boolean };

export default class extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		console.log(error);
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	// componentDidCatch(error, errorInfo) {
	// 	// You can also log the error to an error reporting service
	// 	logErrorToMyService(error, errorInfo);
	// }

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <NotFound />;
		}

		return this.props.children;
	}
}
