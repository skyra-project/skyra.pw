import { LocalStorageKeys } from 'lib/util/constants';
import { loadState, saveState } from 'lib/util/util';
import React, { Context, createContext, Dispatch, FC, useEffect, useState } from 'react';

interface CookieConsentContext {
	/** Whether to allow cookies or not */
	allowsCookies: boolean | null;
	/** The dispatch to set the new value */
	dispatch: Dispatch<any>;
}

const CookieConsentContext: Context<CookieConsentContext> = createContext({} as CookieConsentContext);

const initialState = loadState(LocalStorageKeys.hasCookieConsent) as string | null;

const CookieConsentProvider: FC = ({ children }) => {
	const [allowsCookies, dispatch] = useState(initialState);

	useEffect(() => {
		saveState(LocalStorageKeys.hasCookieConsent, allowsCookies);
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
