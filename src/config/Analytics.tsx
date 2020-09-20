import { initializeGoogleAnalytics, logPageView } from '@utils/google-analytics';
import React, { useEffect } from 'react';

const Analytics = () => {
	useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initializeGoogleAnalytics();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}, []);

	return <></>;
};

export default Analytics;

declare global {
	interface Window {
		GA_INITIALIZED: boolean;
	}
}
