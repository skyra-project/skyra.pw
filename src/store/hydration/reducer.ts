import { mergeDefault } from '@sapphire/utilities';
import { createReducer, getType } from 'typesafe-actions';
import * as actions from './actions';

export const reducer = createReducer({}) //
	.handleType(getType(actions.handleHydration), (state, action) => {
		return mergeDefault(state, action.payload as Partial<Record<PropertyKey, unknown>>);
	});
