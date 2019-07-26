import { INITIALIZATION_FAILED, INITIALIZATION_SUCCEEDED } from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case INITIALIZATION_SUCCEEDED: {
      return true;
    }

    case INITIALIZATION_FAILED: {
      return false;
    }

    default: {
      return state;
    }
  }
};
