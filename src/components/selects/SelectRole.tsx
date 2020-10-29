import { FlattenedGuild } from '@config/types/ApiData';
import React, { memo } from 'react';
import SelectOne, { SelectOneProps } from './SelectOne';

export interface SelectRoleProps extends Omit<SelectOneProps, 'values' | 'name'> {
	value: string;
	guild: FlattenedGuild;
	filterEveryone: boolean;
}

const SelectRole = ({ label, value, guild, filterEveryone, onChange, ...props }: SelectRoleProps) => {
	let name;
	const role = guild.roles.find(c => c.id === value);
	if (role) name = role.name;

	return (
		<SelectOne
			{...props}
			label={label}
			name={name}
			onChange={onChange}
			values={guild.roles
				.filter(r => (filterEveryone ? r.id !== guild.id : r.name))
				.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
				.map(r => ({ name: r.name, value: r.id }))}
		/>
	);
};

export default memo(SelectRole);
