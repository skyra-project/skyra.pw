import SearchIcon from '@mui/icons-material/Search';
import type { InputBaseProps } from '@mui/material/InputBase';
import React, { FC, memo } from 'react';
import { Box, InputBase } from '@mui/material';

const DialogSearchBar: FC<InputBaseProps> = ({ onChange }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				alignContent: 'center',
				padding: 10,
				marginTop: 0,
				marginBottom: 0,
				marginLeft: 10,
				marginRight: 10
			}}
		>
			<SearchIcon
				sx={{
					marginRight: 10
				}}
			/>
			<InputBase
				autoFocus
				autoCapitalize="false"
				autoComplete="off"
				autoCorrect="false"
				results={4}
				placeholder="Search…"
				onChange={onChange}
				inputProps={{ 'aria-label': 'search input' }}
			/>
		</Box>
	);
};

export default memo(DialogSearchBar);
