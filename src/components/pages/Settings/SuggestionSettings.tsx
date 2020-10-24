import { CONFIGURABLE_EMOJIS, CONFIGURABLE_SUGGESTION_ACTIONS } from '@config/SettingsDataEntries';
import { Suggestions as SuggestionSettings } from '@config/types/ConfigurableData';
import { SettingsPageProps } from '@config/types/GuildSettings';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import SimpleGrid from '@mui/SimpleGrid';
import SelectBoolean from '@selects/SelectBoolean';
import SelectChannel from '@selects/SelectChannel';
import SelectEmoji from '@selects/SelectEmoji';
import { EmojiRegexExtractId } from '@utils/constants';
import React, { FC, memo, useMemo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			[theme.breakpoints.only('md')]: {
				minHeight: 60
			}
		},
		buttonText: {
			display: 'flex',
			textAlign: 'left',
			alignItems: 'center',
			justifyContent: 'space-between'
		}
	})
);

const SuggestionSettings: FC<SettingsPageProps> = props => {
	const classes = useStyles();
	const findEmoji = useMemo(() => (id: string) => props.guildData.emojis.find(e => e.id === id)!, [props.guildData.emojis]);
	const tagToId = useMemo(() => (tag: string) => tag.replace(EmojiRegexExtractId, '$1'), []);
	const idToTag = useMemo(() => (id: string, name: string, animated: boolean) => `<${animated ? 'a' : ''}:${name}:${id}>`, []);

	return (
		<>
			<PageHeader
				title="Suggestion system"
				subtitle="Here you can configure what Skyra will do with suggestions people make in your server"
			/>

			<Section title="Channel">
				<SimpleGrid
					direction="row"
					justify="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					<SelectChannel
						value={props.guildSettings.suggestions.channel}
						label="Suggestions Channel"
						onChange={c =>
							props.patchGuildData({
								suggestions: {
									channel: c
								}
							})
						}
						guild={props.guildData}
						buttonProps={{
							fullWidth: true,
							classes: {
								root: classes.button,
								label: classes.buttonText
							}
						}}
					/>
				</SimpleGrid>
			</Section>

			<Section title="Actions">
				<SimpleGrid>
					{CONFIGURABLE_SUGGESTION_ACTIONS.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={props.guildSettings.suggestions['on-action'][key]}
							onChange={event =>
								props.patchGuildData({
									suggestions: {
										'on-action': {
											[key]: event.target.checked
										}
									}
								})
							}
						/>
					))}
				</SimpleGrid>
			</Section>

			<Section title="Emojis">
				<SimpleGrid
					direction="row"
					justify="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					{CONFIGURABLE_EMOJIS.map(({ title, description, key, defaultImage, defaultName, defaultId }, index) => (
						<SelectEmoji
							key={index}
							tooltipTitle={description}
							value={tagToId(props.guildSettings.suggestions.emojis[key])}
							defaultImage={defaultImage}
							defaultName={defaultName}
							defaultId={defaultId}
							onChange={(emojiID: typeof props.guildSettings.suggestions.emojis[typeof key] | null) => {
								if (emojiID) {
									const emojiData = findEmoji(emojiID);
									return props.patchGuildData({
										suggestions: {
											emojis: {
												[key]: idToTag(emojiID, emojiData.name, emojiData.animated)
											}
										}
									});
								}

								return props.patchGuildData({
									suggestions: {
										emojis: {
											[key]: idToTag(defaultId, defaultName, false)
										}
									}
								});
							}}
							guild={props.guildData}
							label={title}
							buttonProps={{
								fullWidth: true,
								classes: {
									root: classes.button,
									label: classes.buttonText
								}
							}}
						/>
					))}
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(SuggestionSettings);
