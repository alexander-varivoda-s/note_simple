import { combineReducers } from 'redux';

import userReducer from './containers/User/reducers/user';

export default combineReducers({
  user: userReducer,
});
