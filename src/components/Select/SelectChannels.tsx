import { FlattenedGuild } from 'meta/typings/ApiData';
import React, { PropsWithChildren } from 'react';
import SelectMany, { SelectManyProps } from './SelectMany';

export interface SelectChannelsProps extends Omit<SelectManyProps, 'values' | 'name'> {
	guild: FlattenedGuild;
}

const SelectChannels = ({ label, value, guild, onChange, tooltipTitle, ...props }: PropsWithChildren<SelectChannelsProps>) => (
	<SelectMany
		{...props}
		name={value.length}
		label={label}
		value={value}
		onChange={onChange}
		tooltipTitle={tooltipTitle}
		values={guild.channels
			.filter(c => c.type === 'text')
			.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
			.map(c => ({ name: c.name, value: c.id }))}
	/>
);

export default SelectChannels;
