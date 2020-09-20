import React, { createContext, useContext, useEffect, useMemo, useState, PropsWithChildren } from 'react';
import * as serviceWorker from './serviceWorker';

const ServiceWorkerContext = createContext<ServiceWorkerProviderProps | null>(null);

interface ServiceWorkerEvent extends Event {
	target: (Partial<ServiceWorker> & EventTarget) | null;
}

interface ServiceWorkerProviderProps {
	assetsUpdateReady: boolean;
	assetsCached: boolean;
	updateAssets: () => void;
}

function ServiceWorkerProvider(props: PropsWithChildren<unknown>) {
	const [waitingServiceWorker, setWaitingServiceWorker] = useState<ServiceWorker | null>(null);
	const [assetsUpdateReady, setAssetsUpdateReady] = useState(false);
	const [assetsCached, setAssetsCached] = useState(false);

	const value: ServiceWorkerProviderProps = useMemo(
		() => ({
			assetsUpdateReady,
			assetsCached,
			// Call when the user confirm update of application and reload page
			updateAssets: () => {
				if (waitingServiceWorker) {
					waitingServiceWorker.addEventListener('statechange', (event: ServiceWorkerEvent) => {
						if (event.target && event.target.state === 'activated') {
							window.location.reload();
						}
					});

					waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
				}
			}
		}),
		[assetsUpdateReady, assetsCached, waitingServiceWorker]
	);

	// Once on component mounted subscribe to Update and Succes events in
	// CRA's service worker wrapper
	useEffect(() => {
		serviceWorker.register({
			onUpdate: registration => {
				setWaitingServiceWorker(registration.waiting);
				setAssetsUpdateReady(true);
			},
			onSuccess: () => {
				setAssetsCached(true);
			}
		});
	}, []);

	return <ServiceWorkerContext.Provider value={value} {...props} />;
}

function useServiceWorker() {
	const context = useContext(ServiceWorkerContext);

	if (!context) {
		throw new Error('useServiceWorker must be used within a ServiceWorkerProvider');
	}

	return context;
}

export { ServiceWorkerProvider, useServiceWorker };
