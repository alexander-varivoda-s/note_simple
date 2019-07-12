import { FETCH_DATA_SUCCEEDED } from '../constants';

export default function dataIsFetchedReducer(state = false, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED: {
      return true;
    }

    default: {
      return state;
    }
  }
}
