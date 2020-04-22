import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import GeneralPage from 'components/GeneralPage';
import { BASE_WEB_URL, history } from 'meta/constants';
import { apiFetch, saveState } from 'meta/util';
import React, { setGlobal, useEffect, useState } from 'reactn';

function DiscordAuthCallbackPage() {
	const [error, setError] = useState(null);

	async function finalizeAuthFlow(code) {
		const data = await apiFetch(`/oauth/callback`, {
			method: 'POST',
			body: JSON.stringify({
				code,
				// eslint-disable-next-line @typescript-eslint/camelcase
				redirect_uri: `${BASE_WEB_URL}/oauth/callback`
			})
		});

		if (data.error || !data.user || !data.access_token) {
			// TODO toast
			setError(data.error || 'Error fetching token.');
			return;
		}

		const { user } = data;
		saveState('discord_token', data.access_token);
		saveState('discord_user', user);

		setGlobal({ user, token: data.access_token, authenticated: true });

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
