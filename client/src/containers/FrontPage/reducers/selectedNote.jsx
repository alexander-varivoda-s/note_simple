import {
  NOTE_SELECTED, NOTE_UNSELECTED,
} from '../containers/NotesList/constants';

export default function notesReducer(state = null, action) {
  switch (action.type) {
    case NOTE_SELECTED: {
      const { note } = action.payload;
      return { ...note };
    }

    case NOTE_UNSELECTED: {
      return null;
    }

    default: {
      return state;
    }
  }
}
