import { FlattenedCommand } from '@config/types/ApiData';
import { Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DnsIcon from '@material-ui/icons/Dns';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@mui/Tooltip';
import GeneralPage from '@presentational/Layout/General';
import ScrollToTop from '@routing/ScrollToTop';
import { cutText } from '@sapphire/utilities';
import { apiFetch, parseCommandDescription } from '@utils/util';
import React, { FC, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1
		},
		card: {
			color: theme.palette.text.secondary,
			minHeight: 120
		},
		title: {
			fontSize: 14
		},
		chip: {
			padding: theme.spacing(0.2),
			marginLeft: theme.spacing(1)
		},
		avatar: {
			backgroundColor: 'transparent !important'
		},
		cardContainer: {
			flex: '1 1 30%',
			minWidth: 300,
			margin: theme.spacing(2),
			transition: 'width 0.2s ease-in-out',
			[theme.breakpoints.down('xs')]: {
				width: '100%',
				maxWidth: 'none',
				marginLeft: 0,
				marginRight: 0
			}
		},
		categoryName: {
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center',
				fontSize: '2rem'
			}
		},
		rankIcon: {
			transform: 'rotate(-90deg)'
		},
		shinyIcon: {
			height: 16,
			paddingLeft: '0.5rem'
		}
	})
);

const Commands: FC = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [commands, setCommands] = useState<FlattenedCommand[]>([]);

	const titles: Record<number, string> = {
		4: 'This command can only be run by staff members.',
		5: 'This command can only be run by moderators and administrators.',
		6: 'This command can only be run by administrators.'
	};

	useEffect(() => {
		apiFetch<FlattenedCommand[]>('/commands').then(commands => {
			setCommands(commands);
			setLoading(false);
		});
	}, []);

	const categories = [...new Set(commands.map(command => command.category))];

	return (
		<>
			<ScrollToTop />
			<GeneralPage loading={loading}>
				<Container>
					{!loading && (
						<Box display="flex" flexDirection="column">
							{categories.map((catName, catIndex) => (
								<Box my={3} key={catIndex}>
									<Typography variant="h2" component="h1" className={classes.categoryName}>
										{catName}
									</Typography>
									<Box my={3}>
										<Divider />
									</Box>
									<Box display="flex" flexWrap="wrap" flex="1 1 30%">
										{commands
											.filter(command => command.category === catName)
											.map((cmd, idx) => (
												<Grid item className={classes.cardContainer} key={idx}>
													<Card className={classes.card}>
														<CardContent>
															<Box display="flex" justifyContent="space-between">
																<If condition={cmd.name.length < 19}>
																	<Then>
																		<Typography variant="h5" component="h2">
																			s!{cmd.name}
																		</Typography>
																	</Then>
																	<Else>
																		<Tooltip title={`s!${cmd.name}`}>
																			<Typography variant="h5" component="h2">
																				{cutText(`s!${cmd.name}`, 19)}
																			</Typography>
																		</Tooltip>
																	</Else>
																</If>
																<Grid item container justify="flex-end">
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
																		<Tooltip
																			title="This command cannot be used in DMs."
																			placement="top"
																		>
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
																</Grid>
															</Box>
															<Typography className={classes.title} color="textSecondary" gutterBottom>
																{parseCommandDescription(cmd.description)}
															</Typography>
														</CardContent>
													</Card>
												</Grid>
											))}
									</Box>
								</Box>
							))}
						</Box>
					)}
				</Container>
			</GeneralPage>
		</>
	);
};

export default Commands;
