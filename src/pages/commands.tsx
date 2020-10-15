import { createSeoProps } from '@config/next-seo.config';
import { FlattenedCommand } from '@config/types/ApiData';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DnsIcon from '@material-ui/icons/Dns';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LockIcon from '@material-ui/icons/Lock';
import Image from '@mods/ReactMarkdown/Image';
import InlineCode from '@mods/ReactMarkdown/InlineCode';
import Link from '@mods/ReactMarkdown/Link';
import List from '@mods/ReactMarkdown/List';
import ListItem from '@mods/ReactMarkdown/ListItem';
import Strong from '@mods/ReactMarkdown/Strong';
import Tooltip from '@mui/Tooltip';
import UiSearchBar from '@mui/UiSearchBar';
import GeneralPage from '@presentational/Layout/General';
import ScrollToTop from '@routing/ScrollToTop';
import { reactStringReplace } from '@utils/reactStringReplace';
import { useWindowSize } from '@utils/useWindowSize';
import { apiFetch } from '@utils/util';
import debounce from 'lodash/debounce';
import { InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useCallback, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		'@global': {
			'.MuiAccordion-root.Mui-expanded:last-child': {
				marginBottom: theme.spacing(2)
			}
		},
		chip: {
			padding: theme.spacing(0.2),
			marginLeft: theme.spacing(1)
		},
		cardContainer: {
			flex: '1 1 30%',
			minWidth: '100%',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			transition: 'width 0.2s ease-in-out',
			[theme.breakpoints.down('xs')]: {
				maxWidth: 'none',
				marginLeft: 0,
				marginRight: 0
			}
		},
		searchBar: {
			marginBottom: theme.spacing(1),
			position: 'fixed',
			zIndex: theme.zIndex.appBar - 1,
			top: theme.spacing(9)
		},
		rankIcon: {
			transform: 'rotate(-90deg)'
		},
		categoryAccordion: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1)
		},
		commandAccordion: {
			backgroundColor: theme.palette.secondary.light
		},
		categoryHeading: {
			fontSize: theme.typography.pxToRem(20),
			fontWeight: theme.typography.fontWeightRegular
		},
		commandHeading: {
			fontSize: theme.typography.pxToRem(20),
			fontWeight: theme.typography.fontWeightRegular
		},
		commandSubHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary
		},
		commandChips: {
			textAlign: 'right'
		}
	})
);

/** @see {@link https://www.fileformat.info/info/unicode/char/2002/index.htm Unicode Character 'EN SPACE' (U+2002)} */
const EnSpace = String.fromCharCode(8194);
/** @see {@link https://www.fileformat.info/info/unicode/char/200b/index.htm Unicode Character 'ZERO WIDTH SPACE' (U+200B)} */
const ZeroWidthSpace = String.fromCharCode(8203);

const resolveMultilineString = (str: string | string[], multiline: boolean): string => {
	return Array.isArray(str)
		? resolveMultilineString(str.join(multiline ? '\n' : ' '), multiline)
		: str
				.split('\n')
				.map(line => line.trim())
				.join(multiline ? '\n\n' : ' ');
};

/**
 * Parses command descriptions, replacing emojis with their proper counterparts
 * @param description Command description to parse
 */
const parseCommandDescription = (description: string) => description.replace(/<:(\w{2,32}):[0-9]{18}>/gi, '$1');

const CommandsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ commands }) => {
	const classes = useStyles();
	const [searchValue, setSearchValue] = useState('');
	const [commandsBoxWidth, setCommandsBoxWidth] = useState(500);

	const titles = useMemo<Record<number, string>>(
		() => ({
			4: 'This command can only be run by staff members.',
			5: 'This command can only be run by moderators and administrators.',
			6: 'This command can only be run by administrators.'
		}),
		[]
	);

	const categories = useMemo(() => [...new Set(commands.map(command => command.category))], [commands]);
	const filterCommands = useCallback((command: FlattenedCommand) => command.name.toLowerCase().includes(searchValue.toLowerCase()), [
		searchValue
	]);

	const handleSearch = debounce((value: string) => {
		setSearchValue(value);
	}, 200);

	const parseCommandExtendedHelp = useCallback((command: FlattenedCommand) => {
		const { extendedHelp, explainedUsage = [], possibleFormats = [], examples = [], reminder, multiline } = command.extendedHelp;

		const output: string[] = [`**![](/emojis/pencil.png) |${EnSpace}*Command Usage***\n`, `\`s!${command.usage}\``, ''];

		// Extended help
		if (extendedHelp) {
			output.push(`**![](/emojis/magnifying-glass.png) |${EnSpace}*Extended Help***\n`);
			output.push(resolveMultilineString(extendedHelp, multiline ?? false), '');
		}

		// Explained usage
		if (explainedUsage.length) {
			output.push(`**![](/emojis/gear.png) |${EnSpace}*Explained Usage***\n`);
			output.push(...explainedUsage.map(([arg, desc]) => `- **${arg}**: ${desc}\n`), '');
		}

		// Possible formats
		if (possibleFormats.length) {
			output.push(`**![](/emojis/1234.png) |${EnSpace}*Possible formats***\n`);
			output.push(...possibleFormats.map(([type, example]) => `- **${type}**: ${example}\n`), '');
		}

		// Examples
		if (examples.length) {
			output.push(`**![](/emojis/chain.png) |${EnSpace}*Examples***\n`);
			output.push(...examples.map(example => `- Skyra, ${command.name}${example ? ` *${example}*` : ''}\n`), '');
		} else {
			output.push(`**![](/emojis/chain.png) |${EnSpace}*Examples***\n`);
			output.push(`- Skyra, ${command.name}`, '');
		}

		// Reminder
		if (reminder) {
			output.push(`**![](/emojis/alarm-clock.png) |${EnSpace}*Reminder***\n`);
			output.push(resolveMultilineString(reminder, multiline ?? false));
		}

		return output
			.join('\n')
			.replace(/<:shiny:612364146792726539>/g, '![](/emojis/shiny.png)')
			.replace(/<([a-zA-Z])/g, `<${ZeroWidthSpace}$1`);
	}, []);

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

	// TODO: Virtualized List
	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Commands' })} />
			<ScrollToTop />
			<GeneralPage>
				<Container>
					<UiSearchBar
						value={searchValue}
						onChange={handleSearch}
						onCancelSearch={() => setSearchValue('')}
						onRequestSearch={newValue => setSearchValue(newValue ?? '')}
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
						{categories.map((catName, catIndex) => {
							const filteredCategory = commands.filter(command => command.category === catName).filter(filterCommands);

							if (!filteredCategory.length) return null;

							return (
								<Accordion key={catIndex} defaultExpanded square classes={{ root: classes.categoryAccordion }}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography variant="h2" component="h1" className={classes.categoryHeading}>
											{catName}
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Box display="flex" flexWrap="wrap" flex="1 1 30%" width="100%">
											{filteredCategory.map((cmd, idx) => (
												<Grid item className={classes.cardContainer} key={idx}>
													<Accordion elevation={4} classes={{ root: classes.commandAccordion }}>
														<AccordionSummary expandIcon={<ExpandMoreIcon />}>
															<Grid
																container
																direction="row"
																alignItems="center"
																justify="flex-start"
																alignContent="flex-start"
															>
																<Grid item xs={12} md={3}>
																	<Typography className={classes.commandHeading}>
																		{reactStringReplace(`s!${cmd.name}`, /(.{10})/g, (match, index) => (
																			<span key={index}>
																				<wbr />
																				{match}
																			</span>
																		))}
																	</Typography>
																</Grid>
																<Grid item xs={12} md={9}>
																	<Typography className={classes.commandSubHeading}>
																		{parseCommandDescription(cmd.description)}
																	</Typography>
																</Grid>
															</Grid>
														</AccordionSummary>
														<AccordionDetails>
															<Typography component="span">
																<ReactMarkdown
																	source={parseCommandExtendedHelp(cmd)}
																	parserOptions={{ gfm: true }}
																	renderers={{
																		link: Link,
																		linkReference: Link,
																		image: Image,
																		strong: Strong,
																		list: List,
																		listItem: ListItem,
																		inlineCode: InlineCode
																	}}
																	escapeHtml={false}
																/>
															</Typography>
														</AccordionDetails>
														<AccordionActions>
															{cmd.permissionLevel > 0 && (
																<Tooltip title={titles[cmd.permissionLevel]} placement="top">
																	<Chip
																		size="small"
																		label={cmd.permissionLevel}
																		icon={<DoubleArrowIcon />}
																		classes={{
																			root: classes.chip,
																			iconSmall: classes.rankIcon
																		}}
																	/>
																</Tooltip>
															)}
															{cmd.guildOnly && (
																<Tooltip title="This command cannot be used in DMs." placement="top">
																	<Chip
																		size="small"
																		icon={<DnsIcon />}
																		classes={{
																			root: classes.chip
																		}}
																	/>
																</Tooltip>
															)}
															{cmd.guarded && (
																<Tooltip title="This command cannot be disabled." placement="top">
																	<Chip
																		size="small"
																		icon={<LockIcon />}
																		classes={{
																			root: classes.chip
																		}}
																	/>
																</Tooltip>
															)}
														</AccordionActions>
													</Accordion>
												</Grid>
											))}
										</Box>
									</AccordionDetails>
								</Accordion>
							);
						})}
					</Box>
				</Container>
			</GeneralPage>
		</>
	);
};

export const getStaticProps = async () => {
	const commands = await apiFetch<FlattenedCommand[]>('/commands');

	return {
		props: {
			commands
		}
	};
};

export default CommandsPage;
