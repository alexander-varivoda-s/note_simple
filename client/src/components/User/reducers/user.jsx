import {
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
  UPDATE_EMAIL_SUCCEEDED,
} from '../../Shared/constants';

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
    case UPDATE_EMAIL_SUCCEEDED:
    case 'APP_INITIALIZATION_SUCCEEDED': {
      const { user } = action.payload;
      return user;
    }
    case LOGOUT_SUCCEEDED: {
      return null;
    }
    default: {
      return state;
    }
  }
};
