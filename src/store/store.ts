import { RootAction, RootState } from '@store/Redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, createStore, Dispatch, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { Task } from 'redux-saga';
import rootReducer from './root-reducer';
import { rootSaga } from './root-saga';

export const initialState = {};

export interface SagaStore extends Store<RootState, RootAction> {
	sagaTask?: Task;
}

export const makeStore: MakeStore<RootState, RootAction> = () => {
	const composeEnhancers = composeWithDevTools({});
	const sagaMiddleware = createSagaMiddleware();
	const middlewares: Middleware<Record<PropertyKey, unknown>, any, Dispatch<AnyAction>>[] = [sagaMiddleware];

	const logger = createLogger({
		collapsed: () => true,
		predicate: () => {
			return process.env.NODE_ENV !== 'test';
		}
	});

	if (process.env.NODE_ENV === 'development') {
		middlewares.push(logger);
	}

	const enhancer = composeEnhancers(applyMiddleware(...middlewares));
	const store = createStore(rootReducer, initialState, enhancer);

	(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

	return store as SagaStore;
};

export const wrapper = createWrapper<RootState, RootAction>(makeStore, { debug: process.env.NODE_ENV !== 'production' });

declare module 'typesafe-actions' {
	interface Types {
		RootAction: RootAction;
	}
}

declare module 'react-redux' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultRootState extends RootState {}
}
