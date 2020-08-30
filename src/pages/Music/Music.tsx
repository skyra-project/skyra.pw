import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
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
import LazyAvatar from 'components/LazyAvatar';
import Link from 'components/Link';
import {
	ClientActions,
	IncomingWebsocketMessage,
	MusicActions,
	MusicData,
	MusicStatus,
	OutgoingWebsocketMessage,
	ServerActions
} from 'lib/types/Music';
import { WS_URL } from 'lib/util/constants';
import { getAcronym } from 'lib/util/util';
import { useRef } from 'react';
import FlipMove from 'react-flip-move';
import { Else, If, Then, When } from 'react-if';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
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
			width: '100%',
			margin: 0,
			padding: 0
		},
		virtualizedRoot: {
			margin: theme.spacing(1)
		}
	})
);

export default () => {
	const classes = useStyles();
	const { guildID } = useParams<{ guildID: string }>();
	const [authenticated] = useGlobal('authenticated');
	const theme = useTheme();

	const [voiceChannel, setVoiceChannel] = useState<MusicData['voiceChannel']>(null);
	const [song, setSong] = useState<MusicData['song']>(null);
	const [queue, setQueue] = useState<MusicData['queue']>([]);
	const [position, setPosition] = useState<MusicData['position']>(0);
	const [status, setStatus] = useState<MusicData['status']>(MusicStatus.INSTANTIATED);
	const [, setVolume] = useState<MusicData['volume']>(0);
	const [replay, setReplay] = useState<MusicData['replay']>(false);
	const [ws, setWs] = useState<WebSocket | undefined>();

	const playerRef = useRef<ReactPlayer | null>(null);

	const skipSong = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildID,
				music_action: MusicActions.SkipSong
			}
		});
	};
	const pauseSong = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildID,
				music_action: MusicActions.PauseSong
			}
		});
	};
	const resumeSong = () => {
		ws!.sendJSON({
			action: ClientActions.MusicQueueUpdate,
			data: {
				guild_id: guildID,
				music_action: MusicActions.ResumePlaying
			}
		});
	};

	useEffect(() => {
		if (!ws) setWs(new WebSocket(WS_URL));

		if (ws) {
			ws.sendJSON = data => ws.send(JSON.stringify(data));

			ws.onopen = () => {
				ws.sendJSON({
					action: ClientActions.SubscriptionUpdate,
					data: {
						subscription_name: MusicActions.WebsocketSubscriptionName,
						subscription_action: MusicActions.WebsocketSubscriptionAction,
						guild_id: guildID
					}
				});
			};

			ws.onmessage = event => {
				const { action, data } = JSON.parse(event.data) as IncomingWebsocketMessage;

				/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
				switch (action) {
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
					case ServerActions.MusicVoiceChannelLeave:
						// These events don't need to be handled, its handled by MusicConnect
						break;
				}
			};
		}
	}, [guildID, ws]);
	/* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */

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
						<Virtuoso
							totalCount={queue.length}
							className={classes.virtualizedRoot}
							style={{ height: '510px' }}
							overscan={400}
							ListContainer={({ listRef, style, children }) => (
								<List ref={listRef} style={style} classes={{ root: classes.list }}>
									{children}
								</List>
							)}
							ItemContainer={({ children, ...props }) => (
								<ListItem {...props} button style={{ margin: 0 }}>
									{children}
								</ListItem>
							)}
							item={index => (
								<Link to={queue[index].url}>
									<ListItemIcon>
										<If condition={queue[index].url.includes('youtube')}>
											<Then>
												<LazyAvatar
													imgProps={{ height: 360, width: 480 }}
													src={`https://img.youtube.com/vi/${queue[index].identifier}/hqdefault.jpg`}
												/>
											</Then>
											<Else>
												<LazyAvatar>{getAcronym(queue[index].title)}</LazyAvatar>
											</Else>
										</If>
									</ListItemIcon>
									<ListItemText primary={queue[index].title} secondary={queue[index].author} />
								</Link>
							)}
						/>
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
