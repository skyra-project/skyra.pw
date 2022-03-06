import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@mui/SimpleGrid';
import SelectChannels from '@selects/SelectChannels';
import { handleResetKey } from '@utils/util';
import React, { FC, memo } from 'react';

const MessageSettings: FC = () => {
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<>
			<Section title="Experience">
				<SimpleGrid>
					<SelectChannels
						tooltipTitle="The channels configured to not increase the point counter for users."
						value={guildSettings.messagesIgnoreChannels}
						onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'messagesIgnoreChannels')}
						onChange={(channels: typeof guildSettings.messagesIgnoreChannels) =>
							setGuildSettingsChanges({ messagesIgnoreChannels: channels })
						}
						guild={guildData}
						label="Ignored Channels"
					/>
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(MessageSettings);
