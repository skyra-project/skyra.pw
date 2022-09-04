import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import type { InputBaseProps } from '@mui/material/InputBase';
import { memo, type FC } from 'react';

const DialogSearchBar: FC<InputBaseProps> = ({ onChange }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				alignContent: 'center',
				p: 1.25,
				my: 0,
				mx: 1.25
			}}
		>
			<SearchIcon
				sx={{
					mr: 1.25
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
