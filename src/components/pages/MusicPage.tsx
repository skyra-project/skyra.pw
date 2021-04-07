import {
	ClientActions,
	IncomingWebsocketMessage,
	MusicActions,
	MusicConnectEvent,
	MusicPruneEvent,
	MusicReplayUpdateEvent,
	MusicSongSeekEvent,
	MusicStatus,
	MusicSyncEvent,
	MusicVolumeEvent,
	OutgoingWebsocketMessage,
	ServerActions,
	SubscriptionActions
} from '@config/types/Music';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useMobileContext } from '@contexts/MobileContext';
import GeneralPage from '@layout/General';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import LazyAvatar from '@mui/LazyAvatar';
import SimpleGrid from '@mui/SimpleGrid';
import Link from '@routing/Link';
import type { Track, TrackInfo } from '@skyra/audio';
import { WS_URL } from '@utils/constants';
import { cast, getAcronym } from '@utils/util';
import React, { FC, forwardRef, memo, useEffect, useMemo, useState } from 'react';
import FlipMove from 'react-flip-move';
import { Else, If, Then, When } from 'react-if';
import ReactPlayer from 'react-player';
import { Virtuoso } from 'react-virtuoso';
import type { Components } from 'react-virtuoso/dist/interfaces';

interface MusicPageProps {
	guildId: string;
}

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
		cardDeleteIcon: {
			height: 38,
			width: 38,
			color: theme.palette.error.main
		},
		virtualizedRoot: {
			margin: theme.spacing(1)
		},
		link: {
			display: 'flex',
			alignItems: 'center',
			alignContent: 'flex-start',
			justifyContent: 'flex-start',
			flex: '1 1 0'
		}
	})
);

