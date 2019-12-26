import React, { Component, Fragment } from 'reactn';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import FlipMove from 'react-flip-move';
import {
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
import PauseIcon from '@material-ui/icons/Pause';

import GeneralPage from 'components/GeneralPage';
import Link from 'components/Link';
import theme from 'meta/theme';
import { debug } from 'meta/util';
import { WS_URL } from 'meta/constants';

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
		this.ws = new WebSocket(WS_URL);
		this.ws.sendJSON = obj => this.ws.send(JSON.stringify(obj));
		this.ws.onopen = () => {
			debug('Connected to websocket.');

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
			debug(message);

			switch (message.action) {
				case 'AUTHENTICATE':
					debug(`Authenticating was ${message.success ? 'successful' : 'unsucessful'}`);
					break;

				case 'MUSIC_SYNC':
					this.setState({ musicData: message.data });
					debug('Received Music Sync.');
					break;

				case 'MUSIC_CONNECT':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							voiceChannel: message.data.id
						}
					}));
					break;

				case 'MUSIC_LEAVE':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							voiceChannel: null
						}
					}));
					break;

				case 'MUSIC_ADD':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							queue: data.musicData.queue.concat(message.data)
						}
					}));
					break;

				case 'MUSIC_PRUNE':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							queue: []
						}
					}));
					break;

				case 'MUSIC_REMOVE':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							queue: data.musicData.filter(song => song.id !== message.data.id)
						}
					}));
					break;

				// case 'MUSIC_REPLAY_UPDATE':
				case 'MUSIC_SHUFFLE_QUEUE':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							queue: message.data
						}
					}));
					break;

				case 'MUSIC_SONG_FINISH':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							song: null,
							position: 0,
							status: 3
						}
					}));
					break;

				case 'MUSIC_SONG_PAUSE':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							status: 2
						}
					}));
					break;

				case 'MUSIC_SONG_PLAY':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							song: message.data,
							position: 0,
							status: 1,
							queue: data.musicData.queue.slice(1)
						}
					}));
					break;

				case 'MUSIC_SONG_REPLAY':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							position: 0,
							status: 1
						}
					}));
					break;

				case 'MUSIC_SONG_RESUME':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							status: 1
						}
					}));
					break;

				case 'MUSIC_SONG_SEEK_UPDATE':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							position: message.data.position
						}
					}));
					break;

				case 'MUSIC_SONG_SKIP':
					this.setState(data => ({
						musicData: {
							...data.musicData,
							song: null,
							queue: data.musicData.queue.slice(1)
						}
					}));
					break;
			}
		};

		this.ws.onclose = e => {
			debug('Disconnected from websocket', e);
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
							{musicData.queue && (
								<StyledList>
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
														{/*
														<ListItemSecondaryAction>
															<IconButton edge="end">
																<DeleteIcon />
															</IconButton>
														</ListItemSecondaryAction>
														*/}
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
