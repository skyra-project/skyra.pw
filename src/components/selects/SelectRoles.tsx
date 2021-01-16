import type { FlattenedGuild } from '#config/types/ApiData';
import React, { memo } from 'react';
import SelectMany, { SelectManyProps } from './SelectMany';

export interface SelectRolesProps extends Omit<SelectManyProps, 'values' | 'name'> {
	guild: FlattenedGuild;
	filterEveryone: boolean;
}

const SelectRoles = ({ label, value, guild, filterEveryone, onChange, ...props }: SelectRolesProps) => (
	<SelectMany
		{...props}
		name={value.length}
		label={label}
		value={value}
		onChange={onChange}
		values={guild.roles
			.filter((r) => (filterEveryone ? r.id !== guild.id : r.name))
			.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
			.map((r) => ({ name: r.name, value: r.id }))}
	/>
);

export default memo(SelectRoles);
