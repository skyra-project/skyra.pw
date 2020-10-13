import { takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

function* storeDiscordPack({ payload }: ActionType<typeof actions.handleStoreDiscordPack>) {
	yield console.log(payload);
}

export function* saga() {
	yield takeLatest(getType(actions.handleStoreDiscordPack), storeDiscordPack);
}
