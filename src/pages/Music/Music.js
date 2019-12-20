import React, { Component, Fragment } from 'reactn';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import FlipMove from 'react-flip-move';
import {
	ListItemSecondaryAction,
	ListItemText,
	List,
	ListItem,
	Typography,
	IconButton,
	CardContent,
	Box,
	Avatar,
	ListItemIcon,
	Container,
	Divider
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';

import GeneralPage from 'components/GeneralPage';
import Link from 'components/Link';
import theme from 'meta/theme';

const CurrentlyPlaying = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 20px;
	margin-bottom: 20px;
	${theme.breakpoints.down('sm')} {
		text-align: center;
	}
	.video-container {
		width: 360px;
		height: 202.5px;
		${theme.breakpoints.down('sm')} {
			display: none;
		}
	}

	.MuiCardContent-root {
		max-width: 400px;
		min-width: 400px;
		min-height: 150px;
		max-height: 150px;
	}

	overflow: unset;
`;

const StyledList = styled(List)`
	max-width: 700px;
	width: 100%;
	margin: 0 auto;
`;

class MusicPage extends Component {
	state = {
		musicData: null
	};

	skipSong = () => {
		const { guildID } = this.props.match.params;
		this.ws.sendJSON({
			action: 'MUSIC_QUEUE_UPDATE',
			data: {
				guild_id: guildID,
				music_action: 'SKIP_SONG'
			}
		});
	};

	pauseSong = () => {
		const { guildID } = this.props.match.params;
		this.ws.sendJSON({
			action: 'MUSIC_QUEUE_UPDATE',
			data: {
				guild_id: guildID,
				music_action: 'PAUSE_SONG'
			}
		});
	};

	resumeSong = () => {
		const { guildID } = this.props.match.params;
		this.ws.sendJSON({
			action: 'MUSIC_QUEUE_UPDATE',
			data: {
				guild_id: guildID,
				music_action: 'RESUME_PLAYING'
			}
		});
	};

	componentDidMount() {
		const { guildID } = this.props.match.params;
		console.log(this.global);
		this.ws = new WebSocket('ws://localhost:565');
		this.ws.sendJSON = obj => this.ws.send(JSON.stringify(obj));
		this.ws.onopen = () => {
			console.log('connected to websocket');
			if (this.global.authenticated) {
				this.ws.send(
					JSON.stringify({
						action: 'AUTHENTICATE',
						data: {
							token: this.global.token,
							user_id: this.global.user.id
						}
					})
				);
			}

			this.ws.sendJSON({
				action: 'SUBSCRIPTION_UPDATE',
				data: {
					subscription_name: 'MUSIC',
					subscription_action: 'SUBSCRIBE',
					guild_id: guildID
				}
			});
		};

		this.ws.onmessage = event => {
			const message = JSON.parse(event.data);
			console.log(message);

			if (message.action === 'AUTHENTICATE') {
				return console.log(`Authenticating was ${message.success ? 'successfull' : 'unsucessfull'}`);
			}
			if (message.action === 'MUSIC_SYNC') {
				this.setState({ musicData: message.data });
			}
		};

		this.ws.onclose = e => {
			console.log(e);
		};
	}

	playerRef = playerRef => {
		this.playerRef = playerRef;
	};

	render() {
		const { musicData } = this.state;

		return (
			<GeneralPage
				containerProps={{
					style: {
						justifyContent: 'flex-start'
					}
				}}
				loading={false}
			>
				{musicData && (
					<Container>
						<Box overflow="visible" display="flex" flexDirection="column">
							{musicData.song ? (
								<FlipMove staggerDelayBy={150} appearAnimation="fade" enterAnimation="fade" leaveAnimation="fade">
									<CurrentlyPlaying key={musicData.song.identifier + musicData.song.position}>
										<div>
											<CardContent>
												<Typography component="h5" variant="h5">
													{musicData.song.title}
												</Typography>
												<Typography variant="subtitle1" color="textSecondary">
													{musicData.song.author}
												</Typography>
											</CardContent>
											{this.global.authenticated && (
												<Fragment>
													<IconButton>
														<SkipPreviousIcon />
													</IconButton>
													{musicData.status === 1 || musicData.status === 3 ? (
														<IconButton onClick={this.pauseSong}>
															<PauseIcon />
														</IconButton>
													) : (
														<IconButton onClick={this.resumeSong}>
															<PlayArrowIcon />
														</IconButton>
													)}

													<IconButton onClick={this.skipSong}>
														<SkipNextIcon />
													</IconButton>
												</Fragment>
											)}
										</div>
										<div className="video-container">
											<ReactPlayer
												width="100%"
												height="100%"
												onStart={() =>
													this.playerRef && this.playerRef.seekTo(musicData.position / 1000, 'seconds')
												}
												ref={this.playerRef}
												url={musicData.song.url}
												playing={musicData.status === 1}
											/>
										</div>
									</CurrentlyPlaying>
								</FlipMove>
							) : (
								<CurrentlyPlaying>
									<Typography variant="h2" component="h1">
										Not playing
									</Typography>
								</CurrentlyPlaying>
							)}
							<Divider />
							{musicData && musicData.queue && (
								<StyledList>
									{console.log(musicData.queue)}

									<FlipMove
										staggerDelayBy={80}
										appearAnimation="fade"
										enterAnimation="fade"
										leaveAnimation="accordionVertical"
									>
										{/* Need to wrap an extra div here because of a bug in flipmove */}
										{musicData.queue.map(song => (
											<div key={song.id}>
												<Link underline="none" color="textPrimary" to={song.url}>
													<ListItem button>
														<ListItemIcon>
															<Avatar src={`https://img.youtube.com/vi/${song.identifier}/hqdefault.jpg`} />
														</ListItemIcon>
														<ListItemText primary={song.title} secondary={song.author} />
														<ListItemSecondaryAction>
															<IconButton edge="end">
																<DeleteIcon />
															</IconButton>
														</ListItemSecondaryAction>
													</ListItem>
												</Link>
											</div>
										))}
									</FlipMove>
								</StyledList>
							)}
						</Box>
					</Container>
				)}
			</GeneralPage>
		);
	}
}

export default MusicPage;
