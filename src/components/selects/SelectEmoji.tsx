import type { TransformedLoginData } from '#config/types/ApiData';
import type { Suggestions } from '#config/types/ConfigurableData';
import React, { FC, memo } from 'react';
import type { ValuesType } from 'utility-types';
import SelectOne, { SelectOneProps } from './SelectOne';

export interface SelectEmojiProps
	extends Omit<SelectOneProps, 'values' | 'name'>,
		Pick<Suggestions.Emoji, 'defaultName' | 'defaultImage' | 'defaultId'> {
	value: string;
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
}

const getEmojiUrl = (id: string, animated: boolean) => `https://cdn.discordapp.com/emojis/${id}.${animated ? 'gif' : 'png'}`;

const SelectEmoji: FC<SelectEmojiProps> = ({ label, value, guild, defaultImage, defaultName, defaultId, onChange, tooltipTitle, ...props }) => {
	let name = defaultName;
	let image = defaultImage;

	const emoji = guild.emojis.find((e) => e.id === value);
	if (emoji) name = emoji.name;
	if (emoji) image = getEmojiUrl(emoji.id, emoji.animated);

	const values = guild.emojis.filter((e) => e.available).map((e) => ({ name: e.name, value: e.id, iconUrl: getEmojiUrl(e.id, e.animated) }));
	values.unshift({ name: defaultName, value: defaultId, iconUrl: defaultImage });

	return <SelectOne {...props} label={label} name={name} onChange={onChange} tooltipTitle={tooltipTitle} imageInName={image} values={values} />;
};

export default memo(SelectEmoji);
