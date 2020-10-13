import { ActionType, StateType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('./root-actions').default>;
export type RootState = StateType<typeof import('./root-reducer').default>;
