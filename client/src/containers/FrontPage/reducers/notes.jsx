import { ADD_NOTE_SUCCEEDED, FETCH_DATA_SUCCEEDED } from '../constants'

export default function notesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED: {
      return action.payload.notes;
    }

    case ADD_NOTE_SUCCEEDED: {
      const { note } = action.payload;
      return [note, ...state];
    }

    default: {
      return state;
    }
  }
}
