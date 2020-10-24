import { CONFIGURABLE_MODERATION } from '@config/SettingsDataEntries';
import { SettingsPageProps } from '@config/types/GuildSettings';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@mui/SimpleGrid';
import SelectBoolean from '@selects/SelectBoolean';
import React, { PropsWithChildren } from 'react';

export default (props: PropsWithChildren<SettingsPageProps>) => (
	<Section title="Punishment Settings">
		<p>These settings affect what Skyra does when you're punishing (ban, kick, mute, etc) someone.</p>
		<SimpleGrid>
			{CONFIGURABLE_MODERATION.map(setting => (
				<SelectBoolean
					key={setting.key}
					title={setting.name}
					currentValue={props.guildSettings.messages[setting.key]}
					description={setting.description}
					onChange={event =>
						props.patchGuildData({
							messages: {
								[setting.key]: event.target.checked
							}
						})
					}
				/>
			))}
		</SimpleGrid>
	</Section>
);
