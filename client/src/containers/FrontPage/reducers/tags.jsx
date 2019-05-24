import { FETCH_DATA_SUCCEEDED } from '../constants';

export default function tagsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED: {
      return action.payload.tags;
    }

    default: {
      return state;
    }
  }
}
