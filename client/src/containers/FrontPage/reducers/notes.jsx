import { FETCH_DATA_SUCCEEDED } from '../constants';

export default function notesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED: {
      return action.payload.notes;
    }

    default: {
      return state;
    }
  }
}
