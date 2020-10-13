import { all, spawn } from 'redux-saga/effects';
import { saga as authenticationSaga } from './authentication/saga';

export function* rootSaga() {
	yield all([
		spawn(authenticationSaga) //
	]);
}
