import React, { Component } from 'reactn';
import { Redirect } from 'react-router-dom';

import GeneralPage from 'components/GeneralPage';

class GuildCallbackPage extends Component {
	state = {
		guildID: null
	};

	componentDidMount() {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('guild_id');

		if (id) this.setState({ guildID: id });
	}

	render() {
		return (
			<GeneralPage loading={!this.state.guildID}>
				{this.state.guildID && <Redirect to={`/guilds/${this.state.guildID}`} />}
			</GeneralPage>
		);
	}
}

export default GuildCallbackPage;
