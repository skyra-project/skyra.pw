import React from 'react';

import SelectOne from './SelectOne';

const SelectChannel = ({ title, value, guild, onChange }) => {
	let name;
	const channel = guild.channels.find(c => c.id === value);
	if (channel) name = channel.name;

	return (
		<SelectOne
			title={title}
			name={name}
			value={value}
			onChange={onChange}
			values={guild.channels.filter(c => c.type === 'text').map(c => ({ name: c.name, value: c.id }))}
		/>
	);
};

export default SelectChannel;
