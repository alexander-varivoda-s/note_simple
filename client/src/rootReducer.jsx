import { combineReducers } from 'redux';

import userReducer from './components/User/reducers/user';
import flashReducer from './components/FlashMessages/reducers/flash';
import frontPageReducer from './components/FrontPage/reducers';
import settingsReducer from './components/SettingsPage/reducers/settings';

export default combineReducers({
  user: userReducer,
  flash: flashReducer,
  appData: frontPageReducer,
  settings: settingsReducer,
});
