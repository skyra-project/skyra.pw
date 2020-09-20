import ReactGA from 'react-ga';

export const initializeGoogleAnalytics = () => {
	// TODO: Put correct Google Analytics ID here
	ReactGA.initialize('UA-114064877-3', { gaOptions: {} });
	ReactGA.set({ anonymizeIp: true });
};

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
	if (category && action) {
		ReactGA.event({ category, action });
	}
};

export const logException = (description = '', fatal = false) => {
	if (description) {
		ReactGA.exception({ description, fatal });
	}
};
