import React from 'react';

import { FlattenedGuild } from 'meta/typings/ApiData';
import SelectMany from './SelectMany';

interface SelectRolesProps {
	title: string;
	value: string;
	guild: FlattenedGuild;
	filterEveryone: boolean;
	onChange(...args: any[]): void;
}

const SelectRoles = ({ title, value, guild, filterEveryone, onChange }: SelectRolesProps) => (
	<SelectMany
		name={value.length}
		title={title}
		value={value}
		onChange={onChange}
		values={guild.roles
			.filter(r => (filterEveryone ? r.id !== guild.id : r.name))
			.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
			.map(r => ({ name: r.name, value: r.id }))}
	/>
);

export default SelectRoles;
