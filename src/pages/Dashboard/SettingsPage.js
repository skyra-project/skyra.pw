import React, { Fragment } from 'react';
import { TextField, MenuItem } from '@material-ui/core';

import SelectRole from 'components/Select/SelectRole';
import SelectRoles from 'components/Select/SelectRoles';
import Select from 'components/Select/Select';
import SelectChannels from 'components/Select/SelectChannels';

import Section from 'components/Section';
import SimpleGrid from 'components/SimpleGrid';

const SettingsPage = props => (
	<Fragment>
		{/* General Settings */}
		<Section title="General Settings">
			<SimpleGrid gridProps={{ direction: 'row', justify: 'flex-start' }}>
				<TextField
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					label="Prefix"
					value={props.guildSettings.prefix}
					onChange={e => props.patchGuildData({ prefix: e.target.value })}
				/>
				<Select
					title="Language"
					helperText="Select the language you want for this guild"
					value={props.guildSettings.language}
					onChange={e => props.patchGuildData({ language: e.target.value })}
				>
					<MenuItem value="en-US">English</MenuItem>
					<MenuItem value="es-ES">Español</MenuItem>
				</Select>
			</SimpleGrid>
		</Section>
		{/* EndOf General */}

		<Section title="Channels">
			<SimpleGrid>
				<SelectChannels
					value={props.guildSettings.disabledChannels}
					onChange={channels =>
						props.patchGuildData({
							disabledChannels: channels
						})
					}
					guild={props.guildData}
					title="Disabled Channels"
				/>
			</SimpleGrid>
		</Section>

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
				})}
				<SelectRoles
					value={props.guildSettings.stickyRoles}
					buttonText="Sticky Roles"
					onChange={channels =>
						props.patchGuildData({
							stickyRoles: channels
						})
					}
					guild={props.guildData}
					title="Sticky Roles"
				/>
			</SimpleGrid>
		</Section>
		{/* EndOf Roles */}
	</Fragment>
);

export default SettingsPage;
