import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import GeneralPage from 'components/GeneralPage';
import Link from 'components/Link';
import { WS_URL } from 'meta/constants';
import {
	ClientActions,
	IncomingWebsocketMessage,
	MusicActions,
	MusicData,
	MusicStatus,
	OutgoingWebsocketMessage,
	ServerActions
} from 'meta/typings/Music';
import { getAcronym } from 'meta/util';
import { useRef } from 'react';
import FlipMove from 'react-flip-move';
import { Else, If, Then, When } from 'react-if';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import React, { useEffect, useGlobal, useState } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		currentlyPlaying: {
			display: 'flex',
			justifyContent: 'space-around',
			alignItems: 'center',
			padding: theme.spacing(2),
			marginBottom: theme.spacing(2),
			overflow: 'unset',
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center'
			}
		},
		videoContainer: {
			width: 360,
			height: 202.5,
			[theme.breakpoints.down('sm')]: {
				display: 'none'
			}
		},
		cardContent: {
			maxWidth: 400,
			minWidth: 400,
			minHeight: 150,
			maxHeight: 150
		},
		cardPlayPauseIcon: {
			height: 38,
			width: 38
		},
		list: {
			maxWidth: 700,
			width: '100%',
			margin: '0 auto'
		}
	})
);

export default () => {
	const classes = useStyles();
	const { guildID } = useParams();
	const [authenticated] = useGlobal('authenticated');
	const [token] = useGlobal('token');
	const [user] = useGlobal('user');
	const theme = useTheme();

	const [voiceChannel, setVoiceChannel] = useState<MusicData['voiceChannel']>(null);
	const [song, setSong] = useState<MusicData['song']>(null);
	const [queue, setQueue] = useState<MusicData['queue']>([]);
	const [position, setPosition] = useState<MusicData['position']>(0);
	const [status, setStatus] = useState<MusicData['status']>(MusicStatus.INSTANTIATED);
	const [, setVolume] = useState<MusicData['volume']>(0);
	const [replay, setReplay] = useState<MusicData['replay']>(false);
	const [ws, setWs] = useState<WebSocket>(new WebSocket(WS_URL));

	const playerRef = useRef<ReactPlayer | null>(null);

	/* eslint-disable @typescript-eslint/camelcase */
	const skipSong = () => {
		ws.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildID,
				music_action: MusicActions.SkipSong
			}
		});
	};
	const pauseSong = () => {
		ws.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildID,
				music_action: MusicActions.PauseSong
			}
		});
	};
	const resumeSong = () => {
		ws.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildID,
				music_action: MusicActions.ResumePlaying
			}
		});
	};

	useEffect(() => {
		if (!ws) setWs(new WebSocket(WS_URL));

		ws.sendJSON = data => ws.send(JSON.stringify(data));

		ws.onopen = () => {
			if (authenticated) {
				ws.sendJSON({
					action: ClientActions.Authenticate,
					data: {
						token: token,
						user_id: user.id
					}
				});
			}

			ws.sendJSON({
				action: ClientActions.SubscriptionUpdate,
				data: {
					subscription_name: MusicActions.WebsocketSubscriptionName,
					subscription_action: MusicActions.WebsocketSubscriptionAction,
					guild_id: guildID
				}
			});
		};
		/* eslint-enable @typescript-eslint/camelcase */

		ws.onmessage = event => {
			const { action, data } = JSON.parse(event.data) as IncomingWebsocketMessage;

			/* eslint-disable	@typescript-eslint/no-non-null-assertion,
								@typescript-eslint/no-unnecessary-type-assertion,
								react-hooks/exhaustive-deps
			*/
			switch (action) {
				case ServerActions.Authenticate:
					// This event doesn't need to be handled
					break;

				case ServerActions.MusicAdd:
					setQueue(data!.queue);
					break;

				case ServerActions.MusicConnect:
					setVoiceChannel(data!.voiceChannel);
					break;

				case ServerActions.MusicLeave:
					setVoiceChannel(null);
					break;

				case ServerActions.MusicPrune:
					setQueue([]);
					break;

				case ServerActions.MusicRemove:
					setQueue(data!.queue);
					break;

				case ServerActions.MusicReplayUpdate:
					setReplay(data!.replay);
					break;

				case ServerActions.MusicShuffleQueue:
					setQueue(data!.queue);
					break;

				case ServerActions.MusicSongFinish:
					setSong(null);
					setQueue(data!.queue);
					setPosition(0);
					setStatus(MusicStatus.ENDED);
					break;

				case ServerActions.MusicSongPause:
					setStatus(MusicStatus.PAUSED);
					break;

				case ServerActions.MusicSongPlay:
					setSong(data!.song);
					setQueue(data!.queue);
					setPosition(0);
					break;

				case ServerActions.MusicSongReplay:
					setSong(data!.song);
					setPosition(0);
					setStatus(MusicStatus.PLAYING);
					break;

				case ServerActions.MusicSongResume:
					setStatus(MusicStatus.PLAYING);
					break;

				case ServerActions.MusicSongSeekUpdate:
					setPosition(data!.position);
					break;

				case ServerActions.MusicSongSkip:
					setSong(null);
					setQueue(data!.queue);
					break;

				case ServerActions.MusicSongVolumeUpdate:
					setVolume(data!.volume);
					break;

				case ServerActions.MusicSync:
					setVoiceChannel(data!.voiceChannel);
					setSong(data!.song);
					setPosition(data!.position);
					setStatus(data!.status);
					setQueue(data!.queue);
					break;

				case ServerActions.MusicVoiceChannelJoin:
					// This event doesn't need to be handled, its handled by MusicConnect
					break;

				case ServerActions.MusicVoiceChannelLeave:
					// This event doesn't need to be handled, its handled by MusicLeave
					break;
			}
		};
	}, []);
	/* eslint-enable	@typescript-eslint/no-non-null-assertion,
						@typescript-eslint/no-unnecessary-type-assertion,
						react-hooks/exhaustive-deps
	*/

	return (
		<GeneralPage
			containerProps={{
				style: {
					justifyContent: 'flex-start'
				}
			}}
			loading={false}
		>
			<Container>
				<Box overflow="visible" display="flex" flexDirection="column">
					<If condition={song === null || voiceChannel === null}>
						<Then>
							<Box component="div" className={classes.currentlyPlaying}>
								<Typography variant="h2" component="h1">
									Not Playing
								</Typography>
							</Box>
						</Then>
						<Else>
							<FlipMove staggerDelayBy={150} appearAnimation="fade" enterAnimation="fade" leaveAnimation="fade">
								<Box component="div" className={classes.currentlyPlaying} key={song?.identifier}>
									<Box component="div">
										<CardContent classes={{ root: classes.cardContent }}>
											<Typography component="h5" variant="h5" data-premid="music-title">
												{song?.title || 'Unknown Title'}
											</Typography>
											<Typography variant="subtitle1" color="textSecondary" data-premid="music-from">
												{song?.author || 'Unknown Uploader'}
											</Typography>
										</CardContent>
										<When condition={authenticated}>
											<IconButton disabled aria-label={theme.direction === 'rtl' ? 'next' : 'previous'}>
												{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
											</IconButton>
											<If condition={status === MusicStatus.PLAYING}>
												<Then>
													<IconButton onClick={pauseSong}>
														<PauseIcon className={classes.cardPlayPauseIcon} />
													</IconButton>
												</Then>
												<Else>
													<IconButton onClick={resumeSong}>
														<PlayArrowIcon className={classes.cardPlayPauseIcon} />
													</IconButton>
												</Else>
											</If>

											<IconButton onClick={skipSong} aria-label={theme.direction === 'rtl' ? 'previous' : 'next'}>
												{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
											</IconButton>
										</When>
									</Box>
									<Box className={classes.videoContainer}>
										<ReactPlayer
											width="100%"
											height="100%"
											onStart={() => playerRef.current && playerRef.current.seekTo(position / 1000, 'seconds')}
											onReady={() => setStatus(MusicStatus.PLAYING)}
											loop={replay}
											ref={playerRef}
											url={song?.url}
											playing={status === MusicStatus.PLAYING}
											muted
										/>
									</Box>
								</Box>
							</FlipMove>
						</Else>
					</If>
					<Divider />
					<When condition={queue.length !== 0}>
						<List classes={{ root: classes.list }}>
							<FlipMove
								delay={0}
								staggerDurationBy={15}
								staggerDelayBy={20}
								duration={700}
								easing="ease"
								appearAnimation="fade"
								enterAnimation="fade"
								leaveAnimation="accordionVertical"
							>
								{queue.map((song, index) => (
									<div key={index}>
										<Link to={song.url}>
											<ListItem button>
												<ListItemIcon>
													<If condition={song.url.includes('youtube')}>
														<Then>
															<Avatar src={`https://img.youtube.com/vi/${song.identifier}/hqdefault.jpg`} />
														</Then>
														<Else>
															<Avatar>{getAcronym(song.title)}</Avatar>
														</Else>
													</If>
												</ListItemIcon>
												<ListItemText primary={song.title} secondary={song.author} />
											</ListItem>
										</Link>
									</div>
								))}
							</FlipMove>
						</List>
					</When>
				</Box>
			</Container>
		</GeneralPage>
	);
};

declare global {
	interface WebSocket {
		sendJSON: (data: OutgoingWebsocketMessage) => void;
	}
}
