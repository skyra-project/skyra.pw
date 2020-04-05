import { MenuItem, TextField } from '@material-ui/core';
import Section from 'components/Section';
import Select from 'components/Select/Select';
import SelectRole from 'components/Select/SelectRole';
import SelectRoles from 'components/Select/SelectRoles';
import SimpleGrid from 'components/SimpleGrid';
import { Roles, SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { PropsWithChildren } from 'react';
import { Else, If, Then } from 'react-if';
import { PickByValue } from 'utility-types';

const CONFIGURABLE_ROLES: ConfigurableRoles[] = [
	{ name: 'admin', multi: false },
	{ name: 'moderator', multi: false },
	{ name: 'public', multi: true },
	{ name: 'initial', multi: false },
	{ name: 'subscriber', multi: false },
	{ name: 'muted', multi: false }
];

export default (props: PropsWithChildren<SettingsPageProps>) => (
	<>
		{/* General Settings */}
		<Section title="General Settings">
			<SimpleGrid direction="row" justify="flex-start">
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

		{/* Roles */}
		<Section title="Roles">
			<SimpleGrid>
				{CONFIGURABLE_ROLES.map(({ name, multi = false }, index) => (
					// Some settings have more than 1 role, such as Public Roles
					<If key={index} condition={multi}>
						<Then>
							<SelectRoles
								// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
								value={props.guildSettings.roles[name as keyof PickByValue<Roles, string[]>]}
								label={name}
								onChange={r =>
									props.patchGuildData({
										roles: {
											[name]: r
										}
									})
								}
								guild={props.guildData}
								filterEveryone
							/>
						</Then>
						<Else>
							<SelectRole
								label={name}
								// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
								value={props.guildSettings.roles[name as keyof PickByValue<Roles, string>]}
								onChange={r =>
									props.patchGuildData({
										roles: {
											[name]: r
										}
									})
								}
								guild={props.guildData}
								filterEveryone
							/>
						</Else>
					</If>
				))}
			</SimpleGrid>
		</Section>
		{/* EndOf Roles */}
	</>
);

interface ConfigurableRoles {
	name: keyof PickByValue<Roles, string | string[]>;
	multi?: boolean;
}
