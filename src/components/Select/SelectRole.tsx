import React from 'react';

import SelectOne, { SelectOneProps } from './SelectOne';
import { FlattenedGuild } from 'meta/typings/ApiData';

export interface SelectRoleProps extends Omit<SelectOneProps, 'values' | 'name'> {
	value: string;
	guild: FlattenedGuild;
	filterEveryone: boolean;
}

const SelectRole = ({ label, value, guild, filterEveryone, onChange }: SelectRoleProps) => {
	let name;
	const role = guild.roles.find(c => c.id === value);
	if (role) name = role.name;

	return (
		<SelectOne
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

export default SelectRole;
