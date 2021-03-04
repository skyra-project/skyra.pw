import { LocalStorageKeys } from '@utils/constants';
import { loadState, saveState } from '@utils/util';
import constate from 'constate';
import { useEffect, useState } from 'react';

const initialState = loadState<boolean | null>(LocalStorageKeys.HasCookieConsent);

const useCookieConsentState = () => {
	const [allowsCookies, setAllowsCookies] = useState<boolean | null>(initialState);

	useEffect(() => {
		saveState(LocalStorageKeys.HasCookieConsent, allowsCookies);
	}, [allowsCookies]);

	return {
		allowsCookies,
		setAllowsCookies
	};
};

export const [CookieConsentProvider, useCookieConsent, setCookieConsent] = constate(
	useCookieConsentState,
	(value) => value.allowsCookies,
	(value) => value.setAllowsCookies
);

export default CookieConsentProvider;
