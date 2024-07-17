import type { TransformedLoginData } from '@config/types/ApiData';
import { memo, type PropsWithChildren } from 'react';
import type { ValuesType } from 'utility-types';
import SelectMany, { SelectManyProps } from './SelectMany';
import { ChannelType } from 'discord-api-types/v10';

export interface SelectChannelsProps extends Omit<SelectManyProps, 'values' | 'name'> {
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
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
			.filter((c) => c.type === ChannelType.GuildText || c.type === ChannelType.GuildAnnouncement)
			.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
			.map((c) => ({ name: c.name, value: c.id }))}
	/>
);

export default memo(SelectChannels);
