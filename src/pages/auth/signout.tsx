import { OauthFlattenedUser } from '@config/types/ApiData';
import { useGlobalState } from '@contexts/GlobalStateContext';
import { LocalStorageKeys } from '@utils/constants';
import { apiFetch, clearState } from '@utils/util';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignOut: NextPage = () => {
	const { toggleAuthenticated, updatePack } = useGlobalState();
	const router = useRouter();

	useEffect(() => {
		apiFetch<{ user: OauthFlattenedUser }>('/oauth/logout', { method: 'POST' });
		toggleAuthenticated();
		updatePack({ user: null });
		clearState(LocalStorageKeys.DiscordPack);
		clearState(LocalStorageKeys.LastSync);
		router.replace('/');
	});

	return null;
};

export default SignOut;
