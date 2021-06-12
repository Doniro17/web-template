import { combineReducers } from 'redux';
import userData from './userData';
import loadingState from './loadingState';

const rootReducer = combineReducers({
  userData,
  loadingState,
});

export default rootReducer;
