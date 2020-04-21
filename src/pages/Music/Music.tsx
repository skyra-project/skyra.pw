// @ts-nocheck
import { createStyles, makeStyles, Theme } from '@material-ui/core';
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
import { ClientActions, FlattenedSong, MusicActions, MusicData, MusicStatus, ServerActions, WebsocketMessage } from 'meta/typings/Music';
import { RootState } from 'meta/typings/Reactn';
import React, { createRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import { Else, If, Then, When } from 'react-if';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { getGlobal } from 'reactn';

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
		list: {
			maxWidth: 700,
			width: '100%',
			margin: '0 auto'
		}
	})
);

/* eslint-disable @typescript-eslint/camelcase, no-invalid-this */
// TODO:  -favna/kyra-  Type out the entire Websocket Music module in Skyra and transfer types to here
export default () => {
	const ws = new WebSocket(WS_URL);
	const playerRef = createRef<ReactPlayer>();
	const classes = useStyles();
	const { guildID } = useParams();
	const { authenticated, token, user } = getGlobal<RootState>();
	const [musicData, setMusicData] = useState<Partial<MusicData>>();

	const updateMusicData = (newData: Partial<MusicData>) => setMusicData({ ...musicData, ...newData });
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

	ws.onmessage = event => {
		const { action, data } = JSON.parse(event.data) as WebsocketMessage;

		switch (action) {
			case ServerActions.Authenticate:
				break;

			case ServerActions.MusicSync:
				updateMusicData(data);
				break;

			case ServerActions.MusicConnect:
				updateMusicData({ voiceChannel: data.id });
				break;

			case ServerActions.MusicLeave:
				updateMusicData({ voiceChannel: null });
				break;

			case ServerActions.MusicAdd:
				console.log('receiving a music add event');
				console.log('the current musicData: ', musicData);
				console.log('the current queue: ', musicData?.queue);
				console.log('about to add: ', data);
				console.log('should be after add: ', { ...musicData, ...{ queue: musicData?.queue.concat(data) } });
				updateMusicData({ queue: musicData?.queue.concat(data) });
				break;

			case ServerActions.MusicPrune:
				updateMusicData({ queue: [] });
				break;

			case ServerActions.MusicRemove:
				updateMusicData({ queue: musicData?.queue.filter((song: FlattenedSong) => song.id !== data.id) });
				break;

			case ServerActions.MusicReplayUpdate:
				// TODO -favna/kyra- support replaying songs
				break;

			case ServerActions.MusicShuffleQueue:
				// TODO -favna/kyra- support shuffling songs
				updateMusicData({ queue: data });
				break;

			case ServerActions.MusicSongFinish:
				updateMusicData({
					song: null,
					queue: musicData?.queue.filter((song: FlattenedSong) => song.id !== data.id),
					position: 0,
					status: MusicStatus.STOPPED
				});
				break;

			case ServerActions.MusicSongPause:
				updateMusicData({ status: MusicStatus.PAUSED });
				break;

			case ServerActions.MusicSongPlay:
				updateMusicData({ song: data, position: 0, status: MusicStatus.PLAYING });
				break;

			case ServerActions.MusicSongReplay:
				updateMusicData({ position: 0, status: MusicStatus.PLAYING });
				break;

			case ServerActions.MusicSongResume:
				updateMusicData({ status: MusicStatus.PLAYING });
				break;

			case ServerActions.MusicSongSeekUpdate:
				updateMusicData({ position: data.position });
				break;

			case ServerActions.MusicSongSkip:
				updateMusicData({ song: null, queue: musicData?.queue.slice(1) });
				break;
		}
	};

	console.log(musicData);

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
						<If condition={musicData.song !== null}>
							<Then>
								<FlipMove staggerDelayBy={150} appearAnimation="fade" enterAnimation="fade" leaveAnimation="fade">
									<Box component="div" className={classes.currentlyPlaying} key={musicData.song?.identifier}>
										<CardContent classes={{ root: classes.cardContent }}>
											<Typography component="h5" variant="h5" data-premid="music-title">
												{musicData.song?.title || 'Unknown Title'}
											</Typography>
											<Typography variant="subtitle1" color="textSecondary" data-premid="music-from">
												{musicData.song?.author || 'Unknown Uploader'}
											</Typography>
										</CardContent>
										<When condition={authenticated}>
											<IconButton>
												<SkipPreviousIcon />
											</IconButton>
											<If
												condition={
													musicData.status === MusicStatus.PLAYING || musicData.status === MusicStatus.STOPPED
												}
											>
												<Then>
													<IconButton onClick={pauseSong}>
														<PauseIcon />
													</IconButton>
												</Then>
												<Else>
													<IconButton onClick={resumeSong}>
														<PlayArrowIcon />
													</IconButton>
												</Else>
											</If>

											<IconButton onClick={skipSong}>
												<SkipNextIcon />
											</IconButton>
										</When>
										<Box className={classes.videoContainer}>
											<ReactPlayer
												width="100%"
												height="100%"
												onStart={() =>
													playerRef.current && playerRef.current.seekTo(musicData.position / 1000, 'seconds')
												}
												// TODO -favna/kyra- implement music replaying
												// loop={musicData.replay}
												ref={playerRef}
												url={musicData.song?.url}
												playing={musicData.status === MusicStatus.PLAYING}
											/>
										</Box>
									</Box>
								</FlipMove>
							</Then>
							<Else>
								<Box component="div" className={classes.currentlyPlaying}>
									<Typography variant="h2" component="h1">
										Not Playing
									</Typography>
								</Box>
							</Else>
						</If>
						<Divider />
						<When condition={musicData?.queue?.length !== 0}>
							<List classes={{ root: classes.list }}>
								<FlipMove
									staggerDelayBy={80}
									appearAnimation="fade"
									enterAnimation="fade"
									leaveAnimation="accordionVertical"
								>
									{musicData?.queue?.map((song, index) => (
										<div key={index}>
											<Link to={song.url}>
												<ListItem button>
													<ListItemIcon>
														<Avatar src={`https://img.youtube.com/vi/${song.identifier}/hqdefault.jpg`} />
													</ListItemIcon>
													<ListItemText primary={song.title} secondary={song.author} />
													{/* <ListItemSecondaryAction>
														<IconButton edge="end">
															<DeleteIcon />
														</IconButton>
													</ListItemSecondaryAction> */}
												</ListItem>
											</Link>
										</div>
									))}
								</FlipMove>
							</List>
						</When>
					</Box>
				</Container>
			)}
		</GeneralPage>
	);
};

declare global {
	interface WebSocket {
		sendJSON: (data: WebsocketMessage) => void;
	}
}
