import { combineReducers } from 'redux';
import { reducer as authenticationReducer } from './authentication/reducer';
import { reducer as hydrationReducer } from './hydration/reducer';

export default combineReducers({
	hydration: hydrationReducer,
	authentication: authenticationReducer
});
