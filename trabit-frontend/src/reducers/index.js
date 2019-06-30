import { combineReducers } from 'redux';
import auth from './auth';
import habit from './habit';

export default combineReducers({
  auth,
  habit
})
