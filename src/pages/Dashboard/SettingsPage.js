import React, { useState } from 'react';

import { Typography, Box, TextField } from '@material-ui/core';
import styled from 'styled-components';
const Container = styled(Box)`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`;

const SettingsPage = () => {
	const [temp, setTemp] = useState('s!');
	return (
		<div>
			<Container>
				<TextField
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					label="Prefix"
					value={temp}
					onChange={e => setTemp(e.target.value)}
					margin="normal"
					variant="outlined"
				/>
				<TextField
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					label="Prefix"
					value={temp}
					onChange={e => setTemp(e.target.value)}
					margin="normal"
					variant="outlined"
				/>
				<TextField
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					label="Prefix"
					value={temp}
					onChange={e => setTemp(e.target.value)}
					margin="normal"
					variant="outlined"
				/>
				<TextField
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					label="Prefix"
					value={temp}
					onChange={e => setTemp(e.target.value)}
					margin="normal"
					variant="outlined"
				/>
			</Container>
		</div>
	);
};

export default SettingsPage;
