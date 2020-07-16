export interface MusicData {
	voiceChannel: string | null;
	song: FlattenedSong | null;
	position: number;
	status: number;
	replay: boolean;
	volume: number;
	queue: readonly FlattenedSong[];
}

export interface FlattenedSong {
	id: string;
	track: string;
	requester: string;
	identifier: string;
	seekable: boolean;
	author: string;
	duration: number;
	stream: boolean;
	position: number;
	title: string;
	url: string;
	skips: string[];
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
	SkipSong = 'SKIP_SONG',
	PauseSong = 'PAUSE_SONG',
	ResumePlaying = 'RESUME_PLAYING',
	WebsocketSubscriptionName = 'MUSIC',
	WebsocketSubscriptionAction = 'SUBSCRIBE'
}

export enum ServerActions {
	MusicAdd = 'MUSIC_ADD',
	MusicConnect = 'MUSIC_CONNECT',
	MusicLeave = 'MUSIC_LEAVE',
	MusicPrune = 'MUSIC_PRUNE',
	MusicRemove = 'MUSIC_REMOVE',
	MusicReplayUpdate = 'MUSIC_REPLAY_UPDATE',
	MusicShuffleQueue = 'MUSIC_SHUFFLE_QUEUE',
	MusicSongFinish = 'MUSIC_SONG_FINISH',
	MusicSongPause = 'MUSIC_SONG_PAUSE',
	MusicSongPlay = 'MUSIC_SONG_PLAY',
	MusicSongReplay = 'MUSIC_SONG_REPLAY',
	MusicSongResume = 'MUSIC_SONG_RESUME',
	MusicSongSeekUpdate = 'MUSIC_SONG_SEEK_UPDATE',
	MusicSongSkip = 'MUSIC_SONG_SKIP',
	MusicSongVolumeUpdate = 'MUSIC_SONG_VOLUME_UPDATE',
	MusicSync = 'MUSIC_SYNC',
	MusicVoiceChannelJoin = 'MUSIC_VOICE_CHANNEL_JOIN',
	MusicVoiceChannelLeave = 'MUSIC_VOICE_CHANNEL_LEAVE'
}

export interface IncomingWebsocketMessage {
	action: ServerActions;
	data?: MusicData;
	error?: string;
	success?: boolean;
}

export interface OutgoingWebsocketMessage {
	action: ClientActions;
	data?: any;
}
