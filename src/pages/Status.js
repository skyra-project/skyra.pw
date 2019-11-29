import React, { Component } from 'react';

import GeneralPage from 'components/GeneralPage';
import { Button, Box, Typography, Divider } from '@material-ui/core';
import { apiFetch } from 'meta/util';
import RefreshIcon from '@material-ui/icons/Refresh';

class StatusPage extends Component {
	state = {
		application: null,
		error: false
	};
	componentDidMount() {
		this.fetchApp();
	}

	fetchApp = async () => {
		const application = await apiFetch('/application').catch(() => {
			this.setState({ error: true });
		});

		if (application) this.setState({ application, error: false });
	};

	render() {
		const { error, application } = this.state;
		return (
			<GeneralPage loading={!application && !error}>
				<Box alignSelf="center" display="flex" flexDirection="column" justifyContent="space-around" height="50%">
					{!application || error ? (
						<Typography variant="h1">Request failed. Is skyra offline? :(</Typography>
					) : (
						<Box>
							<Typography>Skyra has been online for {application.uptime}.</Typography>

							<Box my={3}>
								<Divider />
							</Box>
							<Typography>{application.users} Users</Typography>
							<Typography>{application.guilds} Guilds</Typography>
							<Typography>{application.channels} Channels</Typography>
							<Typography>{application.latency}ms Latency</Typography>
							<Typography>{application.memory.toFixed(2)}mb Memory</Typography>
							<Button variant="contained" color="secondary" size="small" onClick={this.fetchApp} startIcon={<RefreshIcon />}>
								Refresh
							</Button>
						</Box>
					)}
				</Box>
			</GeneralPage>
		);
	}
}

export default StatusPage;
