import { ConfigurableIgnoreChannels, ConfigurableLoggingChannels } from '@config/SettingsDataEntries';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@material/SimpleGrid';
import SelectChannel from '@selects/SelectChannel';
import SelectChannels from '@selects/SelectChannels';
import { handleResetKey } from '@utils/util';
import { memo, type FC } from 'react';

const ChannelSettings: FC = () => {
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<>
			<PageHeader
				title="Channels"
				subtitle={
					<>
						Here you can configure different kinds of channels for Skyra. Hover over a button to get more information for that specific
						channel.
					</>
				}
			/>

			<Section title="Logging Channels">
				<SimpleGrid
					direction="row"
					justifyContent="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					{ConfigurableLoggingChannels.map(({ name, description, key }, index) => (
						<SelectChannel
							key={index}
							tooltipTitle={description}
							value={guildSettings[key]}
							onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, key)}
							onChange={(channel: (typeof guildSettings)[typeof key]) => {
								return setGuildSettingsChanges({ [key]: channel });
							}}
							guild={guildData}
							label={name}
							ButtonProps={{
								fullWidth: true,
								sx: {
									minHeight: {
										lg: 'inherit',
										md: 60,
										xs: 'inherit'
									},
									textAlign: 'left'
								}
							}}
						/>
					))}
				</SimpleGrid>
			</Section>
			<Section
				title="Logging Ignore Channels"
				sx={{
					mt: {
						lg: (theme) => theme.spacing(10),
						xs: (theme) => theme.spacing(5)
					}
				}}
			>
				<SimpleGrid
					direction="row"
					justifyContent="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					{ConfigurableIgnoreChannels.map(({ name, description, key }, index) => (
						<SelectChannels
							key={index}
							tooltipTitle={description}
							value={guildSettings[key]}
							onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, key)}
							onChange={(channel: (typeof guildSettings)[typeof key]) => setGuildSettingsChanges({ [key]: channel })}
							guild={guildData}
							label={name}
							ButtonProps={{
								fullWidth: true,
								sx: {
									minHeight: {
										lg: 'inherit',
										md: 60,
										xs: 'inherit'
									},
									textAlign: 'left'
								}
							}}
						/>
					))}
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(ChannelSettings);
