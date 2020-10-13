import { DefaultRootState } from 'react-redux';

export const getAuthenticated = (state: DefaultRootState) => state.authentication.authenticated;
export const getDiscordPack = (state: DefaultRootState) => state.authentication.discordPack;
