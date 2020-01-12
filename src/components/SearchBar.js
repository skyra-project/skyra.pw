import React from 'react';
import styled from 'styled-components';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Container = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	padding: 10px;
	margin: 0px 10px;

	.MuiSvgIcon-root {
		margin-right: 10px;
	}
`;

const SearchBar = ({ onChange }) => (
	<Container>
		<SearchIcon />
		<InputBase placeholder="Search…" onChange={onChange} />
	</Container>
);

export default SearchBar;
