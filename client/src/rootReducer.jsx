import { combineReducers } from 'redux';

import user from './components/User/reducers/user';
import flash from './components/FlashMessages/reducers/flash';
import { flags, appData } from './components/FrontPage/reducers';
import settings from './components/SettingsPage/reducers/settings';
import appInitialized from './components/App/reducers/appInitialized';

const rootReducer = combineReducers({
  user,
  flash,
  APP_DATA: appData,
  FLAGS: flags,
  settings,
  appInitialized,
});

export default (state, action) => {
  if (
    action.type === 'LOGOUT_SUCCEEDED' ||
    action.type === 'DELETE_ACCOUNT_SUCCEEDED'
  ) {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
