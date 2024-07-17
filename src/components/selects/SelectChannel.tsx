import type { TransformedLoginData } from '@config/types/ApiData';
import { ChannelType } from 'discord-api-types/v10';
import { memo } from 'react';
import type { ValuesType } from 'utility-types';
import SelectOne, { SelectOneProps } from './SelectOne';

export interface SelectChannelProps extends Omit<SelectOneProps, 'values' | 'name'> {
	value: string | null;
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
}

const SelectChannel = ({ label, value, guild, onChange, tooltipTitle, ...props }: SelectChannelProps) => {
	// eslint-disable-next-line @typescript-eslint/init-declarations
	let name;
	const channel = guild.channels.find((c) => c.id === value);
	if (channel) name = channel.name;

	return (
		<SelectOne
			{...props}
			label={label}
			name={name}
			onChange={onChange}
			tooltipTitle={tooltipTitle}
			values={guild.channels
				.filter((c) => c.type === ChannelType.GuildText || c.type === ChannelType.GuildAnnouncement)
				.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
				.map((c) => ({ name: c.name, value: c.id }))}
		/>
	);
};

export default memo(SelectChannel);
