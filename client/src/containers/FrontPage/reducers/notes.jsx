import { ADD_NOTE_SUCCEEDED, FETCH_DATA_SUCCEEDED } from '../constants';
import {
  PIN_SUCCEEDED,
  UNPIN_SUCCEEDED,
} from '../containers/NotesList/constants';
import { NOTE_SAVE_SUCCEEDED } from '../containers/NoteEditor/constants'

export default function notesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED: {
      return action.payload.notes;
    }

    case ADD_NOTE_SUCCEEDED: {
      const { note } = action.payload;
      return [note, ...state];
    }

    case PIN_SUCCEEDED:
    case UNPIN_SUCCEEDED:
    case NOTE_SAVE_SUCCEEDED: {
      const { note } = action.payload;
      const newNotes = [...state];
      const index = newNotes.findIndex(n => n._id === note._id);
      newNotes[index] = note;
      return newNotes;
    }

    default: {
      return state;
    }
  }
}