const MusicPage: FC<MusicPageProps> = ({ guildId }) => {
	const classes = useStyles();
	const authenticated = useAuthenticated();
	const theme = useTheme();
	const { isMobile } = useMobileContext();

	const [voiceChannel, setVoiceChannel] = useState<string | null>(null);
	const [currentSong, setCurrentSong] = useState<TrackInfo>();
	const [trackId, setTrackId] = useState<string>('');
	const [queue, setQueue] = useState<Track[]>([]);
	const [position, setPosition] = useState(0);
	const [status, setStatus] = useState<MusicStatus>(MusicStatus.INSTANTIATED);
	const [volume, setVolume] = useState(0);
	const [replay, setReplay] = useState(false);
	const [ws, setWs] = useState<WebSocket | undefined>();

	const [player, setPlayer] = useState<ReactPlayer | undefined>();

	const playerRef = (player: ReactPlayer | null | undefined) => {
		if (player) {
			setPlayer(player);
		}
	};

	const changeVolume = (volume: number) => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildId,
				music_action: MusicActions.SetVolume,
				volume
			}
		});
	};

	const skipSong = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildId,
				music_action: MusicActions.SkipSong
			}
		});
	};

	const pauseSong = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildId,
				music_action: MusicActions.PauseSong
			}
		});
	};

	const resumeSong = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildId,
				music_action: MusicActions.ResumePlaying
			}
		});
	};

	const clearQueue = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildId,
				music_action: MusicActions.ClearTracks
			}
		});
	};

	const shuffleQueue = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildId,
				music_action: MusicActions.ShuffleTracks
			}
		});
	};

	const removeSong = (index: number) => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildId,
				music_action: MusicActions.DeleteSong,
				track_position: index
			}
		});
	};

	useEffect(() => {
		if (!ws) setWs(new WebSocket(WS_URL));

		if (ws) {
			ws.sendJSON = (data) => ws.send(JSON.stringify(data));

			ws.onopen = () => {
				ws.sendJSON({
					action: ClientActions.SubscriptionUpdate,
					data: {
						subscription_name: SubscriptionActions.WebsocketSubscriptionName,
						subscription_action: SubscriptionActions.WebsocketSubscriptionAction,
						guild_id: guildId
					}
				});
			};

			ws.onmessage = (event) => {
				const { action, data } = JSON.parse(event.data) as IncomingWebsocketMessage;

				switch (action) {
					case ServerActions.MusicConnect: {
						setVoiceChannel(cast<MusicConnectEvent['data']>(data).voiceChannel);
						break;
					}

					case ServerActions.MusicLeave: {
						setVoiceChannel(null);
						break;
					}

					case ServerActions.MusicPrune: {
						setQueue(cast<MusicPruneEvent['data']>(data).tracks);
						break;
					}

					case ServerActions.MusicReplayUpdate: {
						setReplay(cast<MusicReplayUpdateEvent['data']>(data).replay);
						break;
					}

					case ServerActions.MusicFinish: {
						setTrackId('');
						setQueue([]);
						setPosition(0);
						setStatus(MusicStatus.ENDED);
						break;
					}

					case ServerActions.MusicSongPause: {
						setStatus(MusicStatus.PAUSED);
						break;
					}

					case ServerActions.MusicSongResume: {
						setStatus(MusicStatus.PLAYING);
						break;
					}

					case ServerActions.MusicSongSeekUpdate: {
						const newPosition = cast<MusicSongSeekEvent['data']>(data).status.position / 1000;
						setPosition(newPosition);

						player?.seekTo(newPosition, 'seconds');

						break;
					}

					case ServerActions.MusicSongVolumeUpdate: {
						setVolume(cast<MusicVolumeEvent['data']>(data).volume);
						break;
					}

					case ServerActions.MusicSync: {
						const dt = cast<MusicSyncEvent['data']>(data);
						if (dt.voiceChannel) setVoiceChannel(dt.voiceChannel);
						if (dt.volume !== undefined) setVolume(dt.volume);

						if (dt.status) {
							setTrackId(dt.status.entry.track);
							setCurrentSong(dt.status.entry.info);
							setPosition(dt.status.position);
						}

						setQueue(dt.tracks);

						break;
					}
				}
			};
		}
	}, [guildId, ws, player]);

	const VirtuosoComponents = useMemo<Components>(
		() => ({
			List: forwardRef(({ style, children }, listRef) => (
				<List style={{ ...style, width: '100%' }} ref={listRef} component="nav">
					{children}
				</List>
			)),

			Item: ({ children, ...props }) => (
				<ListItem {...props} button style={{ margin: 0 }}>
					{children}
				</ListItem>
			)
		}),
		[]
	);

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
					<If condition={trackId === '' || voiceChannel === null}>
						<Then>
							<Box component="div" className={classes.currentlyPlaying}>
								<Typography variant="h2" component="h1">
									Not Playing
								</Typography>
							</Box>
						</Then>
						<Else>
							<FlipMove staggerDelayBy={150} appearAnimation="fade" enterAnimation="fade" leaveAnimation="fade">
								<Box component="div" className={classes.currentlyPlaying} key={currentSong?.identifier ?? '0'}>
									<Box component="div">
										<CardContent classes={{ root: classes.cardContent }}>
											<Typography component="h5" variant="h5" data-premid="music-title">
												{currentSong?.title ?? 'Unknown Title'}
											</Typography>
											<Typography variant="subtitle1" color="textSecondary" data-premid="music-from">
												{currentSong?.author ?? 'Unknown Uploader'}
											</Typography>
										</CardContent>
										<When condition={authenticated}>
											<SimpleGrid
												direction="row"
												justify="center"
												alignItems="center"
												gridItemProps={{
													xs: 4,
													sm: 4,
													md: true,
													lg: true,
													xl: true
												}}
											>
												<IconButton disabled aria-label={theme.direction === 'rtl' ? 'next' : 'previous'}>
													{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
												</IconButton>
												<If condition={status === MusicStatus.PLAYING}>
													<Then>
														<IconButton onClick={pauseSong} aria-label="pause">
															<PauseIcon className={classes.cardPlayPauseIcon} />
														</IconButton>
													</Then>
													<Else>
														<IconButton onClick={resumeSong} aria-label="play">
															<PlayArrowIcon className={classes.cardPlayPauseIcon} />
														</IconButton>
													</Else>
												</If>

												<IconButton onClick={skipSong} aria-label={theme.direction === 'rtl' ? 'previous' : 'next'}>
													{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
												</IconButton>

												<IconButton
													disabled={volume <= 0}
													aria-label="decrease volume"
													onClick={() => changeVolume(Math.max(volume - 10, 0))}
												>
													<VolumeDownIcon className={classes.cardPlayPauseIcon} />
												</IconButton>
												<Typography color="textSecondary" data-premid="music-volume">
													{volume}%
												</Typography>

												<IconButton
													disabled={volume >= 300}
													aria-label="increase volume"
													onClick={() => changeVolume(Math.min(volume + 10, 300))}
												>
													<VolumeUpIcon className={classes.cardPlayPauseIcon} />
												</IconButton>

												<IconButton onClick={shuffleQueue}>
													<ShuffleIcon className={classes.cardPlayPauseIcon} />
												</IconButton>

												<IconButton onClick={clearQueue}>
													<DeleteSweepIcon className={classes.cardDeleteIcon} />
												</IconButton>
											</SimpleGrid>
										</When>
									</Box>
									<Box className={classes.videoContainer}>
										<ReactPlayer
											width="100%"
											height="100%"
											onStart={() => player && player.seekTo(position, 'seconds')}
											onReady={() => setStatus(MusicStatus.PLAYING)}
											loop={replay}
											ref={playerRef}
											url={currentSong?.uri ?? ''}
											playing={status === MusicStatus.PLAYING}
											volume={volume}
											muted
										/>
									</Box>
								</Box>
							</FlipMove>
						</Else>
					</If>
					<Divider />
					<When condition={queue.length !== 0}>
						<Virtuoso
							totalCount={queue.length}
							className={classes.virtualizedRoot}
							style={{ height: isMobile ? '300px' : '510px' }}
							overscan={2}
							components={VirtuosoComponents}
							itemContent={(index) => (
								<>
									<Link href={queue[index].info.uri} className={classes.link}>
										<ListItemIcon>
											<If condition={queue[index].info.uri.includes('youtube')}>
												<Then>
													<LazyAvatar
														imgProps={{ height: 360, width: 480 }}
														src={`https://img.youtube.com/vi/${queue[index].info.identifier}/hqdefault.jpg`}
													/>
												</Then>
												<Else>
													<LazyAvatar>{getAcronym(queue[index].info.title)}</LazyAvatar>
												</Else>
											</If>
										</ListItemIcon>
										<ListItemText primary={queue[index].info.title} secondary={queue[index].info.author} />
									</Link>
									<ListItemSecondaryAction>
										<IconButton edge="end" aria-label="remove song" onClick={() => removeSong(index)}>
											<ClearIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</>
							)}
						/>
					</When>
				</Box>
			</Container>
		</GeneralPage>
	);
};

export default memo(MusicPage);

declare global {
	interface WebSocket {
		sendJSON: (data: OutgoingWebsocketMessage) => void;
	}
}
