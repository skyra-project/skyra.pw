import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import GeneralPage from 'components/GeneralPage';
import { BASE_WEB_URL, history, CLIENT_ID } from 'lib/util/constants';
import { apiFetch, saveState } from 'lib/util/util';
import React, { setGlobal, useEffect, useState } from 'reactn';

function DiscordAuthCallbackPage() {
	const [error, setError] = useState(null);

	async function finalizeAuthFlow(code: string | null) {
		const data: any = await apiFetch(`/oauth/callback`, {
			method: 'POST',
			body: JSON.stringify({
				code,
				clientId: CLIENT_ID,
				redirectUri: `${BASE_WEB_URL}/oauth/callback`
			})
		});

		if (data.error || !data.user) {
			setError(data.error || 'Error fetching user data.');
			return;
		}

		saveState('discord_pack', data);

		setGlobal({ authenticated: true, pack: data });

		history.push('/');
	}

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		finalizeAuthFlow(code);
	});

	return (
		<GeneralPage loading={!error}>
			{error && (
				<Container>
					<div>
						<h1>Authentication Error</h1>
						<p>{error}</p>
						<Button href="/" variant="contained" color="secondary">
							Go Back
						</Button>
					</div>
				</Container>
			)}
		</GeneralPage>
	);
}

export default DiscordAuthCallbackPage;
