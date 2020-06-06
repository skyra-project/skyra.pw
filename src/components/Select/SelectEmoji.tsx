import { FlattenedGuild } from 'lib/types/ApiData';
import React from 'react';
import SelectOne, { SelectOneProps } from './SelectOne';

export interface SelectEmojiProps extends Omit<SelectOneProps, 'values' | 'name'> {
	value: string;
	guild: FlattenedGuild;
	defaultName: string;
	defaultImage: string;
}

const getEmojiUrl = (id: string, animated: boolean) => `https://cdn.discordapp.com/emojis/${id}.${animated ? 'gif' : 'png'}?v=1`;

export default ({ label, value, guild, defaultImage, defaultName, onChange, tooltipTitle, ...props }: SelectEmojiProps) => {
	let name = defaultName;
	let image = defaultImage;

	const emoji = guild.emojis.find(e => e.id === value);
	if (emoji) name = emoji.name;
	if (emoji) image = getEmojiUrl(emoji.id, emoji.animated);

	return (
		<SelectOne
			{...props}
			label={label}
			name={name}
			onChange={onChange}
			tooltipTitle={tooltipTitle}
			imageInName={image}
			values={guild.emojis.filter(e => e.available).map(e => ({ name: e.name, value: e.id, iconUrl: getEmojiUrl(e.id, e.animated) }))}
		/>
	);
};
