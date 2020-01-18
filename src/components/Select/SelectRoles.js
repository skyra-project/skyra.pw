import React from 'react';

import SelectMany from './SelectMany';

const SelectRoles = ({ title, value, guild, onChange }) => (
	<SelectMany
		name={value.length}
		title={title}
		value={value}
		onChange={onChange}
		values={guild.roles.map(r => ({ name: r.name, value: r.id }))}
	/>
);

export default SelectRoles;
