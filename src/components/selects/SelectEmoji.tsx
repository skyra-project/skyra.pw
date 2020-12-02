import useChristmasStyles from '#components/christmas/UseChristmasStyles';
import { FlattenedGuild } from '#config/types/ApiData';
import clsx from 'clsx';
import React, { FC, memo } from 'react';
import SelectOne, { SelectOneProps } from './SelectOne';

export interface SelectEmojiProps extends Omit<SelectOneProps, 'values' | 'name'> {
	value: string;
	guild: FlattenedGuild;
	defaultName: string;
	defaultImage: string;
	defaultId: string;
}

const getEmojiUrl = (id: string, animated: boolean) => `https://cdn.discordapp.com/emojis/${id}.${animated ? 'gif' : 'png'}?v=1`;

const SelectEmoji: FC<SelectEmojiProps> = ({
	label,
	value,
	guild,
	defaultImage,
	defaultName,
	defaultId,
	onChange,
	tooltipTitle,
	...props
}) => {
	const christmasClasses = useChristmasStyles();

	let name = defaultName;
	let image = defaultImage;

	const emoji = guild.emojis.find(e => e.id === value);
	if (emoji) name = emoji.name;
	if (emoji) image = getEmojiUrl(emoji.id, emoji.animated);

	const values = guild.emojis.filter(e => e.available).map(e => ({ name: e.name, value: e.id, iconUrl: getEmojiUrl(e.id, e.animated) }));
	values.unshift({ name: defaultName, value: defaultId, iconUrl: defaultImage });

	return (
		<SelectOne
			{...props}
			label={label}
			name={name}
			onChange={onChange}
			tooltipTitle={tooltipTitle}
			imageInName={image}
			values={values}
			buttonProps={{
				className: clsx(christmasClasses.backgroundColor, christmasClasses.backgroundColorHover),
				...props.buttonProps
			}}
		/>
	);
};

export default memo(SelectEmoji);
