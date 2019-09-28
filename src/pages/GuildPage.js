import React, { Component } from 'reactn';

/*
TODO: centralized settings updates, probably same way as i did  it for collections site?
settings =  deepMerge(currentSettings, settingsChanges)
saveButton.onClick = patch settingsChanges to API
*/

class GuildPage extends Component {
	componentDidMount() {}
	render() {
		const { guildID } = this.props.match.params;
		const cachedGuild = this.global.user.guilds.find(guild => guild.id === guildID);

		return (
			<div>
				Matched ID: {guildID}
				{Object.keys(cachedGuild).map(key => (
					<p style={{ margin: '1px 0px' }}>
						{key}: {JSON.stringify(cachedGuild[key], null, 4)}
					</p>
				))}
			</div>
		);
	}
}

export default GuildPage;
