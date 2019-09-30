import React, { Component } from 'reactn';
import { apiFetch } from 'meta/util';

class CommandsPage extends Component {
	state = {
		loading: true,
		commands: []
	};

	async componentDidMount() {
		const commands = await apiFetch('/commands');
		this.setState({ loading: false, commands });
	}

	render() {
		const { loading, commands } = this.state;
		return (
			<div>
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<div>
						<h1>Commands:</h1>
						{commands.map(cmd => (
							<div>{cmd.name}</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default CommandsPage;
