import React from 'react';

import SelectOne from './SelectOne';

const SelectRole = ({ title, value, guild, onChange }) => {
	let name;
	const role = guild.roles.find(c => c.id === value);
	if (role) name = role.name;

	return (
		<SelectOne
			title={title}
			name={name}
			value={value}
			onChange={onChange}
			values={guild.roles.map(r => ({ name: r.name, value: r.id }))}
		/>
	);
};

export default SelectRole;
