import { ButtonGroup, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ForumIcon from '@material-ui/icons/Forum';
import HomeIcon from '@material-ui/icons/Home';
import { history } from 'lib/util/constants';
import React, { Component } from 'react';

const styles = createStyles({
	root: {
		overflowY: 'hidden'
	},
	text: {
		lineHeight: 1.6,
		textAlign: 'center',
		marginBottom: 40
	}
});

function navigate(path: string) {
	if (path.startsWith('http')) {
		return () => (window.location.href = path);
	}
	return () => history.push(path);
}

type ErrorBoundaryProps = WithStyles<typeof styles>;
type ErrorBoundaryState = Record<PropertyKey, unknown> & { hasError: boolean };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state = { hasError: false };

	static getDerivedStateFromError(error: any) {
		console.log(error);
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		const { classes, children } = this.props;

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<Container maxWidth="md">
					<Grid
						container
						direction="column"
						justify="center"
						alignContent="stretch"
						alignItems="center"
						classes={{ root: classes.root }}
					>
						<Grid item>
							<Typography variant="h4" color="textPrimary" classes={{ root: classes.text }}>
								Woaw! You just ran into a non-existing page! If you think you got here by mistake then feel free to join the
								support server on Discord using the button below and let us know.
							</Typography>
						</Grid>
						<Grid item>
							<Box>
								<ButtonGroup variant="contained" color="primary" size="small">
									<Button onClick={navigate('https://join.skyra.pw')} startIcon={<ForumIcon />}>
										Join Support Server
									</Button>
									<Button onClick={navigate('/')} startIcon={<HomeIcon />}>
										Go Back Home
									</Button>
								</ButtonGroup>
							</Box>
						</Grid>
					</Grid>
				</Container>
			);
		}

		return children;
	}
}

export default withStyles(styles)(ErrorBoundary);
