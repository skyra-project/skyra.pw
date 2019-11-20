import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';

import SelectRole from 'components/SelectRole';
import SelectRoles from 'components/SelectRoles';
import Select from 'components/Select';

import Section from './components/Section';
import SimpleGrid from './components/SimpleGrid';

const SettingsPage = props => {
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
					<Select
						title="Language"
						value={props.guildSettings.language}
						onChange={e => props.patchGuildData({ language: e.target.value })}
					>
						<option value="en-US">English</option>
						<option value="es-ES">Español</option>
					</Select>
				</div>
			</Section>
			{/* EndOf General */}

			{/* Roles */}
			<Section title="Roles">
				<SimpleGrid>
					{[
						{ name: 'admin', multi: false },
						{ name: 'moderator', multi: false },
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
									value={props.guildSettings.roles[role.name]}
									buttonText={role.name}
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

						return (
							<SelectRole
								key={role.name}
								value={props.guildSettings.roles[role.name]}
								buttonText={role.name}
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
		</Fragment>
	);
};

export default SettingsPage;
