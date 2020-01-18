import React from 'react';

import SelectMany from './SelectMany';
import { FlattenedGuild } from 'meta/typings/ApiData';

export interface SelectChannelsProps {
	title: string;
	value: string;
	guild: FlattenedGuild;
	onChange(...args: any[]): void;
}

const SelectChannels = ({ title, value, guild, onChange }: SelectChannelsProps) => (
	<SelectMany
		name={value.length}
		title={title}
		value={value}
		onChange={onChange}
		values={guild.channels
			.filter(c => c.type === 'text')
			.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
			.map(c => ({ name: c.name, value: c.id }))}
	/>
);

export default SelectChannels;
