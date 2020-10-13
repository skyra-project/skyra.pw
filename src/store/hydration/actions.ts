import { HYDRATE } from 'next-redux-wrapper';
import { createAction } from 'typesafe-actions';

export const handleHydration = createAction(HYDRATE)<any>();
