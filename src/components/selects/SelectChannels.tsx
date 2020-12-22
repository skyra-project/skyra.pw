import useChristmasStyles from '#components/christmas/UseChristmasStyles';
import { FlattenedGuild } from '#config/types/ApiData';
import React, { memo, PropsWithChildren } from 'react';
import SelectMany, { SelectManyProps } from './SelectMany';
import clsx from 'clsx';

export interface SelectChannelsProps extends Omit<SelectManyProps, 'values' | 'name'> {
	guild: FlattenedGuild;
}

const SelectChannels = ({ label, value, guild, onChange, tooltipTitle, ...props }: PropsWithChildren<SelectChannelsProps>) => {
	const christmasClasses = useChristmasStyles();

	return (
		<SelectMany
			{...props}
			name={value.length}
			label={label}
			value={value}
			onChange={onChange}
			tooltipTitle={tooltipTitle}
			values={guild.channels
				.filter((c) => c.type === 'text' || c.type === 'store' || c.type === 'news')
				.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
				.map((c) => ({ name: c.name, value: c.id }))}
			buttonProps={{
				className: clsx(christmasClasses.backgroundColor, christmasClasses.backgroundColorHover),
				...props.buttonProps
			}}
		/>
	);
};

export default memo(SelectChannels);
