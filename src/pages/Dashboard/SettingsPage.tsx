import { MenuItem, TextField } from '@material-ui/core';
import Section from 'components/Section';
import Select from 'components/Select/Select';
import SimpleGrid from 'components/SimpleGrid';
import { SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { PropsWithChildren } from 'react';

export default (props: PropsWithChildren<SettingsPageProps>) => (
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
);
