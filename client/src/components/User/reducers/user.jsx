import {
  USER_REQUEST_SUCCEEDED,
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
  UPDATE_EMAIL_SUCCEEDED,
} from '../../Shared/constants';

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
