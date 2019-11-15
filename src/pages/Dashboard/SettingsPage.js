import React, { Fragment } from 'react';
import { TextField, FormControl, InputLabel, Select } from '@material-ui/core';

import SelectRole from 'components/SelectRole';
import SelectRoles from 'components/SelectRoles';
import SelectChannel from 'components/SelectChannel';

import Section from './components/Section';
import SimpleGrid from './components/SimpleGrid';

const SettingsPage = props => {
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	return (
		<Fragment>
			{/* General Settings */}
			<Section title="General Settings">
				<div className="input">
					<TextField
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
						label="Prefix"
						value={props.guildSettings.prefix}
						onChange={e => props.patchGuildData({ prefix: e.target.value })}
						variant="outlined"
					/>
					<FormControl variant="filled">
						<InputLabel ref={inputLabel}>Language</InputLabel>
						<Select
							native
							value={props.guildSettings.language}
							onChange={e => props.patchGuildData({ language: e.target.value })}
							labelWidth={labelWidth}
						>
							<option value="en-US">English</option>
							<option value="es-ES">Español</option>
						</Select>
					</FormControl>
				</div>
			</Section>
			{/* EndOf General */}

			{/* Roles */}
			<Section title="Roles">
				<SimpleGrid>
					{[
						{ name: 'admin', multi: false },
						{ name: 'moderator', multi: false },
						{ name: 'staff', multi: false },
						{ name: 'public', multi: true },
						{ name: 'initial', multi: false },
						{ name: 'subscriber', multi: false },
						{ name: 'muted', multi: false }
					].map(role => {
						// Some settings have more than 1 role, such as Public Roles
						if (role.multi) {
							return (
								<SelectRoles
									key={role.name}
									currentValue={props.guildSettings.roles[role.name]}
									buttonText={`${role.name} Roles: ${props.guildSettings.roles[role.name].length}`}
									onChange={r =>
										props.patchGuildData({
											roles: {
												[role.name]: r
											}
										})
									}
									guild={props.guildData}
									title={role.name}
								/>
							);
						}

						const current = props.guildData.roles.find(r => r.id === props.guildSettings.roles[role.name]);
						const displayValue = current ? current.name : 'None';

						return (
							<SelectRole
								key={role.name}
								buttonText={`${role.name}: ${displayValue}`}
								onChange={r =>
									props.patchGuildData({
										roles: {
											[role.name]: r.id
										}
									})
								}
								guild={props.guildData}
								title={role.name}
							/>
						);
					})}
				</SimpleGrid>
			</Section>
			{/* EndOf Roles */}

			{/* Channels */}
			<Section title="Channels">
				<SimpleGrid>
					<SelectChannel guild={props.guildData} buttonText="Some Channel" />
				</SimpleGrid>
			</Section>
			{/* EndOf Channels */}
		</Fragment>
	);
};

export default SettingsPage;
