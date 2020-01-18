import React from 'react';

import SelectOne from './SelectOne';
import { FlattenedGuild } from 'meta/typings/ApiData';

export interface SelectChannelProps {
	title: string;
	value: string;
	guild: FlattenedGuild;
	onChange(...args: any[]): void;
}

const SelectChannel = ({ title, value, guild, onChange }: SelectChannelProps) => {
	let name;
	const channel = guild.channels.find(c => c.id === value);
	if (channel) name = channel.name;

	return (
		<SelectOne
			title={title}
			name={name}
			onChange={onChange}
			values={guild.channels
				.filter(c => c.type === 'text')
				.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
				.map(c => ({ name: c.name, value: c.id }))}
		/>
	);
};

export default SelectChannel;
