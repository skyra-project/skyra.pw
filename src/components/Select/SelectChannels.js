import React from 'react';

import SelectMany from './SelectMany';

const SelectChannels = ({ title, value, guild, onChange }) => (
	<SelectMany
		name={value.length}
		title={title}
		value={value}
		onChange={onChange}
		values={guild.channels.filter(c => c.type === 'text').map(c => ({ name: c.name, value: c.id }))}
	/>
);

export default SelectChannels;
