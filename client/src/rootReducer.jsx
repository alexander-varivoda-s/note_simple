import { combineReducers } from 'redux';

import user from './components/User/reducers/user';
import flash from './components/FlashMessages/reducers/flash';
import appData from './components/FrontPage/reducers';
import settings from './components/SettingsPage/reducers/settings';

export default combineReducers({
  user,
  flash,
  appData,
  settings,
});
