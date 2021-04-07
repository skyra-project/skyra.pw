import type { Track, TrackInfo } from '@skyra/audio';

export interface IncomingWebsocketMessage {
	action: ServerActions;
	data: unknown;
}

export interface OutgoingWebsocketMessage {
	action: ClientActions;
	data?: any;
}

export interface QueueEntry {
	author: string;
	track: string;
}

export interface NP {
	entry: NowPlayingEntry;
	position: number;
}

export interface NowPlayingEntry extends QueueEntry {
	info: TrackInfo;
}

export interface MusicConnectEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicConnect;
	data: { voiceChannel: string };
}

export interface MusicVoiceChannelJoinEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicVoiceChannelJoin;
	data: { voiceChannel: string };
}

export interface MusicFinishEvent extends Pick<IncomingWebsocketMessage, 'action'> {
	action: ServerActions.MusicFinish;
}

export interface MusicLeaveEvent extends Pick<IncomingWebsocketMessage, 'action'> {
	action: ServerActions.MusicLeave;
}

export interface MusicPruneEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicPrune;
	data: { tracks: Track[] };
}

export interface MusicReplayUpdateEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicReplayUpdate;
	data: { replay: boolean };
}

export interface MusicPauseEvent extends Pick<IncomingWebsocketMessage, 'action'> {
	action: ServerActions.MusicSongPause;
}

export interface MusicResumeEvent extends Pick<IncomingWebsocketMessage, 'action'> {
	action: ServerActions.MusicSongResume;
}

export interface MusicSongSeekEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicSongSeekUpdate;
	data: { status: NP };
}

export interface MusicVolumeEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicSongVolumeUpdate;
	data: { volume: number };
}

export interface MusicSyncEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicSync;
	data: {
		/** The Guild ID of this music session */
		id?: string;
		/** The tracks of the current session */
		tracks: Track[];
		/** The currently playing track */
		status: NP | null;
		/** The current volume */
		volume?: number;
		/** The ID of the current voice channel */
		voiceChannel?: string | null;
	};
}

export interface MusicVoiceChannelLeaveEvent extends Pick<IncomingWebsocketMessage, 'action'> {
	action: ServerActions.MusicVoiceChannelLeave;
}

export interface MusicWebsocketDisconnectEvent extends IncomingWebsocketMessage {
	action: ServerActions.MusicWebsocketDisconnect;
	data: { id: string };
}

export enum MusicStatus {
	INSTANTIATED = 0,
	PLAYING = 1,
	PAUSED = 2,
	ENDED = 3,
	ERRORED = 4,
	STUCK = 5,
	UNKNOWN = 6
}

export enum ClientActions {
	MusicQueueUpdate = 'MUSIC_QUEUE_UPDATE',
	SubscriptionUpdate = 'SUBSCRIPTION_UPDATE'
}

export enum MusicActions {
	Clear = 'CLEAR',
	ClearTracks = 'CLEAR_TRACKS',
	ShuffleTracks = 'SHUFFLE_TRACKS',
	SetVolume = 'SET_VOLUME',
	SkipSong = 'SKIP_SONG',
	AddSong = 'ADD_SONG',
	DeleteSong = 'DELETE_SONG',
	PauseSong = 'PAUSE_SONG',
	ResumePlaying = 'RESUME_PLAYING'
}

export enum SubscriptionActions {
	WebsocketSubscriptionName = 'MUSIC',
	WebsocketSubscriptionAction = 'SUBSCRIBE'
}

export enum ServerActions {
	MusicConnect = 'MUSIC_CONNECT',
	MusicFinish = 'MUSIC_FINISH',
	MusicLeave = 'MUSIC_LEAVE',
	MusicPrune = 'MUSIC_PRUNE',
	MusicReplayUpdate = 'MUSIC_REPLAY_UPDATE',
	MusicSongPause = 'MUSIC_SONG_PAUSE',
	MusicSongResume = 'MUSIC_SONG_RESUME',
	MusicSongSeekUpdate = 'MUSIC_SONG_SEEK_UPDATE',
	MusicSongVolumeUpdate = 'MUSIC_SONG_VOLUME_UPDATE',
	MusicSync = 'MUSIC_SYNC',
	MusicVoiceChannelJoin = 'MUSIC_VOICE_CHANNEL_JOIN',
	MusicVoiceChannelLeave = 'MUSIC_VOICE_CHANNEL_LEAVE',
	MusicWebsocketDisconnect = 'MUSIC_WEBSOCKET_DISCONNECT'
}
