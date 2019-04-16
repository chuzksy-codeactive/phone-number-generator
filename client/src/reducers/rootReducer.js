import { combineReducers } from 'redux';
import phoneBookReducer from './phoneBookReducers';

const rootReducer = combineReducers({
  phoneBook: phoneBookReducer,
});

export default rootReducer;
