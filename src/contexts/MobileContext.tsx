import { createContext, useContext } from 'react';

export interface MobileContextState {
	isMobile: boolean;
}

export const MobileContextDefaults: MobileContextState = {
	isMobile: false
};

export const MobileContext = createContext(MobileContextDefaults);
export const MobileContextProvider = MobileContext.Provider;

export const useMobileContext = () => {
	const context = useContext(MobileContext);

	if (!context) {
		throw new Error('useMobileContext must be used within a MobileContextProvider');
	}

	return context;
};
