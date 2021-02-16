import { combineReducers } from 'redux';
import gameReducer from './gameReducer';

const reducers = combineReducers({ gameReducer });

export default reducers;