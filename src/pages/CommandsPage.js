import React, { Component } from 'reactn';

class CommandsPage extends Component {
	state = {
		loading: true,
		commands: []
	};

	async componentDidMount() {
		// TODO: this isnt using BASE_API_URL, because theres no commands route in skyras KDH yet.
		const { data } = await fetch('https://api.skyra.pw/commands').then(res => res.json());
		this.setState({ loading: false, commands: data });
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
