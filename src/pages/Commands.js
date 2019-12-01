import React, { Component } from 'reactn';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { apiFetch } from 'meta/util';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@material-ui/core/Tooltip';
import DnsIcon from '@material-ui/icons/Dns';
import Container from '@material-ui/core/Container';

import GeneralPage from 'components/GeneralPage';
import { Box, Divider } from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	card: {
		color: theme.palette.text.secondary
	},
	title: {
		fontSize: 14
	},
	chip: {
		padding: theme.spacing(0.2),
		marginLeft: theme.spacing(1)
	},
	cardContainer: {
		flex: '1 1 30%',
		minWidth: 300,
		margin: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			maxWidth: 'none'
		},
		transition: 'width 0.2s ease-in-out'
	},
	categoryName: {
		[theme.breakpoints.down('sm')]: {
			textAlign: 'center'
		}
	}
});

class CommandsPage extends Component {
	state = {
		loading: true,
		commands: [],
		titles: {
			4: 'This command can only be run by staff members.',
			5: 'This command can only be run by moderators and administrators.',
			6: 'This command can only be run by administrators.'
		}
	};

	async componentDidMount() {
		const commands = await apiFetch('/commands');
		this.setState({ loading: false, commands });
	}

	render() {
		const { loading, commands } = this.state;
		const { classes } = this.props;
		const categories = [...new Set(commands.map(command => command.category))];

		return (
			<GeneralPage loading={loading}>
				<Container px={5}>
					{!loading && (
						<Box display="flex" flexDirection="column">
							{categories.map(catName => (
								<Box my={3}>
									<Typography variant="h2" component="h1" className={classes.categoryName}>
										{catName}
									</Typography>
									<Box my={3}>
										<Divider />
									</Box>
									<Box display="flex" flexWrap="wrap" flex="1 1 30%">
										{commands
											.filter(command => command.category === catName)
											.map(cmd => (
												<Grid item className={classes.cardContainer} key={cmd.name}>
													<Card className={classes.card}>
														<CardContent>
															<Box display="flex" justifyContent="space-between">
																<Typography variant="h5" component="h2">
																	s!{cmd.name}
																</Typography>
																<Grid item fontSize="small" container width="45%" justify="flex-end">
																	{/*cmd.permissionLevel > 0 && (
														<Tooltip title={titles[cmd.permissionLevel]} placement="left">
															<Chip
																label={cmd.permissionLevel}
																avatar={
																	<Avatar>
																		<DoubleArrowIcon />
																	</Avatar>
																}
																className={classes.chip}
															/>
														</Tooltip>
															)*/}
																	{cmd.guildOnly && (
																		<Tooltip
																			title="This command cannot be used in DMs."
																			placement="left"
																		>
																			<DnsIcon className={classes.chip} />
																		</Tooltip>
																	)}
																	{cmd.guarded && (
																		<Tooltip title="This command cannot be disabled." placement="left">
																			<LockIcon className={classes.chip} />
																		</Tooltip>
																	)}
																</Grid>
															</Box>
															<Typography className={classes.title} color="textSecondary" gutterBottom>
																{cmd.description}
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
		);
	}
}

CommandsPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommandsPage);
