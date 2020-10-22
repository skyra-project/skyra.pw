import { FlattenedGuild } from '@config/types/ApiData';
import React, { memo } from 'react';
import SelectOne, { SelectOneProps } from './SelectOne';

export interface SelectChannelProps extends Omit<SelectOneProps, 'values' | 'name'> {
	value: string;
	guild: FlattenedGuild;
}

const SelectChannel = ({ label, value, guild, onChange, tooltipTitle, ...props }: SelectChannelProps) => {
	let name;
	const channel = guild.channels.find(c => c.id === value);
	if (channel) name = channel.name;

	return (
		<SelectOne
			{...props}
			label={label}
			name={name}
			onChange={onChange}
			tooltipTitle={tooltipTitle}
			values={guild.channels
				.filter(c => c.type === 'text' || c.type === 'store' || c.type === 'news')
				.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
				.map(c => ({ name: c.name, value: c.id }))}
		/>
	);
};

export default memo(SelectChannel);
