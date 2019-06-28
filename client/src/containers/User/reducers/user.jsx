import { LOGIN_SUCCEEDED } from '../../LoginPage/constants';
import { USER_REQUEST_SUCCEEDED } from '../../shared/constants';
import { LOGOUT_SUCCEEDED } from '../../LogoutPage/constants';
import { UPDATE_EMAIL_SUCCEEDED } from '../../SettingsPage/constants';

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
    case USER_REQUEST_SUCCEEDED:
    case UPDATE_EMAIL_SUCCEEDED:
      return action.payload.data.user;
    case LOGOUT_SUCCEEDED:
      return null;
    default:
      return state;
  }
};
