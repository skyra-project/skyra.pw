import type { FlattenedCommand } from '@config/types/ApiData';
import GeneralPage from '@layout/General';
import RefreshCommandsButton from '@layout/RefreshCommandsButton';
import UiSearchBar from '@material/UiSearchBar';
import Category from '@presentational/CommandsPage/Category';
import Loading from '@presentational/Loading';
import { ExpirableLocalStorageStructure, LocalStorageKeys } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { useWindowSize } from '@utils/useWindowSize';
import { apiFetch, loadState, saveState } from '@utils/util';
import debounce from 'lodash/debounce';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Container } from '@mui/material';

const CommandsPage: FC = () => {
	const [searchValue, setSearchValue] = useState('');
	const [commandsBoxWidth, setCommandsBoxWidth] = useState(500);
	const [commands, setCommands] = useState<FlattenedCommand[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchCommands = useCallback(async () => {
		setLoading(true);

		const commandsFromLocalStorage = loadState<ExpirableLocalStorageStructure<FlattenedCommand[]>>(LocalStorageKeys.Commands);
		if (commandsFromLocalStorage && (process.env.NODE_ENV === 'development' || commandsFromLocalStorage.expire > Date.now())) {
			setCommands(commandsFromLocalStorage.data);
		} else {
			const commandsData = await apiFetch<FlattenedCommand[]>('/commands');
			setCommands(commandsData);
			saveState<ExpirableLocalStorageStructure<FlattenedCommand[]>>(LocalStorageKeys.Commands, {
				expire: Date.now() + Time.Day * 6,
				data: commandsData
			});
		}

		setLoading(false);
	}, []);

	useEffect(() => {
		void fetchCommands();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const categories = useMemo(() => [...new Set(commands.map((command) => command.category))], [commands]);

	const handleSearch = debounce((value: string) => {
		setSearchValue(value);
	}, 200);

	const [width] = useWindowSize();
	const commandsBoxRef = useCallback(
		(node: HTMLElement) => {
			if (node !== null) {
				setCommandsBoxWidth(node.getBoundingClientRect().width);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[width]
	);

	return (
		<>
			<Loading loading={loading} />
			<RefreshCommandsButton setCommands={setCommands} />
			<GeneralPage>
				<Container>
					<UiSearchBar
						value={searchValue}
						onChange={handleSearch}
						onCancelSearch={() => setSearchValue('')}
						onRequestSearch={(newValue) => setSearchValue(newValue ?? '')}
						placeholder="Search a command..."
						PaperProps={{
							elevation: 4
						}}
						style={{
							width: commandsBoxWidth
						}}
					/>
					<Box display="flex" flexDirection="column" {...{ ref: commandsBoxRef }}>
						{categories.map((categoryName, index) => (
							<Category key={index} categoryName={categoryName} commands={commands} searchValue={searchValue} />
						))}
					</Box>
				</Container>
			</GeneralPage>
		</>
	);
};

export default CommandsPage;
