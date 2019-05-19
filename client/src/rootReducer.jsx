import { combineReducers } from 'redux';

import userReducer from './containers/User/reducers/user';
import flashReducer from './containers/FlashMessages/reducers/flash';

export default combineReducers({
  user: userReducer,
  flash: flashReducer,
});
