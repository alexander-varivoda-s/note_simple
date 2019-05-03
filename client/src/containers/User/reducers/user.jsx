import { LOGIN_SUCCEEDED } from '../../LoginPage/constants';

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return action.payload.data.user;
    default:
      return state;
  }
};
