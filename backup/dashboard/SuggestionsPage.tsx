import { createStyles, makeStyles, Theme } from '@material-ui/core';
import PageHeader from 'components/PageHeader';
import Section from 'components/Section';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectChannel from 'components/Select/SelectChannel';
import SelectEmoji from 'components/Select/SelectEmoji';
import SimpleGrid from 'components/SimpleGrid';
import { SettingsPageProps, SuggestionActions, SuggestionEmojis } from 'lib/types/GuildSettings';
import React, { memo, PropsWithChildren, useMemo } from 'react';

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

const CONFIGURABLE_SUGGESTION_ACTIONS: OnAction[] = [
	{ title: 'DM', key: 'dm', description: "If this setting is enabled, Skyra will DM the suggestion's author every time it is updated." },
	{
		title: 'Repost',
		key: 'repost',
		description:
			"If this setting is enabled, Skyra will repost the suggestion's message every time it is updated. If it is disabled, it will edit the original message."
	},
	{
		title: 'Hide Author',
		key: 'hide-author',
		description:
			'This setting allows you to update suggestions anonymously. It will substitute the updater\'s name with either "An administrator" or "A moderator", according to their permission level.'
	}
];

const CONFIGURABLE_EMOJIS: Emoji[] = [
	{
		title: 'Upvote Emoji',
		key: 'upvote',
		description: 'The upvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowT',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285487652954.png',
		defaultId: '694594285487652954'
	},
	{
		title: 'Downvote Emoji',
		key: 'downvote',
		description: 'The downvote emoji Skyra reacts with on every suggestion.',
		defaultName: 'ArrowB',
		defaultImage: 'https://cdn.discordapp.com/emojis/694594285269680179.png',
		defaultId: '694594285269680179'
	}
];



export default memo((props: PropsWithChildren<SettingsPageProps>) => {
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
});

interface OnAction {
	title: string;
	key: keyof SuggestionActions;
	description: string;
}

interface Emoji {
	title: string;
	key: keyof SuggestionEmojis;
	description: string;
	defaultName: string;
	defaultImage: string;
	defaultId: string;
}
