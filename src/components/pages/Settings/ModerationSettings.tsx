import { ConfigurableModerationKeys } from '#config/SettingsDataEntries';
import { useGuildSettingsChangesContext } from '#contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '#contexts/Settings/GuildSettingsContext';
import Section from '#layout/Settings/Section';
import SimpleGrid from '#mui/SimpleGrid';
import SelectBoolean from '#selects/SelectBoolean';
import React, { FC, memo } from 'react';

const ModerationSettings: FC = () => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Section title="Punishment Settings">
			<p>These settings affect what Skyra does when you're punishing (ban, kick, mute, etc) someone.</p>
			<SimpleGrid>
				{ConfigurableModerationKeys.map(({ description, key, name }, index) => (
					<SelectBoolean
						key={index}
						title={name}
						currentValue={guildSettings[key]}
						description={description}
						onChange={(event) =>
							setGuildSettingsChanges({
								[key]: event.target.checked
							})
						}
					/>
				))}
			</SimpleGrid>
		</Section>
	);
};

export default memo(ModerationSettings);
