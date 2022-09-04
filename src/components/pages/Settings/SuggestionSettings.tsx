import { ConfigurableSuggestionActions } from '@config/SettingsDataEntries';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@material/SimpleGrid';
import SelectBoolean from '@selects/SelectBoolean';
import SelectChannel from '@selects/SelectChannel';
import { handleResetKey } from '@utils/util';
import { memo, type FC } from 'react';

const SuggestionSettings: FC = () => {
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<>
			<PageHeader title="Suggestion system" subtitle="Here you can configure what Skyra will do with suggestions people make in your server" />

			<Section title="Channel">
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
					<SelectChannel
						value={guildSettings.suggestionsChannel}
						label="Suggestions Channel"
						onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'suggestionsChannel')}
						onChange={(newChannel) =>
							setGuildSettingsChanges({
								suggestionsChannel: newChannel
							})
						}
						guild={guildData}
						ButtonProps={{
							fullWidth: true,
							sx: {
								minHeight: {
									lg: 'inherit',
									md: 60,
									xs: 'inherit'
								},
								display: 'flex',
								textAlign: 'left',
								alignItems: 'center',
								justifyContent: 'space-between'
							}
						}}
					/>
				</SimpleGrid>
			</Section>

			<Section title="Actions">
				<SimpleGrid>
					{ConfigurableSuggestionActions.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={guildSettings[key]}
							onChange={(event) =>
								setGuildSettingsChanges({
									[key]: event.target.checked
								})
							}
						/>
					))}
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(SuggestionSettings);
