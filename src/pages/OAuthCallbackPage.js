import React, { Component, Fragment, setGlobal } from 'reactn';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

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


		if (data.error || !data.user || !data.access_token) {
			this.setState({ error: data.error || 'Error fetching token.' });
			return;
		}

		const { user } = data;
		saveState('discord_token', data.access_token);
		saveState('discord_user', user);

		setGlobal({ user, token: data.access_token, authenticated: true });

		history.push('/');
	};

	render() {
		const { error } = this.state;
		return error ? (
			<Container>
				<Fragment>
					<div>
						<h1>Authentication Error</h1>
						<p>{error}</p>
						<Button href="/" variant="contained" color="secondary">
							Go Back
						</Button>
					</div>
				</Fragment>
			</Container>
		) : (
			<Fragment>
				<LinearProgress variant="query" />
				<Container>
					<div>
						<h1>Loading...</h1>
					</div>
				</Container>
			</Fragment>
		);
	}
}

export default DiscordAuthCallbackPage;
