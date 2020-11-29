import { LocalStorageKeys } from '#utils/constants';
import { loadState, saveState } from '#utils/util';
import React, { Context, createContext, Dispatch, FC, useEffect, useState } from 'react';

interface CookieConsentContext {
	/** Whether to allow cookies or not */
	allowsCookies: boolean | null;
	/** The dispatch to set the new value */
	dispatch: Dispatch<any>;
}

const CookieConsentContext: Context<CookieConsentContext> = createContext({} as CookieConsentContext);

const initialState = loadState<string | null>(LocalStorageKeys.HasCookieConsent);

const CookieConsentProvider: FC = ({ children }) => {
	const [allowsCookies, dispatch] = useState(initialState);

	useEffect(() => {
		saveState(LocalStorageKeys.HasCookieConsent, allowsCookies);
	}, [allowsCookies]);

	return (
		<CookieConsentContext.Provider
			value={{
				allowsCookies: allowsCookies !== null ? Boolean(allowsCookies) : null,
				dispatch
			}}
		>
			{children}
		</CookieConsentContext.Provider>
	);
};

export { CookieConsentContext, CookieConsentProvider };
