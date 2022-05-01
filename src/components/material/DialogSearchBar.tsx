import Box from '@mui/material/Box';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import React, { FC, memo } from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
			alignContent: 'center',
			padding: 10,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 10,
			marginRight: 10
		},
		svg: {
			marginRight: 10
		}
	})
);

const DialogSearchBar: FC<InputBaseProps> = ({ onChange }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<SearchIcon className={classes.svg} />
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
