import { FlattenedGuild } from '@config/types/ApiData';
import React, { memo, PropsWithChildren } from 'react';
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
			.filter(c => c.type === 'text' || c.type === 'store' || c.type === 'news')
			.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
			.map(c => ({ name: c.name, value: c.id }))}
	/>
);

export default memo(SelectChannels);
