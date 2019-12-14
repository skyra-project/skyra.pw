import React, { Component } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import {
	ListItemSecondaryAction,
	ListItemText,
	List,
	ListItem,
	Typography,
	IconButton,
	CardContent,
	Card,
	Box,
	Avatar,
	ListItemIcon
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';

import GeneralPage from 'components/GeneralPage';
import { authedFetch } from 'meta/util';
import theme from 'meta/theme';

const CurrentlyPlaying = styled(Card)`
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
`;

class MusicPage extends Component {
	state = {
		musicData: null
	};

	async componentDidMount() {
		const { guildID } = this.props.match.params;

		const musicData = await authedFetch(`/guilds/${guildID}/music`);

		this.setState({ musicData });
	}

	playerRef = player => {
		this.player = player;
	};

	render() {
		const { musicData } = this.state;

		return (
			<GeneralPage loading={!musicData}>
				{musicData && (
					<Box m={3} height="100%" display="flex" flexDirection="column">
						{musicData.playing ? (
							<CurrentlyPlaying>
								<div>
									<CardContent>
										<Typography component="h5" variant="h5">
											{musicData.playing.title}
										</Typography>
										<Typography variant="subtitle1" color="textSecondary">
											{musicData.playing.author}
										</Typography>
									</CardContent>
									<IconButton aria-label="previous">
										<SkipPreviousIcon />
									</IconButton>
									<IconButton aria-label="play/pause">{true ? <PauseIcon /> : <PlayArrowIcon />}</IconButton>
									<IconButton aria-label="next">
										<SkipNextIcon />
									</IconButton>
								</div>
								<div className="video-container">
									<ReactPlayer
										width="100%"
										height="100%"
										onStart={() => this.player.seekTo(musicData.position / 1000, 'seconds')}
										ref={this.playerRef}
										url={musicData.playing.url}
										playing
									/>
								</div>
							</CurrentlyPlaying>
						) : (
							<Typography variant="h2" component="h1">
								Not playing
							</Typography>
						)}
						<List>
							{musicData.queue.map(song => (
								<ListItem key={song.identifier}>
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
							))}
						</List>
					</Box>
				)}
			</GeneralPage>
		);
	}
}

export default MusicPage;
