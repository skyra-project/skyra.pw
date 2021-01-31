import { createSeoProps } from '@config/next-seo.config';
import type { FlattenedCommand } from '@config/types/ApiData';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import UiSearchBar from '@mui/UiSearchBar';
import Category from '@presentational/CommandsPage/Category';
import GeneralPage from '@presentational/Layout/General';
import ScrollToTop from '@routing/ScrollToTop';
import { useWindowSize } from '@utils/useWindowSize';
import { ssrFetch } from '@utils/util';
import debounce from 'lodash/debounce';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useCallback, useMemo, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		'@global': {
			'.MuiAccordion-root.Mui-expanded:last-child': {
				marginBottom: theme.spacing(2)
			}
		},
		searchBar: {
			marginBottom: theme.spacing(1),
			position: 'sticky',
			zIndex: theme.zIndex.appBar - 1,
			top: theme.spacing(9),
			[theme.breakpoints.down('sm')]: {
				top: theme.spacing(8.5)
			}
		}
	})
);

const CommandsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ commands }) => {
	const classes = useStyles();
	const [searchValue, setSearchValue] = useState('');
	const [commandsBoxWidth, setCommandsBoxWidth] = useState(500);

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
			<NextSeo
				{...createSeoProps({
					title: 'Commands',
					description:
						"Want to know what Skyra can do? You've come to the right place here. Get information about every command available in Skyra on this page. ",
					openGraph: {
						title: 'Skyra Commands'
					},
					additionalMetaTags: [
						{
							name: 'summary',
							content:
								"Want to know what Skyra can do? You've come to the right place here. Get information about every command available in Skyra on this page. "
						}
					]
				})}
			/>
			<ScrollToTop />
			<GeneralPage>
				<Container>
					<UiSearchBar
						value={searchValue}
						onChange={handleSearch}
						onCancelSearch={() => setSearchValue('')}
						onRequestSearch={(newValue) => setSearchValue(newValue ?? '')}
						placeholder="Search a command..."
						className={classes.searchBar}
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

export const getStaticProps = async () => {
	const commands = await ssrFetch<FlattenedCommand[]>('/commands');

	return {
		props: {
			commands
		}
	};
};

export default CommandsPage;
