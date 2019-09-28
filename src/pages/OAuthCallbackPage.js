import React, { Component, setGlobal } from 'reactn';

import { saveState, apiFetch } from 'meta/util';
import { history, BASE_WEB_URL } from 'meta/constants';

class DiscordAuthCallbackPage extends Component {
	state = {
		error: null
	};

	componentWillMount() {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		this.finalizeAuthFlow(code);
	}

	finalizeAuthFlow = async code => {
		const data = await apiFetch(`/oauth/callback`, {
			method: 'POST',
			body: {
				code,
				redirect_uri: `${BASE_WEB_URL}/oauth/callback`
			}
		});

		const { user } = data;

		if (data.error || !user || !data.access_token) {
			this.setState({ error: data.error || 'Error fetching token.' });
			return;
		}

		saveState('discord_token', data.access_token);
		saveState('discord_user', user);

		setGlobal({ user, token: data.access_token, authenticated: true });

		history.push('/');
	};

	render() {
		let { error } = this.state;
		return (
			<div>
				<h1>{(error && `Error: ${error}`) || 'Loading...'}</h1>
				{error && <a href="/">Back home</a>}
			</div>
		);
	}
}

export default DiscordAuthCallbackPage;
