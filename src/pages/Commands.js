import React, { Component, Fragment } from 'reactn';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { apiFetch } from 'meta/util';
import LockIcon from '@material-ui/icons/Lock';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Tooltip from '@material-ui/core/Tooltip';
import DnsIcon from '@material-ui/icons/Dns';
import Container from '@material-ui/core/Container';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	card: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		width: '100%',
		height: '100%'
	},
	title: {
		fontSize: 14,
	},
	chip: {
		padding: theme.spacing(0.2)
	},
	cardContainer: {
		flex: '1 1 0%',
		minWidth: 500,
		maxWidth: 500,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			maxWidth: 'none'
		},
		transition: 'width 0.2s ease-in-out'
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
		const { loading, commands, titles } = this.state;
		const { classes } = this.props;
		return (
			<div>
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<Container>
						<Fragment>
								<h1>Commands:</h1>
								<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
									{commands.map(cmd => (
										<Grid item className={classes.cardContainer} key={cmd.name}>
											<Card className={classes.card}>
												<CardContent>
													<Grid item xs={12} sm container>
														<Grid item xs container direction="column" spacing={2}>
															<Typography variant="h5" component="h2">
																{cmd.name}
															</Typography>
														</Grid>
														<Grid item fontSize="small">
															{cmd.permissionLevel > 0 &&
																<Tooltip
																	title={titles[cmd.permissionLevel]}
																	placement="left"
																>
																	<Chip
																		label={cmd.permissionLevel}
																		avatar={<Avatar><DoubleArrowIcon /></Avatar>}
																		className={classes.chip}
																	/>
																</Tooltip>
															}
															{cmd.guildOnly &&
																<Tooltip
																	title="This command cannot be used in DMs."
																	placement="left"
																>
																	<Chip
																		label="Server Only"
																		avatar={<Avatar><DnsIcon /></Avatar>}
																		className={classes.chip}
																	/>
																</Tooltip>
															}
															{cmd.guarded &&
																<Tooltip
																	title="This command cannot be disabled."
																	placement="left"
																>
																	<Chip
																		label="Guarded"
																		avatar={<Avatar><LockIcon /></Avatar>}
																		className={classes.chip}
																	/>
																</Tooltip>
															}
														</Grid>
													</Grid>
													<Typography className={classes.title} color="textSecondary" gutterBottom>
														{cmd.description}
													</Typography>
												</CardContent>
											</Card>
										</Grid>
									))}
								</Grid>
						</Fragment>
					</Container>
				)}
			</div>
		);
	}
}

CommandsPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommandsPage);
